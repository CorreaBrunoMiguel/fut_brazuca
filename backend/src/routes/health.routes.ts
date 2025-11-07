import { Router } from 'express';
import { pool } from '../db';

export const router = Router();

router.get('/', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'fut_brazuca-api',
    uptime: process.uptime(),
  });
});

router.get('/db', async (_req, res) => {
  try {
    const result = await pool.query('SELECT 1 AS ok');
    const row = result.rows[0];

    res.json({
      status: 'ok',
      db: 'connected',
      result: row,
    });
  } catch (error) {
    console.error('Erro ao verificar o banco:', error);
    res.status(500).json({
      status: 'error',
      db: 'unreachable',
    });
  }
});
