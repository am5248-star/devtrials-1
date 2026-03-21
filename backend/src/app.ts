import express from 'express';
import cors from 'cors';
import { auth } from './middleware/auth';
import triggerRoutes from './routes/triggers';

const app = express();

// Standard Middleware
app.use(cors());
app.use(express.json());

// Public Routes
app.get('/health', (req, res) => {
  res.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'GigShield Core API'
  });
});

// Trigger Routes (public for hackathon demo, protect with auth in production)
app.use('/api/triggers', triggerRoutes);

// Protected Test Route
app.get('/api/protected-test', auth, (req, res) => {
  res.json({
    message: 'Authentication successful',
    user: (req as any).user
  });
});

export default app;

