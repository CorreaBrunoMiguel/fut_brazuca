# Fase 1 — Backbone da API (Esqueleto & Infra) · Etapa 3 · fut_brazuca

## 📖 Resumo Geral

A Fase 1 da Etapa 3 constrói o **esqueleto da API**:

- estrutura de pastas do backend,
- app FastAPI básico,
- configuração de ambiente (settings),
- conexão com PostgreSQL,
- endpoints de health check.

Nada de endpoints de domínio ainda; apenas a base sobre a qual Fase 2 vai
trabalhar.

- **Branch da Fase:** `e3-f1` (a partir de `develop`)

---

## 🧭 Sprints da Fase 1

### Sprint 1 — Estrutura do projeto & app base

**Objetivo:**

- Criar a estrutura inicial do backend:

  - diretório `backend/` (ou similar),
  - layout de módulos (`backend/app`, `backend/app/api`, `backend/app/core`,
    `backend/app/db`, etc.),
  - app FastAPI com rota `/health` simples,
  - configuração básica de logging.

---

### Sprint 2 — Configuração & Conexão com DB

**Objetivo:**

- Conectar o app FastAPI ao PostgreSQL do fut_brazuca:

  - definir objeto de configuração (carregando env vars),
  - criar módulo de conexão com o banco (ex.: via `asyncpg` ou `sqlalchemy` — a
    decidir na implementação),
  - implementar `/health/db` verificando conectividade com o banco.

---

## 🎯 Critérios de conclusão da Fase 1

- Projeto backend com estrutura clara, versionado no repo fut_brazuca.
- App FastAPI inicial rodando localmente (ex.: via `uvicorn`) com:
  - `/health` respondendo 200 e alguma payload simples,
  - `/health/db` confirmando se o banco está acessível.
- Configuração via variáveis de ambiente documentada, pronta para uso na Fase 2.
