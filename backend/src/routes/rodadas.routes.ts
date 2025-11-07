// backend/src/routes/rodadas.routes.ts
import { Router } from 'express';
import { pool } from '../db';

export const rodadasRouter = Router();

// GET /rodadas/:id
rodadasRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const rodadaId = Number(id);

  if (!Number.isInteger(rodadaId) || rodadaId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        r.id,
        r.temporada_id,
        r.numero,
        r.data_inicio,
        r.data_fim,
        r.descricao
      FROM rodada r
      WHERE r.id = $1
      `,
      [rodadaId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Rodada não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar rodada:', error);
    res.status(500).json({ error: 'Erro ao buscar rodada' });
  }
});
