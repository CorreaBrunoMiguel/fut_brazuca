-- 003_fase_rodada_e_partida.sql
-- Criação das tabelas:
-- - fase
-- - rodada
-- - partida

-- Tabela: fase
CREATE TABLE IF NOT EXISTS fase (
    id           BIGSERIAL PRIMARY KEY,
    temporada_id BIGINT      NOT NULL,
    nome         TEXT        NOT NULL,
    ordem        INTEGER,
    tipo         TEXT,       -- ex.: 'eliminatoria_simples', 'ida_e_volta', 'grupos'
    descricao    TEXT,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_fase__temporada_id
        FOREIGN KEY (temporada_id)
        REFERENCES temporada (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- Tabela: rodada
CREATE TABLE IF NOT EXISTS rodada (
    id           BIGSERIAL PRIMARY KEY,
    temporada_id BIGINT      NOT NULL,
    numero       INTEGER     NOT NULL,
    data_inicio  DATE,
    data_fim     DATE,
    descricao    TEXT,
    created_at   TIMESTAMPTZ DEFAULT NOW(),
    updated_at   TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_rodada__temporada_id
        FOREIGN KEY (temporada_id)
        REFERENCES temporada (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);

-- Tabela: partida
CREATE TABLE IF NOT EXISTS partida (
    id                        BIGSERIAL PRIMARY KEY,
    temporada_id              BIGINT      NOT NULL,
    fase_id                   BIGINT,
    rodada_id                 BIGINT,
    data_hora                 TIMESTAMPTZ NOT NULL,
    estadio                   TEXT,
    cidade                    TEXT,
    estado                    TEXT,
    mandante_id               BIGINT      NOT NULL,
    visitante_id              BIGINT      NOT NULL,
    gols_mandante             INTEGER     NOT NULL DEFAULT 0,
    gols_visitante            INTEGER     NOT NULL DEFAULT 0,
    decisao_penaltis          BOOLEAN     DEFAULT FALSE,
    gols_penaltis_mandante    INTEGER,
    gols_penaltis_visitante   INTEGER,
    observacoes               TEXT,
    source_ref                TEXT,
    created_at                TIMESTAMPTZ DEFAULT NOW(),
    updated_at                TIMESTAMPTZ DEFAULT NOW(),

    CONSTRAINT fk_partida__temporada_id
        FOREIGN KEY (temporada_id)
        REFERENCES temporada (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_partida__fase_id
        FOREIGN KEY (fase_id)
        REFERENCES fase (id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_partida__rodada_id
        FOREIGN KEY (rodada_id)
        REFERENCES rodada (id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,

    CONSTRAINT fk_partida__mandante_id
        FOREIGN KEY (mandante_id)
        REFERENCES clube (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_partida__visitante_id
        FOREIGN KEY (visitante_id)
        REFERENCES clube (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
);
