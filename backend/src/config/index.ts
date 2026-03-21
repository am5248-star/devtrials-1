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
};
