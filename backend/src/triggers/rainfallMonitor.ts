/**
 * Rainfall Monitor (TM-001)
 * Pulls rainfall data from OpenWeatherMap API.
 * Threshold: >50mm in 3hrs in a worker's GPS zone.
 * Payout: ₹800
 */
import { config } from '../config';
import { TriggerEvent, ZoneConfig, MONITORED_ZONES } from './types';
import { isAlreadyProcessed, markAsProcessed, logTriggerEvent } from './triggerRepository';

interface WeatherApiResponse {
  rain?: { '1h'?: number; '3h'?: number };
  name: string;
  main: { temp: number; feels_like: number; humidity: number };
  weather: Array<{ main: string; description: string }>;
}

/**
 * Fetch current weather data for a zone from OpenWeatherMap.
 */
async function fetchWeatherData(zone: ZoneConfig): Promise<WeatherApiResponse | null> {
  const { key, baseUrl } = config.apis.openWeather;

  // In development without an API key, return mock data
  if (!key) {
    return generateMockRainfallData(zone);
  }

  try {
    const url = `${baseUrl}/weather?lat=${zone.lat}&lon=${zone.lon}&appid=${key}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`OpenWeather API error for ${zone.name}: ${response.statusText}`);
      return null;
    }
    return await response.json() as WeatherApiResponse;
  } catch (err) {
    console.error(`Failed to fetch weather for ${zone.name}:`, err);
    return null;
  }
}

/**
 * Generate mock rainfall data for development/testing.
 * Simulates realistic rainfall patterns with occasional threshold breaches.
 */
function generateMockRainfallData(zone: ZoneConfig): WeatherApiResponse {
  // ~15% chance of heavy rainfall to simulate realistic trigger patterns
  const isHeavyRain = Math.random() < 0.15;
  const rainfall3h = isHeavyRain
    ? 50 + Math.random() * 60  // 50–110mm (above threshold)
    : Math.random() * 30;      // 0–30mm (below threshold)

  return {
    rain: { '3h': parseFloat(rainfall3h.toFixed(1)) },
    name: zone.name,
    main: { temp: 28 + Math.random() * 5, feels_like: 30 + Math.random() * 5, humidity: 70 + Math.random() * 20 },
    weather: [{ main: isHeavyRain ? 'Rain' : 'Clouds', description: isHeavyRain ? 'heavy intensity rain' : 'scattered clouds' }],
  };
}

/**
 * Evaluate all monitored zones for rainfall threshold breaches.
 */
export async function checkRainfall(): Promise<TriggerEvent[]> {
  const triggeredEvents: TriggerEvent[] = [];
  const threshold = config.triggers.rainfall.thresholdMm;

  console.log(`[Rainfall Monitor] Checking ${MONITORED_ZONES.length} zones (threshold: ${threshold}mm/3hrs)`);

  for (const zone of MONITORED_ZONES) {
    const data = await fetchWeatherData(zone);
    if (!data) continue;

    const rainfall3h = data.rain?.['3h'] || 0;
    console.log(`  [${zone.name}] Rainfall 3h: ${rainfall3h}mm`);

    if (rainfall3h > threshold) {
      // Check dedup
      if (await isAlreadyProcessed('RAINFALL', zone.id)) {
        console.log(`  [${zone.name}] Already processed, skipping.`);
        continue;
      }

      const event: TriggerEvent = {
        triggerType: 'RAINFALL',
        zoneId: zone.id,
        timestamp: new Date(),
        dataSource: config.apis.openWeather.key ? 'OpenWeatherMap' : 'MockData',
        thresholdValue: threshold,
        actualValue: rainfall3h,
        status: 'ACTIVE',
        metadata: {
          city: zone.city,
          zoneName: zone.name,
          weatherDescription: data.weather[0]?.description,
          temperature: data.main.temp,
          payoutAmount: config.triggers.rainfall.payoutAmount,
        },
      };

      try {
        const saved = await logTriggerEvent(event);
        await markAsProcessed('RAINFALL', zone.id);
        triggeredEvents.push(saved);
        console.log(`  🌧️ TRIGGER FIRED: ${zone.name} — ${rainfall3h}mm rainfall!`);
      } catch (err) {
        console.error(`  Failed to log rainfall trigger for ${zone.name}:`, err);
      }
    }
  }

  return triggeredEvents;
}
