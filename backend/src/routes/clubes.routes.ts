import { Router } from 'express';
import { pool } from '../db';

export const clubesRouter = Router();

clubesRouter.get('/', async (_req, res) => {
  try {
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
        `
    );

    res.json({
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
