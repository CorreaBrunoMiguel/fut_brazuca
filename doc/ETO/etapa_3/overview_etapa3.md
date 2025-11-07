# Etapa 3 — API v1 (Leitura do Data Core) · fut_brazuca

## 📖 Resumo Geral

A Etapa 3 cria a **API v1** do fut_brazuca, focada em **leitura** do Data Core:

- expor endpoints para clubes, competições, temporadas, rodadas, fases e
  partidas;
- seguir boas práticas de API (paginação, filtros simples, respostas
  consistentes);
- preparar terreno para futuro: filtros de confrontos, features de IA, ingestão
  etc.

Nada de escrita/ingestão ainda — apenas leitura em cima do schema construído na
Etapa 2.

Stack alvo:

- **Backend:** Python 3.11+ com **FastAPI**
- **DB:** PostgreSQL (schema já definido na Etapa 2)
- **Execução:** app modular, pensando em testes e expansão futura

---

## 🧭 Fases da Etapa 3

### Fase 1 — Backbone da API (esqueleto + infra mínima)

**Objetivo:**

- Criar o projeto backend base com FastAPI:
  - estrutura de pastas clara (app, domain, infra, api),
  - arquivo de entrada (`main.py`),
  - configuração de ambiente (settings),
  - conexão básica com PostgreSQL,
  - endpoint de health check (ex.: `/health` e `/health/db`).

---

### Fase 2 — Endpoints de Domínio (leitura)

**Objetivo:**

- Implementar endpoints REST estáveis para leitura:

  - `GET /clubes`, `GET /clubes/{id}`
  - `GET /competicoes`, `GET /competicoes/{id}`
  - `GET /competicoes/{id}/temporadas`
  - `GET /temporadas/{id}`, `GET /temporadas/{id}/partidas`
  - `GET /rodadas/{id}`, possivelmente `GET /temporadas/{id}/rodadas`
  - `GET /partidas/{id}`

- Suporte a:
  - paginação (limit/offset),
  - filtros básicos (por temporada, por clube, etc., onde fizer sentido).

---

### Fase 3 — Docs, Erros & Testes básicos

**Objetivo:**

- Refinar a API v1:

  - organizar tags e descrições do OpenAPI,
  - definir contratos de erro (estrutura de erro padrão),
  - adicionar testes básicos (ex.: `/health`, alguns endpoints de domínio),
  - garantir que a API suba em ambiente de dev com o banco populado (Etapa 2 ·
    Fase 3).

---

## 🎯 Critério de conclusão da Etapa 3

- Um servidor FastAPI que:

  - conecta ao PostgreSQL do fut_brazuca,
  - expõe endpoints de leitura para o núcleo de entidades,
  - possui health checks e documentação automática utilizável.

- Código organizado de forma modular, pronto para crescer (ingestão, confrontos,
  IA, etc.).
