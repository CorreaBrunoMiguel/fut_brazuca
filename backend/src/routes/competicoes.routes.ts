// backend/src/routes/competicoes.routes.ts
import { Router } from 'express';
import { pool } from '../db';

export const competicoesRouter = Router();

// GET /competicoes
competicoesRouter.get('/', async (req, res) => {
  try {
    const limitParam = req.query.limit as string | undefined;
    const offsetParam = req.query.offset as string | undefined;

    let limit = Number(limitParam ?? 20);
    let offset = Number(offsetParam ?? 0);

    if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
      limit = 20;
    }
    if (!Number.isInteger(offset) || offset < 0) {
      offset = 0;
    }

    const result = await pool.query(
      `
      SELECT
        id,
        nome,
        slug,
        tipo,
        nivel,
        organizador,
        descricao,
        ativo
      FROM competicao
      ORDER BY nome
      LIMIT $1 OFFSET $2
      `,
      [limit, offset]
    );

    res.json({
      pagination: { limit, offset, count: result.rowCount },
      data: result.rows,
    });
  } catch (error) {
    console.error('Erro ao listar competições:', error);
    res.status(500).json({ error: 'Erro ao listar competições' });
  }
});

// GET /competicoes/:id
competicoesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        id,
        nome,
        slug,
        tipo,
        nivel,
        organizador,
        descricao,
        ativo
      FROM competicao
      WHERE id = $1
      `,
      [numericId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Competição não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar competição:', error);
    res.status(500).json({ error: 'Erro ao buscar competição' });
  }
});

competicoesRouter.get('/:id/temporada', async (req, res) => {
  const { id } = req.params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const compResult = await pool.query(
      `SELECT id, nome, slug, tipo, nivel, organizador, descricao, ativo
       FROM competicao
       WHERE id = $1
        `,
      [numericId]
    );
    if (compResult.rowCount === 0) {
      return res.status(404).json({ error: 'Competição não encontrada' });
    }

    const limitParam = req.query.limit as string | undefined;
    const offsetParam = req.query.offset as string | undefined;

    let limit = Number(limitParam ?? 20);
    let offset = Number(offsetParam ?? 0);

    if (!Number.isInteger(limit) || limit <= 0 || limit > 50) {
      limit = 20;
    }
    if (!Number.isInteger(offset) || offset < 0) {
      offset = 0;
    }

    const temporadasResult = await pool.query(
      `
      SELECT
        id,
        competicao_id,
        ano,
        descricao,
        formato,
        numero_times,
        numero_rodadas,
        tem_rebaixamento,
        tem_acesso
      FROM temporada
      WHERE competicao_id = $1
      ORDER BY ano
      LIMIT $2 OFFSET $3
      `,
      [numericId, limit, offset]
    );

    res.json({
      competicao: compResult.rows[0],
      pagination: { limit, offset, count: temporadasResult.rowCount },
      data: temporadasResult.rows,
    });
  } catch (error) {
    console.error('Erro ao listar temporadas da competição:', error);
    res.status(500).json({ error: 'Erro ao listar temporadas da competição' });
  }
});
