import { Router } from 'express';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'fut_brazuca-api',
    uptime: process.uptime(),
  });
});
