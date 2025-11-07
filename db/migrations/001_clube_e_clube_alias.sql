-- 001_clube_e_clube_alias.sql
-- Criação das tabelas de núcleo de clube:
-- - clube
-- - clube_alias

-- Tabela: clube
CREATE TABLE IF NOT EXISTS clube (
    id              BIGSERIAL PRIMARY KEY,
    nome_atual      TEXT        NOT NULL,
    sigla           TEXT,
    slug            TEXT        NOT NULL,
    cidade          TEXT,
    estado          TEXT,
    pais            TEXT,
    fundacao_ano    INTEGER,
    ativo           BOOLEAN     DEFAULT TRUE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela: clube_alias
CREATE TABLE IF NOT EXISTS clube_alias (
    id               BIGSERIAL PRIMARY KEY,
    clube_id         BIGINT      NOT NULL,
    nome             TEXT        NOT NULL,
    sigla            TEXT,
    slug             TEXT,
    tipo_alias       TEXT,
    vigencia_inicio  DATE,
    vigencia_fim     DATE,
    nota             TEXT,
    created_at       TIMESTAMPTZ DEFAULT NOW(),
    updated_at       TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_clube_alias__clube_id
        FOREIGN KEY (clube_id)
        REFERENCES clube (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
