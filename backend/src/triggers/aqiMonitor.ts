/**
 * AQI Monitor (TM-002)
 * Pulls air quality data from AQICN / WAQI API.
 * Threshold: AQI > 300 (Hazardous) sustained 4hrs.
 * Payout: ₹600
 */
import { config } from '../config';
import { TriggerEvent, ZoneConfig, MONITORED_ZONES } from './types';
import { isAlreadyProcessed, markAsProcessed, logTriggerEvent } from './triggerRepository';

interface AqiApiResponse {
  status: string;
  data: {
    aqi: number;
    city: { name: string };
    dominentpol?: string;
    iaqi?: Record<string, { v: number }>;
  };
}

/**
 * Fetch AQI data for a zone from the WAQI API.
 */
async function fetchAqiData(zone: ZoneConfig): Promise<number | null> {
  const { key, baseUrl } = config.apis.aqicn;

  if (!key) {
    return generateMockAqiData(zone);
  }

  try {
    const url = `${baseUrl}/feed/geo:${zone.lat};${zone.lon}/?token=${key}`;
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`AQICN API error for ${zone.name}: ${response.statusText}`);
      return null;
    }
    const json = await response.json() as AqiApiResponse;
    if (json.status !== 'ok') return null;
    return json.data.aqi;
  } catch (err) {
    console.error(`Failed to fetch AQI for ${zone.name}:`, err);
    return null;
  }
}

/**
 * Generate mock AQI data for development/testing.
 * Delhi gets higher AQI values to reflect real-world patterns.
 */
function generateMockAqiData(zone: ZoneConfig): number {
  const isDelhi = zone.city === 'Delhi';
  // ~10% chance of hazardous AQI, higher for Delhi (~25%)
  const isHazardous = Math.random() < (isDelhi ? 0.25 : 0.10);
  return isHazardous
    ? 300 + Math.floor(Math.random() * 200)   // 300–500 (above threshold)
    : 50 + Math.floor(Math.random() * 200);    // 50–250 (below threshold)
}

/**
 * Evaluate all monitored zones for AQI threshold breaches.
 */
export async function checkAqi(): Promise<TriggerEvent[]> {
  const triggeredEvents: TriggerEvent[] = [];
  const threshold = config.triggers.aqi.threshold;

  console.log(`[AQI Monitor] Checking ${MONITORED_ZONES.length} zones (threshold: AQI > ${threshold})`);

  for (const zone of MONITORED_ZONES) {
    const aqi = await fetchAqiData(zone);
    if (aqi === null) continue;

    console.log(`  [${zone.name}] AQI: ${aqi}`);

    if (aqi > threshold) {
      if (await isAlreadyProcessed('AQI', zone.id)) {
        console.log(`  [${zone.name}] Already processed, skipping.`);
        continue;
      }

      const event: TriggerEvent = {
        triggerType: 'AQI',
        zoneId: zone.id,
        timestamp: new Date(),
        dataSource: config.apis.aqicn.key ? 'AQICN' : 'MockData',
        thresholdValue: threshold,
        actualValue: aqi,
        status: 'ACTIVE',
        metadata: {
          city: zone.city,
          zoneName: zone.name,
          aqiCategory: 'Hazardous',
          sustainedHrsRequired: config.triggers.aqi.sustainedHrs,
          payoutAmount: config.triggers.aqi.payoutAmount,
        },
      };

      try {
        const saved = await logTriggerEvent(event);
        await markAsProcessed('AQI', zone.id);
        triggeredEvents.push(saved);
        console.log(`  🏭 TRIGGER FIRED: ${zone.name} — AQI ${aqi} (Hazardous)!`);
      } catch (err) {
        console.error(`  Failed to log AQI trigger for ${zone.name}:`, err);
      }
    }
  }

  return triggeredEvents;
}
