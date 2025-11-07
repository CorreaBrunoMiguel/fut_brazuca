-- 004_constraints_e_indices.sql
-- Constraints de unicidade, checks e índices auxiliares

-- ===== UNICIDADE =====

-- competicao.slug único
ALTER TABLE competicao
ADD CONSTRAINT uq_competicao__slug
UNIQUE (slug);

-- temporada: (competicao_id, ano) único
ALTER TABLE temporada
ADD CONSTRAINT uq_temporada__competicao_ano
UNIQUE (competicao_id, ano);

-- rodada: (temporada_id, numero) único
ALTER TABLE rodada
ADD CONSTRAINT uq_rodada__temporada_numero
UNIQUE (temporada_id, numero);

-- ===== CHECKS LÓGICOS =====

-- partida: mandante e visitante precisam ser diferentes
ALTER TABLE partida
ADD CONSTRAINT ck_partida__mandante_visitante_diferentes
CHECK (mandante_id <> visitante_id);

-- gols não negativos
ALTER TABLE partida
ADD CONSTRAINT ck_partida__gols_nao_negativos
CHECK (
    gols_mandante           >= 0
    AND gols_visitante      >= 0
    AND (gols_penaltis_mandante  IS NULL OR gols_penaltis_mandante  >= 0)
    AND (gols_penaltis_visitante IS NULL OR gols_penaltis_visitante >= 0)
);

-- ===== ÍNDICES AUXILIARES =====

-- clube_alias: lookup rápido por clube
CREATE INDEX IF NOT EXISTS idx_clube_alias__clube_id
    ON clube_alias (clube_id);

-- temporada: por competicao
CREATE INDEX IF NOT EXISTS idx_temporada__competicao_id
    ON temporada (competicao_id);

-- fase: por temporada
CREATE INDEX IF NOT EXISTS idx_fase__temporada_id
    ON fase (temporada_id);

-- rodada: por temporada
CREATE INDEX IF NOT EXISTS idx_rodada__temporada_id
    ON rodada (temporada_id);

-- partida: filtros comuns
CREATE INDEX IF NOT EXISTS idx_partida__temporada_id
    ON partida (temporada_id);

CREATE INDEX IF NOT EXISTS idx_partida__mandante_id
    ON partida (mandante_id);

CREATE INDEX IF NOT EXISTS idx_partida__visitante_id
    ON partida (visitante_id);

-- opcional: ajuda para confrontos diretos A x B
CREATE INDEX IF NOT EXISTS idx_partida__mandante_visitante
    ON partida (mandante_id, visitante_id);
