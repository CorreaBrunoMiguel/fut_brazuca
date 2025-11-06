# MER / Modelo Lógico — fut_brazuca

> Versão inicial do modelo lógico do núcleo de dados do fut_brazuca  
> (nível lógico, independente de tipos físicos exatos).

## Visão Geral

Entidades principais:

- `clube` (canônico)
- `clube_alias` (nomes/escudos históricos)
- `competicao`
- `temporada`
- `fase`
- `rodada`
- `partida`

A partir dessas entidades, o sistema deve ser capaz de responder:

- tabelas e históricos por temporada,
- participação de clubes em competições ao longo dos anos,
- confrontos diretos entre clubes (head-to-head),
- consultas por fase/rodada.

---

## Entidade: clube

**Descrição:** identidade canônica do clube. Tudo no domínio aponta para
`clube`.

| Campo          | Tipo lógico   | Obrigatório | Descrição                                            |
| -------------- | ------------- | ----------- | ---------------------------------------------------- |
| `id`           | identificador | sim         | Identificador interno único do clube.                |
| `nome_atual`   | texto         | sim         | Nome atual do clube, usado como exibição padrão.     |
| `sigla`        | texto         | não         | Sigla do clube (ex.: FLA, COR).                      |
| `slug`         | texto         | sim         | Nome url-friendly (ex.: `flamengo`).                 |
| `cidade`       | texto         | não         | Cidade-sede.                                         |
| `estado`       | texto         | não         | UF (ex.: RJ, SP).                                    |
| `pais`         | texto         | não         | País (ex.: Brasil).                                  |
| `fundacao_ano` | inteiro       | não         | Ano de fundação (se conhecido).                      |
| `ativo`        | booleano      | não         | Indica se o clube está ativo no contexto do sistema. |
| `created_at`   | datetime      | não         | Carimbo de criação (auditoria).                      |
| `updated_at`   | datetime      | não         | Carimbo de última atualização.                       |

**Regras:**

- `id` é a chave primária.
- `nome_atual` deve ser praticamente único (podemos reforçar com combinação
  `nome_atual + estado` na implementação).
- Outras entidades referenciam sempre `clube.id` (e nunca `clube_alias`).

---

## Entidade: clube_alias

**Descrição:** representações históricas de um clube (nomes/escudos por
período).

| Campo             | Tipo lógico   | Obrigatório | Descrição                                                 |
| ----------------- | ------------- | ----------- | --------------------------------------------------------- |
| `id`              | identificador | sim         | Identificador técnico do alias.                           |
| `clube_id`        | identificador | sim         | FK lógica → `clube.id`.                                   |
| `nome`            | texto         | sim         | Nome do clube nesse período histórico.                    |
| `sigla`           | texto         | não         | Sigla usada nesse período (se diferente).                 |
| `slug`            | texto         | não         | Slug correspondente ao nome desse período.                |
| `tipo_alias`      | texto         | não         | Categoria (`nome`, `escudo`, `fusao`, `outro`...).        |
| `vigencia_inicio` | data/ano      | não         | Início de validade desse alias.                           |
| `vigencia_fim`    | data/ano      | não         | Fim de validade (null se indefinido/atual nesse recorte). |
| `nota`            | texto         | não         | Observações (fusões, casos especiais, etc.).              |
| `created_at`      | datetime      | não         | Auditoria.                                                |
| `updated_at`      | datetime      | não         | Auditoria.                                                |

**Regras:**

- PK: `id`.
- FK: `clube_id` → `clube.id`.
- Um `clube` pode ter **muitos** `clube_alias`.
- Nenhuma outra entidade do domínio referencia diretamente `clube_alias`.

---

## Entidade: competicao

**Descrição:** tipo de competição (ex.: Brasileirão Série A, Copa do Brasil).

| Campo         | Tipo lógico   | Obrigatório | Descrição                          |
| ------------- | ------------- | ----------- | ---------------------------------- |
| `id`          | identificador | sim         | Identificador da competição.       |
| `nome`        | texto         | sim         | Nome da competição.                |
| `slug`        | texto         | sim         | Slug (ex.: `brasileirao-serie-a`). |
| `tipo`        | texto         | sim         | `liga`, `copa` ou `misto`.         |
| `nivel`       | texto         | não         | `nacional`, `continental` etc.     |
| `organizador` | texto         | não         | Ex.: `CBF`, `CONMEBOL`.            |
| `descricao`   | texto         | não         | Descrição/resumo da competição.    |
| `ativo`       | booleano      | não         | Competição ainda existe?           |
| `created_at`  | datetime      | não         | Auditoria.                         |
| `updated_at`  | datetime      | não         | Auditoria.                         |

**Regras:**

- PK: `id`.
- `nome` e/ou `slug` devem ser únicos.

---

## Entidade: temporada

**Descrição:** edição específica de uma competição em um ano (ex.: Brasileirão
Série A 2003).

| Campo                  | Tipo lógico   | Obrigatório | Descrição                                           |
| ---------------------- | ------------- | ----------- | --------------------------------------------------- |
| `id`                   | identificador | sim         | Identificador da temporada.                         |
| `competicao_id`        | identificador | sim         | FK lógica → `competicao.id`.                        |
| `ano`                  | inteiro       | sim         | Ano da temporada (ex.: 2003).                       |
| `descricao`            | texto         | não         | Texto descritivo (ex.: “Brasileirão Série A 2003”). |
| `formato`              | texto         | não         | Ex.: `pontos_corridos`, `mata_mata`, `misto`.       |
| `numero_times`         | inteiro       | não         | Quantidade de clubes participantes.                 |
| `numero_rodadas`       | inteiro       | não         | Número de rodadas (ligas).                          |
| `tem_rebaixamento`     | booleano      | não         | Se há rebaixamento nessa edição.                    |
| `tem_acesso`           | booleano      | não         | Se há acesso (principalmente em Série B).           |
| `detalhes_regulamento` | texto         | não         | Particularidades do regulamento.                    |
| `created_at`           | datetime      | não         | Auditoria.                                          |
| `updated_at`           | datetime      | não         | Auditoria.                                          |

**Regras:**

- PK: `id`.
- FK: `competicao_id` → `competicao.id`.
- Combinação (`competicao_id`, `ano`) deve ser única.

---

## Entidade: fase

**Descrição:** bloco da temporada, principalmente para copas (ex.: oitavas,
quartas).

| Campo          | Tipo lógico   | Obrigatório | Descrição                                             |
| -------------- | ------------- | ----------- | ----------------------------------------------------- |
| `id`           | identificador | sim         | Identificador da fase.                                |
| `temporada_id` | identificador | sim         | FK lógica → `temporada.id`.                           |
| `nome`         | texto         | sim         | Nome da fase (ex.: “Oitavas de final”).               |
| `ordem`        | inteiro       | não         | Ordem da fase dentro da temporada.                    |
| `tipo`         | texto         | não         | Ex.: `eliminatoria_simples`, `ida_e_volta`, `grupos`. |
| `descricao`    | texto         | não         | Detalhes adicionais.                                  |
| `created_at`   | datetime      | não         | Auditoria.                                            |
| `updated_at`   | datetime      | não         | Auditoria.                                            |

**Regras:**

- PK: `id`.
- FK: `temporada_id` → `temporada.id`.

---

## Entidade: rodada

**Descrição:** rodada de liga (ex.: rodada 1 a 38 do Brasileirão).

| Campo          | Tipo lógico   | Obrigatório | Descrição                        |
| -------------- | ------------- | ----------- | -------------------------------- |
| `id`           | identificador | sim         | Identificador da rodada.         |
| `temporada_id` | identificador | sim         | FK lógica → `temporada.id`.      |
| `numero`       | inteiro       | sim         | Número da rodada (1..N).         |
| `data_inicio`  | date/datetime | não         | Data de início da rodada.        |
| `data_fim`     | date/datetime | não         | Data de fim da rodada.           |
| `descricao`    | texto         | não         | Descrição (ex.: “Rodada final”). |
| `created_at`   | datetime      | não         | Auditoria.                       |
| `updated_at`   | datetime      | não         | Auditoria.                       |

**Regras:**

- PK: `id`.
- FK: `temporada_id` → `temporada.id`.
- (`temporada_id`, `numero`) deve ser único.

---

## Entidade: partida

**Descrição:** evento de jogo; elemento central do sistema.

| Campo                     | Tipo lógico   | Obrigatório | Descrição                                        |
| ------------------------- | ------------- | ----------- | ------------------------------------------------ |
| `id`                      | identificador | sim         | Identificador da partida.                        |
| `temporada_id`            | identificador | sim         | FK lógica → `temporada.id`.                      |
| `fase_id`                 | identificador | não         | FK lógica → `fase.id` (copas).                   |
| `rodada_id`               | identificador | não         | FK lógica → `rodada.id` (ligas).                 |
| `data_hora`               | datetime      | sim         | Data e horário da partida.                       |
| `estadio`                 | texto         | não         | Estádio.                                         |
| `cidade`                  | texto         | não         | Cidade.                                          |
| `estado`                  | texto         | não         | UF.                                              |
| `mandante_id`             | identificador | sim         | FK lógica → `clube.id`.                          |
| `visitante_id`            | identificador | sim         | FK lógica → `clube.id`.                          |
| `gols_mandante`           | inteiro       | sim         | Gols do mandante.                                |
| `gols_visitante`          | inteiro       | sim         | Gols do visitante.                               |
| `decisao_penaltis`        | booleano      | não         | Se houve decisão em pênaltis (copas).            |
| `gols_penaltis_mandante`  | inteiro       | não         | Gols do mandante nos pênaltis (se aplicável).    |
| `gols_penaltis_visitante` | inteiro       | não         | Gols do visitante nos pênaltis (se aplicável).   |
| `observacoes`             | texto         | não         | Observações (WO, jogo anulado, etc.).            |
| `source_ref`              | texto         | não         | Referência à origem dos dados (lote, URL, etc.). |
| `created_at`              | datetime      | não         | Auditoria.                                       |
| `updated_at`              | datetime      | não         | Auditoria.                                       |

**Regras:**

- PK: `id`.
- FKs:
  - `temporada_id` → `temporada.id`
  - `fase_id` → `fase.id` (opcional)
  - `rodada_id` → `rodada.id` (opcional)
  - `mandante_id` → `clube.id`
  - `visitante_id` → `clube.id`
- Constraint lógica: `mandante_id != visitante_id`.

---

## Relacionamentos (resumo)

- `clube (1)` → `clube_alias (N)`
- `competicao (1)` → `temporada (N)`
- `temporada (1)` → `fase (N)`
- `temporada (1)` → `rodada (N)`
- `temporada (1)` → `partida (N)`
- `fase (1)` → `partida (N)` (opcional)
- `rodada (1)` → `partida (N)` (opcional)
- `clube (1)` → `partida.mandante_id` / `partida.visitante_id` (N)

Esse MER lógico servirá de base direta para:

- definição de tipos físicos e constraints na Etapa 2 · Fase 2 (esquema
  PostgreSQL),
- desenho das rotas principais da API na Etapa 3,
- referência para ingestão de dados (Etapa 5) e consultas de confrontos (Etapa
  6).
