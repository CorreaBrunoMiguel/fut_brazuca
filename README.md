# fut_brazuca

> Núcleo canônico de dados do futebol brasileiro (2003+), com foco em clubes,
> competições, partidas e confrontos diretos, exposto via API e visualizações
> limpas — e preparado para análises e IA no futuro.

---

## Visão Geral

O **fut_brazuca** é um projeto voltado a organizar, de forma estruturada e
auditável, os dados do futebol de clubes no Brasil a partir de **2003**, com
foco em:

- **Campeonato Brasileiro Série A** (pontos corridos),
- **Campeonato Brasileiro Série B**,
- **Copa do Brasil**.

O objetivo principal é construir um **núcleo de dados canônico** que:

- represente corretamente clubes, competições, temporadas, rodadas, fases e
  partidas;
- permita consultas ricas (tabela por temporada, histórico de clubes, confrontos
  diretos A x B);
- sirva de base confiável para um **laboratório de IA** no futuro (previsão de
  resultados, chances de rebaixamento, etc.).

---

## Objetivos

- Modelar o domínio do futebol brasileiro (2003+) com **consistência e
  extensibilidade**.
- Tratar **clubes** como entidades canônicas, suportando:
  - mudanças de nome,
  - mudanças de escudo,
  - aliases históricos.
- Permitir consultas de:
  - tabela de ligas por rodada/temporada,
  - histórico de um clube por competição/ano,
  - **confrontos diretos (head-to-head)** entre clubes, com filtros.
- Expor esses dados via uma **API bem definida** e um **frontend limpo e
  navegável**.
- Preparar uma base sólida para **experimentos de IA** sem comprometer a
  integridade do domínio.

---

## Escopo Inicial

**Período:**

- A partir de **2003** (inclusive), para todas as competições suportadas.

**Competições incluídas no MVP:**

- Brasileirão Série A (liga em pontos corridos).
- Brasileirão Série B.
- Copa do Brasil (mata-mata).

**Planejadas para fases futuras:**

- Série C e Série D.
- Libertadores e Sul-Americana.

---

## Arquitetura (Visão Macro)

O projeto é pensado em camadas:

1. **Data Core (PostgreSQL)**

   - Tabelas principais:
     - `Clube`, `ClubeAlias`,
     - `Competicao`, `Temporada`,
     - `Fase`, `Rodada`,
     - `Partida`,
     - estruturas derivadas para **classificação** e **confrontos diretos**.
   - Foco em modelo relacional claro, com uso pontual de JSONB apenas quando
     fizer sentido.

2. **Backend / API (Python + FastAPI)**

   - Camadas separadas:
     - domínio (regras e modelos),
     - repositórios (acesso a dados),
     - casos de uso,
     - endpoints HTTP.
   - Estilo primário: **REST** bem definido.
   - Endpoints planejados para:
     - clubes e aliases,
     - competições e temporadas,
     - partidas,
     - tabelas de ligas,
     - confrontos diretos A x B com filtros.

3. **Frontend Web (React + TypeScript)**

   - Navegação por:
     - competição → temporada → rodada/tabela,
     - clube → histórico em diferentes competições,
     - confronto direto (head-to-head) entre clubes.
   - Prioridade: **clareza e legibilidade**, não efeitos visuais complexos.

4. **Ingestão / Garimpo**

   - Scripts para importar dados brutos (RAW) de fontes externas.
   - Pipeline de normalização para o modelo canônico:
     - mapeamento de nomes de clubes para IDs canônicos,
     - detecção e prevenção de duplicações de partidas.
   - Registro das decisões de garimpo em um “diário” próprio.

5. **IA Lab (Futuro)**
   - Geração de datasets reproduzíveis (CSV/Parquet).
   - Scripts/notebooks para:
     - feature engineering (forma recente, histórico de confrontos, etc.),
     - experimentos de modelos de previsão.

---

## Estado Atual do Projeto

O fut_brazuca segue o **Protocolo Orion** de criação de aplicações.

Etapas concluídas em documentação:

- ✅ **Pré-Etapa 0 — Semente Orion**  
  `doc/00_semente_orion.md`  
  Identidade, fenômeno observado, pergunta científica, universo de dados,
  hipóteses.

- ✅ **Etapa 0 — Gênese Orion**  
  `doc/01_genese_orion.md`  
  Modelo conceitual do domínio e visão de arquitetura em camadas.

- ✅ **Etapa 1 — Fundação Orion**  
  `doc/02_fundacao_orion.md`  
  Mapa global de etapas, fluxo entre elas e rastreabilidade (docs, código,
  dados).

- ✅ **Etapa 1.5 — Echo Codex Orion**  
  `doc/03_echocodex_orion.md`  
  Declara o repositório como “vivo”, define branches (`main`, `develop`),
  convenções de Git e snapshot inicial.

**Implementação de código (Data Core, API, frontend, ingestão) começa na
Etapa 2.**

---

## Estrutura de Pastas (Atual)

```text
fut_brazuca/
  └── doc/
      ├── 00_semente_orion.md
      ├── 01_genese_orion.md
      ├── 02_fundacao_orion.md
      └── 03_echocodex_orion.md
```
