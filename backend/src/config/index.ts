import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../../.env') });

export const config = {
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  jwt: {
    secret: process.env.JWT_SECRET || 'fallback_secret_not_for_production',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  db: {
    url: process.env.DATABASE_URL || 'postgresql://postgres:password@localhost:5432/gigshield',
  },
  redis: {
    url: process.env.REDIS_URL || 'redis://localhost:6379',
  },
  mlService: {
    url: process.env.ML_API_URL || 'http://localhost:8000',
  },
  apis: {
    openWeather: {
      key: process.env.OPENWEATHER_API_KEY || '',
      baseUrl: 'https://api.openweathermap.org/data/2.5',
    },
    aqicn: {
      key: process.env.AQICN_API_KEY || '',
      baseUrl: 'https://api.waqi.info',
    },
  },
  triggers: {
    pollingIntervalMs: 5 * 60 * 1000, // 5 minutes
    rainfall: {
      thresholdMm: 50,
      windowHrs: 3,
      payoutAmount: 800,
    },
    aqi: {
      threshold: 300,
      sustainedHrs: 4,
      payoutAmount: 600,
    },
    heatIndex: {
      thresholdCelsius: 45,
      sustainedHrs: 3,
      payoutAmount: 500,
    },
  },
};
