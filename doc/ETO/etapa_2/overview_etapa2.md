# Etapa 2 — Data Core MVP (Domínio + Esquema) · fut_brazuca

## 📖 Resumo Geral

A Etapa 2 tem como objetivo transformar o modelo conceitual do fut_brazuca em um
**núcleo de dados concreto**, com:

- modelo lógico relacional claro,
- esquema físico em PostgreSQL (tabelas + constraints essenciais),
- primeiras migrações versionadas,
- queries de verificação que já respondem perguntas simples sobre clubes,
  competições, temporadas e partidas.

Ela **não** resolve ainda ingestão massiva nem consultas avançadas de confrontos
— isso virá em Etapas posteriores —, mas precisa deixar o terreno sólido para
que:

- API (Etapa 3),
- Frontend (Etapa 4),
- Ingestão (Etapa 5)

possam trabalhar sem refazer fundação.

Branches Orion para esta Etapa seguem o padrão simplificado:

- `e2-f1`, `e2-f2`, `e2-f3`, ... (uma branch por Fase, partindo sempre de
  `develop`)
- Sprints/Tarefas serão rastreadas apenas nas mensagens de commit:
  - `✨ feat(e2-f1-s1-t1): ...`
  - `🧪 test(e2-f2-s1-t2): ...`, etc.

---

## 🧭 Estrutura de Fases e Sprints

### Fase 1 — Modelo Lógico & Convenções de Esquema

**Branch:** `e2-f1`

**Objetivo da Fase:**  
Sair do desenho conceitual e chegar a um **modelo lógico relacional** pronto
para virar DDL, com entidades, relacionamentos, chaves e convenções bem
definidas.

**Sprints (macro):**

- **Sprint 1 — Refinar modelo lógico das entidades centrais**

  - Fechar estrutura relacional de:
    - `clube`, `clube_alias`,
    - `competicao`, `temporada`,
    - `fase`, `rodada`,
    - `partida`.
  - Definir chaves primárias, chaves naturais/candidatas e relacionamentos (FKs)
    em nível lógico.

- **Sprint 2 — Convenções de nomenclatura & metadados**
  - Definir padrão de nomes de tabelas/colunas (snake_case etc.).
  - Definir campos mínimos de auditoria (ex.: `created_at`, `updated_at`,
    `source_ref` quando fizer sentido).
  - Definir como chaves técnicas e chaves “de negócio” serão tratadas (UUID vs.
    serial, etc.).

**Critério de conclusão da Fase 1:**

- Diagrama lógico consolidado (pode ser descrito em Markdown/ASCII, não precisa
  ferramenta gráfica pesada).
- Tabelas e relacionamentos listados de forma inequívoca.
- Decisões de nomenclatura e tipos num único ponto de referência.

---

### Fase 2 — Esquema Físico & Migrações Iniciais (PostgreSQL)

**Branch:** `e2-f2`

**Objetivo da Fase:**  
Transformar o modelo lógico em **esquema físico** no PostgreSQL, com migrações
versionadas e constraints básicas.

**Sprints (macro):**

- **Sprint 1 — Definição de base e DDL inicial**

  - Criar migrações para:
    - `clube`, `clube_alias`,
    - `competicao`, `temporada`,
    - `fase`, `rodada`,
    - `partida`.
  - Incluir FKs, unique constraints e índices mínimos (por ex.: índice por
    `temporada_id` em `partida`).

- **Sprint 2 — Ajustes de integridade e ergonomia**
  - Validar tipos de dados (datas, inteiros, enums/textos).
  - Definir constraints de integridade que evitem estados impossíveis (ex.:
    mandante = visitante).
  - Preparar base para suportar futuros dados de confrontos sem remendo
    estrutural.

**Critério de conclusão da Fase 2:**

- Migrações rodam do zero até o estado atual sem erro.
- Banco “limpo” criado com todas as tabelas e constraints necessárias ao MVP.
- Schema é legível e coerente com a Gênese (01_genese_orion).

---

### Fase 3 — Queries de Verificação & Dados de Exemplo

**Branch:** `e2-f3`

**Objetivo da Fase:**  
Validar na prática se o Data Core responde às **perguntas básicas** do domínio,
ainda que com dados mínimos ou artificiais.

**Sprints (macro):**

- **Sprint 1 — Seeds mínimos de exemplo**

  - Inserir um conjunto pequeno de dados fictícios ou semi-reais:
    - alguns clubes,
    - 1–2 competições,
    - 1–2 temporadas,
    - algumas partidas exemplares.

- **Sprint 2 — Queries de sanidade do domínio**

  - Escrever queries (SQL puro) para:
    - listar clubes, competições, temporadas,
    - listar partidas de uma temporada,
    - conferir integridade das FKs,
    - responder pelo menos:
      - “quais partidas um clube jogou na temporada X?”,
      - “quantas partidas essa temporada tem cadastradas?”.

- **Sprint 3 — Ajustes finos**
  - Pequenos ajustes de tipos, índices e relacionamentos revelados pelos testes.
  - Documentar limitações conhecidas para Etapas futuras (ex.: faltam views de
    classificação, etc.).

**Critério de conclusão da Fase 3:**

- Há um script/roteiro de verificação que qualquer pessoa pode rodar para:
  - criar o schema,
  - popular dados de exemplo,
  - rodar queries de sanidade.
- Pelo menos algumas perguntas “humanas” básicas já são respondidas diretamente
  no SQL, sem gambiarra.

---

## 🎯 Critérios de Sucesso da Etapa 2

A Etapa 2 é considerada bem-sucedida quando:

1. O **schema PostgreSQL** do fut_brazuca:

   - representa bem as entidades centrais (clube, competicao, temporada,
     partida, etc.),
   - não impede, estruturalmente, a futura modelagem de confrontos e
     classificações derivadas.

2. É possível:

   - subir um banco vazio a partir das migrações,
   - inserir dados mínimos de teste,
   - responder perguntas básicas sobre o domínio via queries SQL.

3. As próximas Etapas (API, Frontend e Ingestão) podem partir deste schema sem
   precisar redesenhar o núcleo de dados.

---

## 🔗 Dependências e Ligações com Outras Etapas

- Depende conceitualmente de:

  - `00_semente.md`
  - `01_genese.md`
  - `02_fundacao.md`
  - `03_codex.md`

- Alimenta diretamente:
  - **Etapa 3 — API v1**, que exporá esse Data Core.
  - **Etapa 5 — Ingestão**, que precisará de um schema sólido para receber dados
    reais.
  - **Etapa 6 — Confrontos**, que usará o mesmo núcleo para
    views/materializações head-to-head.
