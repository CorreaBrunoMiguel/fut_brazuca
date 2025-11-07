-- db/sanity_checks.sql
-- Queries de verificação básica do modelo fut_brazuca

-- 1) Listar clubes
SELECT id, nome_atual, sigla, slug, cidade, estado
FROM clube
ORDER BY nome_atual;

-- 2) Listar competições e temporadas
SELECT
  c.id AS competicao_id,
  c.nome AS competicao,
  t.id AS temporada_id,
  t.ano,
  t.formato
FROM temporada t
JOIN competicao c ON c.id = t.competicao_id
ORDER BY c.nome, t.ano;

-- 3) Listar rodadas de uma temporada (Brasileirão 2003)
SELECT
  r.id,
  r.numero,
  r.data_inicio,
  r.data_fim
FROM rodada r
WHERE r.temporada_id = (
  SELECT t.id
  FROM temporada t
  JOIN competicao c ON c.id = t.competicao_id
  WHERE c.slug = 'brasileirao-serie-a'
    AND t.ano = 2003
)
ORDER BY r.numero;

-- 4) Listar partidas de uma temporada (Brasileirão 2003)
SELECT
  p.id,
  p.data_hora,
  cm.nome_atual AS mandante,
  cv.nome_atual AS visitante,
  p.gols_mandante,
  p.gols_visitante
FROM partida p
JOIN temporada t ON t.id = p.temporada_id
JOIN competicao c ON c.id = t.competicao_id
JOIN clube cm ON cm.id = p.mandante_id
JOIN clube cv ON cv.id = p.visitante_id
WHERE c.slug = 'brasileirao-serie-a'
  AND t.ano = 2003
ORDER BY p.data_hora;

-- 5) Partidas de um clube específico em uma temporada
-- Exemplo: Flamengo no Brasileirão 2003
SELECT
  p.id,
  p.data_hora,
  CASE
    WHEN p.mandante_id = cm.id THEN 'casa'
    ELSE 'fora'
  END AS contexto,
  cm.nome_atual AS mandante,
  cv.nome_atual AS visitante,
  p.gols_mandante,
  p.gols_visitante
FROM partida p
JOIN temporada t ON t.id = p.temporada_id
JOIN competicao c ON c.id = t.competicao_id
JOIN clube cm ON cm.id = p.mandante_id
JOIN clube cv ON cv.id = p.visitante_id
WHERE c.slug = 'brasileirao-serie-a'
  AND t.ano = 2003
  AND (p.mandante_id = (SELECT id FROM clube WHERE slug = 'flamengo')
       OR p.visitante_id = (SELECT id FROM clube WHERE slug = 'flamengo'))
ORDER BY p.data_hora;

-- 6) Partidas de Copa do Brasil por fase
SELECT
  f.nome AS fase,
  p.data_hora,
  cm.nome_atual AS mandante,
  cv.nome_atual AS visitante,
  p.gols_mandante,
  p.gols_visitante
FROM partida p
JOIN temporada t ON t.id = p.temporada_id
JOIN competicao c ON c.id = t.competicao_id
JOIN fase f ON f.id = p.fase_id
JOIN clube cm ON cm.id = p.mandante_id
JOIN clube cv ON cv.id = p.visitante_id
WHERE c.slug = 'copa-do-brasil'
  AND t.ano = 2003
ORDER BY f.ordem, p.data_hora;
