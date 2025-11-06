# Fase 1 — Modelo Lógico & Convenções de Esquema · Etapa 2 · fut_brazuca

## 📖 Resumo Geral

A Fase 1 da Etapa 2 é o momento em que o fut_brazuca sai do “desenho de
caixinhas” e ganha um **modelo lógico relacional claro**, pronto para virar DDL
em PostgreSQL na próxima fase.

Aqui o foco é:

- transformar o modelo conceitual (Clube, ClubeAlias, Competicao, Temporada,
  Fase, Rodada, Partida, Confronto) em um **conjunto consistente de tabelas e
  relacionamentos**;
- definir **como o banco vai “pensar” o domínio**:

  - chaves primárias,
  - chaves de negócio (quando fizer sentido),
  - relacionamentos (FKs),
  - integridade mínima;

- consolidar **convenções de nomenclatura e tipos** que evitem bagunça futura.

Nenhuma migração física é criada nesta fase; o objetivo é sair com um **modelo
lógico bem descrito**, que sirva de contrato para a Fase 2 (esquema físico +
migrações).

- **Branch de trabalho desta Fase:** `e2-f1`
- **Sprints/Tarefas:** rastreadas nas mensagens de commit, no formato:

`<emoji> <tipo>(e2-f1-s<Z>-t<W>): descrição curta` ex.:
`✨ feat(e2-f1-s1-t1): definir entidade clube`

---

## 🧭 Estrutura da Fase

### Sprint 1 — Refinar Modelo Lógico das Entidades Centrais

**Objetivo:** Fechar o **modelo lógico relacional** das entidades principais do
fut_brazuca, garantindo que:

- `clube` e `clube_alias` representem bem a identidade canônica + nomes
  históricos;
- `competicao` e `temporada` expressem corretamente o contexto (liga/copa, ano,
  regras básicas);
- `fase`, `rodada` e `partida` consigam representar tanto ligas de pontos
  corridos quanto copas/mata-mata;
- relacionamentos e cardinalidades estejam claros (1:N, N:N via tabelas de
  junção quando necessário).

**Tarefas macro deste Sprint (a serem detalhadas no Registro Orion depois):**

- Descrever, em nível lógico:

  - atributos de cada entidade,
  - relacionamentos entre elas,
  - chaves primárias e estrangeiras esperadas.

- Garantir que o modelo responde bem às perguntas básicas, como:

  - “quais partidas um clube jogou em uma temporada X?”
  - “quais temporadas uma competição possui?”
  - “quem participou da temporada Y da competição Z?”

---

### Sprint 2 — Convenções de Nomenclatura & Metadados de Esquema

**Objetivo:** Definir um conjunto estável de **convenções de esquema** para o
Data Core:

- padrões de nomenclatura:

  - tabelas em `snake_case` (`clube`, `clube_alias`, `competicao`, `temporada`,
    `partida`, etc.),
  - colunas com sufixos consistentes (`_id`, `_at`, etc.);

- tipos de chave:

  - decisão entre `BIGINT`/`SERIAL`/`UUID` para ids técnicos,
  - quando (ou se) usar chaves naturais (ex.: códigos de competição) como
    constraints extras;

- metadados básicos:

  - campos de auditoria (`created_at`, `updated_at` ou equivalentes quando fizer
    sentido),
  - campos de origem (`source_ref`, `import_batch_id` ou similar, se forem
    necessários no núcleo).

**Tarefas macro deste Sprint (a serem detalhadas no Registro Orion depois):**

- Definir um mini-guia de nomes de tabelas/colunas e tipos base.
- Especificar políticas de chaves:

  - sempre id técnico interno,
  - como lidar com identificadores externos (códigos de APIs/fonte).

- Decidir quais entidades terão campos de auditoria no nível do schema (e quais
  não precisam).

---

## 🎯 Resultado Esperado da Fase 1

Ao final da Fase 1 (branch `e2-f1`):

- o fut_brazuca terá um **modelo lógico relacional** claro, consistindo em:

  - lista de tabelas (lógicas),
  - colunas principais,
  - relacionamentos (FKs),
  - chaves primárias;

- haverá um conjunto de **convenções de nomenclatura e tipos** que guiará:

  - a construção do schema físico na Fase 2 (`e2-f2`),
  - a leitura e manutenção futura do banco.
