import express from 'express';
import cors from 'cors';

import { router as healthRouter } from './routes/health.routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/health', healthRouter);

app.get('/', (_req, res) => {
  res.json({ name: 'fut_brazuca', status: 'api_v1_ready' });
});

export { app };
