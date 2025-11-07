-- db/seeds_exemplo.sql
-- Seeds mínimos de exemplo para o schema do fut_brazuca

-- ==== CLUBES ====

INSERT INTO clube (nome_atual, sigla, slug, cidade, estado, pais)
VALUES
  ('Clube de Regatas do Flamengo', 'FLA', 'flamengo',     'Rio de Janeiro', 'RJ', 'Brasil'),
  ('Sport Club Corinthians Paulista', 'COR', 'corinthians', 'São Paulo', 'SP', 'Brasil'),
  ('Sociedade Esportiva Palmeiras', 'PAL', 'palmeiras',   'São Paulo', 'SP', 'Brasil'),
  ('São Paulo Futebol Clube', 'SAO', 'sao-paulo',         'São Paulo', 'SP', 'Brasil')
ON CONFLICT DO NOTHING;

-- Exemplo simples de alias histórico (fictício)
INSERT INTO clube_alias (clube_id, nome, sigla, slug, tipo_alias, vigencia_inicio, vigencia_fim, nota)
VALUES
  (
    (SELECT id FROM clube WHERE slug = 'sao-paulo'),
    'São Paulo F.C.',
    'SAO',
    'sao-paulo-fc',
    'nome',
    DATE '1990-01-01',
    DATE '2000-01-01',
    'Exemplo de variação de nome'
  )
ON CONFLICT DO NOTHING;

-- ==== COMPETIÇÕES ====

INSERT INTO competicao (nome, slug, tipo, nivel, organizador, descricao)
VALUES
  ('Campeonato Brasileiro Série A', 'brasileirao-serie-a', 'liga', 'nacional', 'CBF', 'Principal liga do futebol brasileiro'),
  ('Copa do Brasil', 'copa-do-brasil', 'copa', 'nacional', 'CBF', 'Copa nacional em formato mata-mata')
ON CONFLICT DO NOTHING;

-- ==== TEMPORADAS ====

-- Brasileirão Série A 2003
INSERT INTO temporada (
  competicao_id, ano, descricao, formato, numero_times, numero_rodadas,
  tem_rebaixamento, tem_acesso, detalhes_regulamento
)
VALUES (
  (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a'),
  2003,
  'Brasileirão Série A 2003',
  'pontos_corridos',
  4,   -- só 4 times no seed de exemplo, não é histórico real
  2,   -- 2 rodadas de exemplo
  TRUE,
  FALSE,
  'Seed de exemplo com poucos clubes e rodadas'
)
ON CONFLICT DO NOTHING;

-- Copa do Brasil 2003
INSERT INTO temporada (
  competicao_id, ano, descricao, formato, numero_times, numero_rodadas,
  tem_rebaixamento, tem_acesso, detalhes_regulamento
)
VALUES (
  (SELECT id FROM competicao WHERE slug = 'copa-do-brasil'),
  2003,
  'Copa do Brasil 2003',
  'mata_mata',
  4,
  NULL,
  FALSE,
  FALSE,
  'Seed de exemplo com fases de mata-mata simplificadas'
)
ON CONFLICT DO NOTHING;

-- ==== RODADAS (Brasileirão 2003) ====

INSERT INTO rodada (temporada_id, numero, data_inicio, data_fim, descricao)
VALUES
  (
    (SELECT id FROM temporada
       WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
         AND ano = 2003),
    1,
    DATE '2003-04-01',
    DATE '2003-04-01',
    'Rodada 1 - seed exemplo'
  ),
  (
    (SELECT id FROM temporada
       WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
         AND ano = 2003),
    2,
    DATE '2003-04-08',
    DATE '2003-04-08',
    'Rodada 2 - seed exemplo'
  )
ON CONFLICT DO NOTHING;

-- ==== FASES (Copa do Brasil 2003) ====

INSERT INTO fase (temporada_id, nome, ordem, tipo, descricao)
VALUES
  (
    (SELECT id FROM temporada
       WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'copa-do-brasil')
         AND ano = 2003),
    'Primeira Fase',
    1,
    'eliminatoria_simples',
    'Primeira fase da Copa do Brasil (seed)'
  ),
  (
    (SELECT id FROM temporada
       WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'copa-do-brasil')
         AND ano = 2003),
    'Quartas de Final',
    2,
    'ida_e_volta',
    'Quartas da Copa do Brasil (seed)'
  )
ON CONFLICT DO NOTHING;

-- ==== PARTIDAS - Brasileirão 2003 (rodadas de exemplo) ====

-- Rodada 1
INSERT INTO partida (
  temporada_id, rodada_id, data_hora,
  estadio, cidade, estado,
  mandante_id, visitante_id,
  gols_mandante, gols_visitante,
  decisao_penaltis
)
VALUES
(
  (SELECT id FROM temporada
     WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
       AND ano = 2003),
  (SELECT id FROM rodada
     WHERE temporada_id = (SELECT id FROM temporada
                             WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
                               AND ano = 2003)
       AND numero = 1),
  TIMESTAMPTZ '2003-04-01 16:00:00-03',
  'Maracanã',
  'Rio de Janeiro',
  'RJ',
  (SELECT id FROM clube WHERE slug = 'flamengo'),
  (SELECT id FROM clube WHERE slug = 'corinthians'),
  2,
  1,
  FALSE
),
(
  (SELECT id FROM temporada
     WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
       AND ano = 2003),
  (SELECT id FROM rodada
     WHERE temporada_id = (SELECT id FROM temporada
                             WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
                               AND ano = 2003)
       AND numero = 1),
  TIMESTAMPTZ '2003-04-01 18:00:00-03',
  'Pacaembu',
  'São Paulo',
  'SP',
  (SELECT id FROM clube WHERE slug = 'palmeiras'),
  (SELECT id FROM clube WHERE slug = 'sao-paulo'),
  1,
  1,
  FALSE
);

-- Rodada 2
INSERT INTO partida (
  temporada_id, rodada_id, data_hora,
  estadio, cidade, estado,
  mandante_id, visitante_id,
  gols_mandante, gols_visitante,
  decisao_penaltis
)
VALUES
(
  (SELECT id FROM temporada
     WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
       AND ano = 2003),
  (SELECT id FROM rodada
     WHERE temporada_id = (SELECT id FROM temporada
                             WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
                               AND ano = 2003)
       AND numero = 2),
  TIMESTAMPTZ '2003-04-08 16:00:00-03',
  'Neo Química Arena',
  'São Paulo',
  'SP',
  (SELECT id FROM clube WHERE slug = 'corinthians'),
  (SELECT id FROM clube WHERE slug = 'flamengo'),
  3,
  0,
  FALSE
),
(
  (SELECT id FROM temporada
     WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
       AND ano = 2003),
  (SELECT id FROM rodada
     WHERE temporada_id = (SELECT id FROM temporada
                             WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'brasileirao-serie-a')
                               AND ano = 2003)
       AND numero = 2),
  TIMESTAMPTZ '2003-04-08 18:00:00-03',
  'Allianz Parque',
  'São Paulo',
  'SP',
  (SELECT id FROM clube WHERE slug = 'sao-paulo'),
  (SELECT id FROM clube WHERE slug = 'palmeiras'),
  0,
  2,
  FALSE
);

-- ==== PARTIDAS - Copa do Brasil 2003 (exemplo) ====

INSERT INTO partida (
  temporada_id, fase_id, data_hora,
  estadio, cidade, estado,
  mandante_id, visitante_id,
  gols_mandante, gols_visitante,
  decisao_penaltis
)
VALUES
(
  (SELECT id FROM temporada
     WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'copa-do-brasil')
       AND ano = 2003),
  (SELECT id FROM fase
     WHERE temporada_id = (SELECT id FROM temporada
                             WHERE competicao_id = (SELECT id FROM competicao WHERE slug = 'copa-do-brasil')
                               AND ano = 2003)
       AND nome = 'Primeira Fase'),
  TIMESTAMPTZ '2003-05-01 20:00:00-03',
  'Maracanã',
  'Rio de Janeiro',
  'RJ',
  (SELECT id FROM clube WHERE slug = 'flamengo'),
  (SELECT id FROM clube WHERE slug = 'palmeiras'),
  1,
  0,
  FALSE
);
