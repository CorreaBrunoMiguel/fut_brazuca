# Fase 1 — Backbone da API (Esqueleto & Infra) · Etapa 3 · fut_brazuca

## 📖 Resumo Geral

A Fase 1 da Etapa 3 constrói o **esqueleto da API v1** em Node/Express:

- estrutura de pastas do backend (`backend/`),
- app Express básico,
- configuração de ambiente (variáveis para conexão com PostgreSQL),
- endpoints de health check (`/health` e `/health/db`).

Nada de endpoints de domínio ainda; apenas a base para a Fase 2.

- **Branch da Fase:** `e3-f1` (a partir de `develop`)

---

## 🧭 Sprints da Fase 1

### Sprint 1 — Estrutura do projeto & app base

**Objetivo:**

- Criar a estrutura inicial do backend Node/Express:

  - diretório `backend/`,
  - subpastas principais:
    - `backend/src/config` (settings/env),
    - `backend/src/db` (pool de conexão),
    - `backend/src/routes` (rotas Express),
    - `backend/src/server.ts` (ou `server.js`) — ponto de entrada,
  - app Express respondendo a `GET /health` com algo simples (ex.:
    `{ status: 'ok' }`).

---

### Sprint 2 — Configuração & Conexão com o DB

**Objetivo:**

- Conectar o app Express ao PostgreSQL do fut_brazuca:

  - definir um módulo de configuração lendo variáveis de ambiente
    (`DATABASE_URL` ou parâmetros separados),
  - criar módulo de conexão (ex.: usando `pg` com pool),
  - implementar `GET /health/db` que executa um `SELECT 1` no banco e reporta
    status.

---

## 🎯 Critérios de conclusão da Fase 1

- Projeto backend Node/Express criado em `backend/`, versionado no repo
  fut_brazuca.
- Comando de desenvolvimento (ex.: `npm run dev` ou `pnpm dev`) que:

  - sobe o servidor,
  - responde em `GET /health` com 200,
  - responde em `GET /health/db` com 200 quando o banco estiver acessível.

- Configuração via variáveis de ambiente documentada:
  - ex.: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
  - ou uma única `DATABASE_URL` no formato do `pg`.
