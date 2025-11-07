-- 002_competicao_e_temporada.sql
-- Criação das tabelas de competições e temporadas:
-- - competicao
-- - temporada

-- Tabela: competicao
CREATE TABLE IF NOT EXISTS competicao (
    id           BIGSERIAL PRIMARY KEY,
    nome         TEXT        NOT NULL,
    slug         TEXT        NOT NULL,
    tipo         TEXT        NOT NULL,  -- ex.: 'liga', 'copa', 'misto'
    nivel        TEXT,                  -- ex.: 'nacional', 'continental'
    organizador  TEXT,                  -- ex.: 'CBF', 'CONMEBOL'
    descricao    TEXT,
    ativo        BOOLEAN     DEFAULT TRUE,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: temporada
CREATE TABLE IF NOT EXISTS temporada (
    id                   BIGSERIAL PRIMARY KEY,
    competicao_id        BIGINT      NOT NULL,
    ano                  INTEGER     NOT NULL,
    descricao            TEXT,
    formato              TEXT,       -- ex.: 'pontos_corridos', 'mata_mata', 'misto'
    numero_times         INTEGER,
    numero_rodadas       INTEGER,
    tem_rebaixamento     BOOLEAN,
    tem_acesso           BOOLEAN,
    detalhes_regulamento TEXT,
    created_at           TIMESTAMPTZ DEFAULT NOW(),
    updated_at           TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_temporada__competicao_id
        FOREIGN KEY (competicao_id)
        REFERENCES competicao (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
