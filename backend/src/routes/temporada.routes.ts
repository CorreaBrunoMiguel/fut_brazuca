// backend/src/routes/temporadas.routes.ts
import { Router } from 'express';
import { pool } from '../db';

export const temporadasRouter = Router();

// GET /temporadas/:id
temporadasRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const temporadaId = Number(id);

  if (!Number.isInteger(temporadaId) || temporadaId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        t.id,
        t.competicao_id,
        c.nome AS competicao_nome,
        c.slug AS competicao_slug,
        t.ano,
        t.descricao,
        t.formato,
        t.numero_times,
        t.numero_rodadas,
        t.tem_rebaixamento,
        t.tem_acesso,
        t.detalhes_regulamento
      FROM temporada t
      JOIN competicao c ON c.id = t.competicao_id
      WHERE t.id = $1
      `,
      [temporadaId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Temporada não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar temporada:', error);
    res.status(500).json({ error: 'Erro ao buscar temporada' });
  }
});

// GET /temporadas/:id/rodadas
temporadasRouter.get('/:id/rodadas', async (req, res) => {
  const { id } = req.params;
  const temporadaId = Number(id);

  if (!Number.isInteger(temporadaId) || temporadaId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    // garante que a temporada existe
    const temporadaResult = await pool.query(
      `
      SELECT
        t.id,
        t.competicao_id,
        c.nome AS competicao_nome,
        t.ano
      FROM temporada t
      JOIN competicao c ON c.id = t.competicao_id
      WHERE t.id = $1
      `,
      [temporadaId]
    );

    if (temporadaResult.rowCount === 0) {
      return res.status(404).json({ error: 'Temporada não encontrada' });
    }

    const limitParam = req.query.limit as string | undefined;
    const offsetParam = req.query.offset as string | undefined;

    let limit = Number(limitParam ?? 38); // por padrão, cabe um Brasileirão clássico
    let offset = Number(offsetParam ?? 0);

    if (!Number.isInteger(limit) || limit <= 0 || limit > 100) {
      limit = 38;
    }
    if (!Number.isInteger(offset) || offset < 0) {
      offset = 0;
    }

    const rodadasResult = await pool.query(
      `
      SELECT
        id,
        temporada_id,
        numero,
        data_inicio,
        data_fim,
        descricao
      FROM rodada
      WHERE temporada_id = $1
      ORDER BY numero
      LIMIT $2 OFFSET $3
      `,
      [temporadaId, limit, offset]
    );

    res.json({
      temporada: temporadaResult.rows[0],
      pagination: { limit, offset, count: rodadasResult.rowCount },
      data: rodadasResult.rows,
    });
  } catch (error) {
    console.error('Erro ao listar rodadas da temporada:', error);
    res.status(500).json({ error: 'Erro ao listar rodadas da temporada' });
  }
});
