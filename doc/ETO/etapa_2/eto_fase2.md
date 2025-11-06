# Fase 2 — Esquema Físico & Migrações Iniciais · Etapa 2 · fut_brazuca

## 📖 Resumo Geral

A Fase 2 da Etapa 2 é onde o modelo lógico do fut_brazuca ganha corpo no
**PostgreSQL**:

- criação do **esquema físico** (tabelas, colunas, tipos, constraints),
- preparação das **primeiras migrações** versionadas,
- verificação de que o banco sobe limpo a partir do zero.

Não vamos ainda popular dados reais nem fazer queries avançadas; o objetivo é
ter um **schema sólido e reproduzível** do Data Core.

- **Branch da Fase:** `e2-f2` (a partir de `develop`)
- **Documentos de referência:**
  - `doc/mer_fut_brazuca.md`
  - `doc/ETO/etapa_2/overview_etapa2.md`
  - `doc/ETO/etapa_2/eto_fase1.md`
  - `doc/ETO/etapa_2/fase1_tarefas.json` (Fase 1)

---

## 🧭 Sprints da Fase 2

### Sprint 1 — DDL das Entidades Centrais

**Objetivo:**  
Transformar o modelo lógico em **DDL PostgreSQL** para as entidades centrais:

- `clube`
- `clube_alias`
- `competicao`
- `temporada`
- `fase`
- `rodada`
- `partida`

**Resultados esperados:**

- Arquivo(s) de migração contendo `CREATE TABLE` dessas entidades, com:
  - PKs (`id`),
  - FKs essenciais,
  - tipos adequados (`BIGINT`, `TEXT`, `DATE/TIMESTAMPTZ`, `BOOLEAN`,
    `INTEGER`),
  - índices mínimos (ex.: em `temporada_id` nas tabelas que precisam).

---

### Sprint 2 — Constraints de Integridade & Ergonomia

**Objetivo:**  
Fortalecer o schema com regras que evitem estados absurdos.

**Pontos principais:**

- Constraints lógicas:
  - `mandante_id != visitante_id` em `partida` (CHECK ou equivalente),
  - unicidade:
    - (`competicao_id`, `ano`) em `temporada`,
    - (`temporada_id`, `numero`) em `rodada`.
- Índices auxiliares:
  - por `clube_id` em `clube_alias`,
  - por `mandante_id` / `visitante_id` / `temporada_id` em `partida`.
- Ajustes de tipos se necessário (ex.: garantir `TIMESTAMPTZ` em datas de jogo).

---

### Sprint 3 — Sanidade de Migrações

**Objetivo:**  
Garantir que o schema é **reproduzível** e fácil de subir/derrubar.

**Pontos principais:**

- Confirmar que as migrações:
  - sobem o schema do zero sem erro,
  - podem ser reaplicadas em um banco limpo.
- Criar um pequeno roteiro de verificação (README ou script) com:
  - comando para rodar migrações,
  - comando para checar as tabelas criadas (ex.: `\dt` no psql, ou queries
    simples).

---

## 🎯 Critérios de Conclusão da Fase 2

A Fase 2 é considerada concluída quando:

1. Existe um conjunto de migrações que:

   - criam todas as tabelas do MER (`clube`, `clube_alias`, `competicao`,
     `temporada`, `fase`, `rodada`, `partida`),
   - definem PKs, FKs e constraints de unicidade essenciais.

2. É possível:

   - inicializar um banco PostgreSQL vazio,
   - rodar as migrações,
   - inspecionar o schema e confirmar que ele reflete o MER.

3. O schema resultante serve como base direta para:
   - a **Etapa 2 · Fase 3** (queries de verificação + dados de exemplo),
   - a **Etapa 3** (API v1).

---

## 🔗 Dependências

- Depende conceitualmente de:

  - `mer_fut_brazuca.md` (modelo lógico + convenções),
  - Fase 1 concluída (mesmo que sem “release formal”).

- Alimenta diretamente:
  - `Etapa 2 · Fase 3` (queries de verificação),
  - `Etapa 3` (API v1).
