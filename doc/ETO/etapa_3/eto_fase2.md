# Fase 2 — Endpoints de Domínio (Leitura) · Etapa 3 · fut_brazuca

## 📖 Resumo Geral

A Fase 2 da Etapa 3 tem como objetivo expor o **núcleo de leitura** do Data Core
via API v1:

- listar e detalhar **clubes**, **competições**, **temporadas**, **rodadas** e
  **partidas**;
- suportar filtros básicos e paginação simples;
- manter as respostas coesas com o modelo relacional definido na Etapa 2.

Nada de escrita/ingestão ainda: somente leitura em cima do schema atual.

- **Branch da Fase:** `e3-f2` (a partir de `develop`)

---

## 🧭 Sprints da Fase 2

### Sprint 1 — Clubes & Competições

**Objetivo:**

- Implementar endpoints de leitura para:

  - `GET /clubes`
  - `GET /clubes/:id`
  - `GET /competicoes`
  - `GET /competicoes/:id`

- Paginação simples em listagens (`limit`, `offset`).

---

### Sprint 2 — Temporadas & Rodadas

**Objetivo:**

- Implementar endpoints:

  - `GET /competicoes/:id/temporadas`
  - `GET /temporadas/:id`
  - `GET /temporadas/:id/rodadas`
  - `GET /rodadas/:id`

- Filtros básicos por ano (quando fizer sentido).

---

### Sprint 3 — Partidas & Filtros básicos

**Objetivo:**

- Implementar endpoints:

  - `GET /partidas/:id`
  - `GET /temporadas/:id/partidas`
  - `GET /clubes/:id/partidas` (opcional, mas desejável)

- Filtros básicos:

  - por clube (mandante/visitante),
  - por rodada,
  - por fase (em copas) — se possível sem exagerar na complexidade.

---

## 🎯 Critérios de conclusão da Fase 2

- Servidor Express com:

  - endpoints de leitura funcionando para:
    - clubes, competições, temporadas, rodadas e partidas;
  - paginação simples (`limit`, `offset`) em listagens.

- Endpoints testados manualmente (ou via script simples) contra o banco com
  seeds da Etapa 2 · Fase 3.

- Código organizado por módulos de rota (ex.: `routes/clubes.routes.ts`,
  `routes/competicoes.routes.ts`, etc.).
