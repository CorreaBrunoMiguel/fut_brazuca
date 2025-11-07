// backend/src/routes/temporadas.routes.ts
import { Router } from 'express';
import { pool } from '../db';

export const temporadasRouter = Router();

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

temporadasRouter.get('/:id/partidas', async (req, res) => {
  const { id } = req.params;
  const temporadaId = Number(id);

  if (!Number.isInteger(temporadaId) || temporadaId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const clubeParam = req.query.clubeId as string | undefined;
  const rodadaParam = req.query.rodadaId as string | undefined;
  const faseParam = req.query.faseId as string | undefined;
  const limitParam = req.query.limit as string | undefined;
  const offsetParam = req.query.offset as string | undefined;

  let limit = Number(limitParam ?? 50);
  let offset = Number(offsetParam ?? 0);

  if (!Number.isInteger(limit) || limit <= 0 || limit > 200) {
    limit = 50;
  }
  if (!Number.isInteger(offset) || offset < 0) {
    offset = 0;
  }

  const conditions: string[] = ['p.temporada_id = $1'];
  const params: any[] = [temporadaId];
  let paramIndex = 2;

  const clubeId = clubeParam ? Number(clubeParam) : undefined;
  const rodadaId = rodadaParam ? Number(rodadaParam) : undefined;
  const faseId = faseParam ? Number(faseParam) : undefined;

  if (clubeId && Number.isInteger(clubeId) && clubeId > 0) {
    conditions.push(
      `(p.mandante_id = $${paramIndex} OR p.visitante_id = $${paramIndex})`
    );
    params.push(clubeId);
    paramIndex++;
  }

  if (rodadaId && Number.isInteger(rodadaId) && rodadaId > 0) {
    conditions.push(`p.rodada_id = $${paramIndex}`);
    params.push(rodadaId);
    paramIndex++;
  }

  if (faseId && Number.isInteger(faseId) && faseId > 0) {
    conditions.push(`p.fase_id = $${paramIndex}`);
    params.push(faseId);
    paramIndex++;
  }

  params.push(limit, offset);
  const whereClause = conditions.join(' AND ');

  try {
    // checa se a temporada existe
    const temporadaResult = await pool.query(
      `
      SELECT
        t.id,
        t.ano,
        t.formato,
        c.id AS competicao_id,
        c.nome AS competicao_nome,
        c.slug AS competicao_slug
      FROM temporada t
      JOIN competicao c ON c.id = t.competicao_id
      WHERE t.id = $1
      `,
      [temporadaId]
    );

    if (temporadaResult.rowCount === 0) {
      return res.status(404).json({ error: 'Temporada não encontrada' });
    }

    const partidasResult = await pool.query(
      `
      SELECT
        p.id,
        p.data_hora,
        p.rodada_id,
        r.numero AS rodada_numero,
        p.fase_id,
        f.nome AS fase_nome,
        cm.id AS mandante_id,
        cm.nome_atual AS mandante_nome,
        cv.id AS visitante_id,
        cv.nome_atual AS visitante_nome,
        p.gols_mandante,
        p.gols_visitante,
        p.decisao_penaltis
      FROM partida p
      LEFT JOIN rodada r ON r.id = p.rodada_id
      LEFT JOIN fase f ON f.id = p.fase_id
      JOIN clube cm ON cm.id = p.mandante_id
      JOIN clube cv ON cv.id = p.visitante_id
      WHERE ${whereClause}
      ORDER BY p.data_hora
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `,
      params
    );

    res.json({
      temporada: temporadaResult.rows[0],
      pagination: { limit, offset, count: partidasResult.rowCount },
      data: partidasResult.rows,
    });
  } catch (error) {
    console.error('Erro ao listar partidas da temporada:', error);
    res.status(500).json({ error: 'Erro ao listar partidas da temporada' });
  }
});
