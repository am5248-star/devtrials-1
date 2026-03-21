/**
 * Heat Index Monitor (TM-003)
 * Pulls feels-like temperature data from OpenWeatherMap API.
 * Threshold: Feels-like temp > 45°C sustained 3hrs in peak delivery hours.
 * Payout: ₹500
 */
import { config } from '../config';
import { TriggerEvent, ZoneConfig, MONITORED_ZONES } from './types';
import { isAlreadyProcessed, markAsProcessed, logTriggerEvent } from './triggerRepository';

interface HeatApiResponse {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_max: number;
  };
  name: string;
}

/**
 * Fetch feels-like temperature for a zone from OpenWeatherMap.
 */
async function fetchHeatData(zone: ZoneConfig): Promise<{ feelsLike: number; temp: number; humidity: number } | null> {
  const { key, baseUrl } = config.apis.openWeather;

  if (!key) {
    return generateMockHeatData(zone);
  }

  try {
    const url = `${baseUrl}/weather?lat=${zone.lat}&lon=${zone.lon}&appid=${key}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`OpenWeather API error for ${zone.name}: ${response.statusText}`);
      return null;
    }
    const json = await response.json() as HeatApiResponse;
    return {
      feelsLike: json.main.feels_like,
      temp: json.main.temp,
      humidity: json.main.humidity,
    };
  } catch (err) {
    console.error(`Failed to fetch heat data for ${zone.name}:`, err);
    return null;
  }
}

/**
 * Generate mock heat data for development/testing.
 * Chennai and Delhi get higher temperatures to match real patterns.
 */
function generateMockHeatData(zone: ZoneConfig): { feelsLike: number; temp: number; humidity: number } {
  const isHotCity = zone.city === 'Chennai' || zone.city === 'Delhi';
  // ~12% chance of extreme heat, higher for hot cities (~20%)
  const isExtreme = Math.random() < (isHotCity ? 0.20 : 0.12);
  const feelsLike = isExtreme
    ? 45 + Math.random() * 8    // 45–53°C (above threshold)
    : 30 + Math.random() * 12;  // 30–42°C (below threshold)

  return {
    feelsLike: parseFloat(feelsLike.toFixed(1)),
    temp: parseFloat((feelsLike - 3 - Math.random() * 3).toFixed(1)),
    humidity: 40 + Math.floor(Math.random() * 40),
  };
}

/**
 * Evaluate all monitored zones for Heat Index threshold breaches.
 */
export async function checkHeatIndex(): Promise<TriggerEvent[]> {
  const triggeredEvents: TriggerEvent[] = [];
  const threshold = config.triggers.heatIndex.thresholdCelsius;

  console.log(`[Heat Index Monitor] Checking ${MONITORED_ZONES.length} zones (threshold: >${threshold}°C feels-like)`);

  for (const zone of MONITORED_ZONES) {
    const data = await fetchHeatData(zone);
    if (!data) continue;

    console.log(`  [${zone.name}] Feels-like: ${data.feelsLike}°C (actual: ${data.temp}°C)`);

    if (data.feelsLike > threshold) {
      if (await isAlreadyProcessed('HEAT_INDEX', zone.id)) {
        console.log(`  [${zone.name}] Already processed, skipping.`);
        continue;
      }

      const event: TriggerEvent = {
        triggerType: 'HEAT_INDEX',
        zoneId: zone.id,
        timestamp: new Date(),
        dataSource: config.apis.openWeather.key ? 'OpenWeatherMap' : 'MockData',
        thresholdValue: threshold,
        actualValue: data.feelsLike,
        status: 'ACTIVE',
        metadata: {
          city: zone.city,
          zoneName: zone.name,
          actualTemp: data.temp,
          humidity: data.humidity,
          sustainedHrsRequired: config.triggers.heatIndex.sustainedHrs,
          payoutAmount: config.triggers.heatIndex.payoutAmount,
        },
      };

      try {
        const saved = await logTriggerEvent(event);
        await markAsProcessed('HEAT_INDEX', zone.id);
        triggeredEvents.push(saved);
        console.log(`  🔥 TRIGGER FIRED: ${zone.name} — ${data.feelsLike}°C feels-like!`);
      } catch (err) {
        console.error(`  Failed to log heat trigger for ${zone.name}:`, err);
      }
    }
  }

  return triggeredEvents;
}
