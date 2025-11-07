// backend/src/routes/partidas.routes.ts
import { Router } from 'express';
import { pool } from '../db';

export const partidasRouter = Router();

partidasRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const partidaId = Number(id);

  if (!Number.isInteger(partidaId) || partidaId <= 0) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const result = await pool.query(
      `
      SELECT
        p.id,
        p.temporada_id,
        t.ano AS temporada_ano,
        t.formato AS temporada_formato,
        c.id AS competicao_id,
        c.nome AS competicao_nome,
        c.slug AS competicao_slug,
        p.fase_id,
        f.nome AS fase_nome,
        p.rodada_id,
        r.numero AS rodada_numero,
        p.data_hora,
        p.estadio,
        p.cidade,
        p.estado,
        p.mandante_id,
        cm.nome_atual AS mandante_nome,
        p.visitante_id,
        cv.nome_atual AS visitante_nome,
        p.gols_mandante,
        p.gols_visitante,
        p.decisao_penaltis,
        p.gols_penaltis_mandante,
        p.gols_penaltis_visitante,
        p.observacoes,
        p.source_ref
      FROM partida p
      JOIN temporada t ON t.id = p.temporada_id
      JOIN competicao c ON c.id = t.competicao_id
      LEFT JOIN fase f ON f.id = p.fase_id
      LEFT JOIN rodada r ON r.id = p.rodada_id
      JOIN clube cm ON cm.id = p.mandante_id
      JOIN clube cv ON cv.id = p.visitante_id
      WHERE p.id = $1
      `,
      [partidaId]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Partida não encontrada' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao buscar partida:', error);
    res.status(500).json({ error: 'Erro ao buscar partida' });
  }
});
