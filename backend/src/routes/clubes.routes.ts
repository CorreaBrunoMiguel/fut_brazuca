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

clubesRouter.get('/:id/partidas', async (req, res) => {
  const { id } = req.params;
  const clubeId = Number(id);

  if (!Number.isInteger(clubeId) || clubeId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  const temporadaParam = req.query.temporadaId as string | undefined;
  const limitParam = req.query.limit as string | undefined;
  const offsetParam = req.query.offset as string | undefined;

  const temporadaId = temporadaParam ? Number(temporadaParam) : undefined;

  let limit = Number(limitParam ?? 50);
  let offset = Number(offsetParam ?? 0);

  if (!Number.isInteger(limit) || limit <= 0 || limit > 200) {
    limit = 50;
  }
  if (!Number.isInteger(offset) || offset < 0) {
    offset = 0;
  }

  const conditions: string[] = ['(p.mandante_id = $1 OR p.visitante_id = $1)'];
  const params: any[] = [clubeId];
  let paramIndex = 2;

  if (temporadaId && Number.isInteger(temporadaId) && temporadaId > 0) {
    conditions.push(`p.temporada_id = $${paramIndex}`);
    params.push(temporadaId);
    paramIndex++;
  }

  params.push(limit, offset);
  const whereClause = conditions.join(' AND ');

  try {
    // checa se o clube existe
    const clubeResult = await pool.query(
      `
      SELECT
        id,
        nome_atual,
        sigla,
        slug,
        cidade,
        estado,
        pais
      FROM clube
      WHERE id = $1
      `,
      [clubeId]
    );

    if (clubeResult.rowCount === 0) {
      return res.status(404).json({ error: 'Clube não encontrado' });
    }

    const partidasResult = await pool.query(
      `
      SELECT
        p.id,
        p.data_hora,
        t.id AS temporada_id,
        t.ano AS temporada_ano,
        c.nome AS competicao_nome,
        cm.id AS mandante_id,
        cm.nome_atual AS mandante_nome,
        cv.id AS visitante_id,
        cv.nome_atual AS visitante_nome,
        p.gols_mandante,
        p.gols_visitante,
        p.decisao_penaltis
      FROM partida p
      JOIN temporada t ON t.id = p.temporada_id
      JOIN competicao c ON c.id = t.competicao_id
      JOIN clube cm ON cm.id = p.mandante_id
      JOIN clube cv ON cv.id = p.visitante_id
      WHERE ${whereClause}
      ORDER BY p.data_hora
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
      `,
      params
    );

    res.json({
      clube: clubeResult.rows[0],
      pagination: { limit, offset, count: partidasResult.rowCount },
      data: partidasResult.rows,
    });
  } catch (error) {
    console.error('Erro ao listar partidas do clube:', error);
    res.status(500).json({ error: 'Erro ao listar partidas do clube' });
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
