import { Router } from 'express';
import { pool } from '../db';

export const clubesRouter = Router();

clubesRouter.get('/', async (req, res) => {
  try {
    const limitParam = req.query.limit as string | undefined;
    const offsetParam = req.query.offset as string | undefined;

    let limit = Number(limitParam ?? 20);
    let offset = Number(offsetParam ?? 0);

    if (!Number.isInteger(limit) || limit <= 0 || limit > 50) {
      limit = 20;
    }
    if (!Number.isInteger(offset) || offset <= 0) {
      offset = 0;
    }

    const result = await pool.query(
      `
        SELECT
            id,
            nome_atual,
            sigla,
            slug,                cidade,
            estado,
            pais,
            fundacao_ano,
            ativo
        FROM clube
        ORDER BY nome_atual
        LIMIT $1 OFFSET $2
        `,
      [limit, offset]
    );

    res.json({
      pagination: { limit, offset, count: result.rowCount },
      data: result.rows,
    });
  } catch (error) {
    console.error('Erro ao listar clubes:', error);
    res.status(500).json({ error: 'Erro ao listar clubes' });
  }
});

clubesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;

  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await pool.query(
      `SELECT
            id,
            nome_atual, 
            sigla,
            slug,
            cidade,
            estado,
            pais,
            fundacao_ano,
            ativo
        FROM clube
        WHERE id = $1
        `,
      [numericId]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Clube não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar clube:', error);
    res.status(500).json({ error: 'Erro ao buscar clube' });
  }
});
