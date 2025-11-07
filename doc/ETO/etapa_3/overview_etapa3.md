# Etapa 3 — API v1 (Leitura do Data Core) · fut_brazuca

## 📖 Resumo Geral

A Etapa 3 cria a **API v1** do fut_brazuca, focada em **leitura** do Data Core
(somente read):

- expor endpoints para clubes, competições, temporadas, rodadas, fases e
  partidas;
- seguir boas práticas REST (paginação, filtros simples, respostas
  consistentes);
- preparar terreno para features futuras (confrontos, ingestão de dados, IA).

### Stack alvo (PERN)

- **P**: PostgreSQL (schema definido na Etapa 2)
- **E**: Express
- **R**: React (frontend em Etapa posterior)
- **N**: Node.js (idealmente 20+), preferencialmente com TypeScript

Python fica reservado para **serviços de IA/ML futuros**, possivelmente como
serviço separado, sem mexer na API principal Express.

---

## 🧭 Fases da Etapa 3

### Fase 1 — Backbone da API (esqueleto + infra mínima)

**Objetivo:**

- Criar a base do backend em Node/Express:
  - estrutura de pastas (`backend/src/...`),
  - app Express configurado,
  - configuração de ambiente (variáveis de conexão com o Postgres),
  - endpoints de health check (ex.: `GET /health` e `GET /health/db`).

### Fase 2 — Endpoints de Domínio (leitura)

**Objetivo:**

- Implementar endpoints REST de leitura para o núcleo de entidades:

  - `GET /clubes`, `GET /clubes/:id`
  - `GET /competicoes`, `GET /competicoes/:id`
  - `GET /competicoes/:id/temporadas`
  - `GET /temporadas/:id`, `GET /temporadas/:id/partidas`
  - `GET /rodadas/:id`, `GET /temporadas/:id/rodadas`
  - `GET /partidas/:id`

- Suportar:
  - paginação simples (`limit`, `offset`),
  - filtros básicos (por temporada, por clube, etc.), onde fizer sentido.

### Fase 3 — Docs, Erros & Testes básicos

**Objetivo:**

- Refinar a API v1:

  - organizar documentação (OpenAPI/Swagger gerado via libs do Express ou doc
    manual),
  - definir formato padrão de erro (payload consistente),
  - adicionar testes básicos (ex.: `/health`, alguns endpoints principais),
  - garantir que a API sobe em ambiente de dev usando o banco da Etapa 2 (com
    seeds da Etapa 2 · Fase 3).

---

## 🎯 Critério de conclusão da Etapa 3

- Servidor Express em Node rodando localmente que:

  - conecta ao PostgreSQL do fut_brazuca,
  - expõe endpoints de leitura para o núcleo de entidades,
  - possui health checks e documentação básica acessível.

- Código organizado de forma modular (config, db, rotas, domínio) pronto para
  crescer com ingestão, confrontos, IA e afins.
