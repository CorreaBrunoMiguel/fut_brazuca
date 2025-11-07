# Fase 3 — Seeds de Exemplo & Queries de Verificação · Etapa 2 · fut_brazuca

## 📖 Resumo Geral

A Fase 3 da Etapa 2 tem como objetivo **provar na prática** que o Data Core do
fut_brazuca:

- sobe limpo,
- aceita dados coerentes,
- responde perguntas básicas do domínio via SQL.

Não é ainda ingestão “valendo” (isso vem na Etapa 5), mas um **laboratório
controlado** com:

- um pequeno conjunto de dados de exemplo (clubes, competições, temporadas,
  partidas),
- queries de verificação que simulam perguntas humanas típicas.

- **Branch da Fase:** `e2-f3` (a partir de `develop`)
- **Docs de referência:**
  - `doc/mer_fut_brazuca.md`
  - `doc/ETO/etapa_2/overview_etapa2.md`
  - `doc/ETO/etapa_2/eto_fase1.md`
  - `doc/ETO/etapa_2/eto_fase2.md`

---

## 🧭 Sprints da Fase 3

### Sprint 1 — Seeds mínimos de exemplo

**Objetivo:**  
Popular o schema com um conjunto **pequeno, mas coerente** de dados:

- alguns clubes,
- pelo menos:
  - 1 competição de liga (ex.: “Brasileirão Série A”),
  - 1 competição de copa (ex.: “Copa do Brasil”),
- 1–2 temporadas por competição,
- algumas rodadas/fases,
- partidas suficientes para testar consultas.

Não precisa ser 100% fiel à realidade ainda — só consistente e interessante.

---

### Sprint 2 — Queries de sanidade do domínio

**Objetivo:**  
Escrever queries SQL que:

- listem clubes, competições e temporadas,
- listem partidas de uma temporada,
- recuperem jogos de um clube em uma temporada,
- contem quantas partidas uma temporada tem cadastradas,
- verifiquem integridade básica (FKs, existência de dados relacionados).

Essas queries podem ficar:

- em um arquivo `.sql` (ex.: `db/sanity_checks.sql`),
- ou documentadas em `db/README.md`.

---

### Sprint 3 — Ajustes finos & limitações conhecidas

**Objetivo:**  
A partir dos seeds e queries:

- fazer pequenos ajustes de tipos / colunas / constraints, se algo óbvio estiver
  faltando,
- documentar **limitações conhecidas** para as próximas Etapas:
  - ex.: “não temos views de classificação ainda”,
  - “confrontos diretos ainda serão implementados na Etapa 6”.

---

## 🎯 Critérios de Conclusão da Fase 3

- É possível subir um banco, rodar migrações, inserir seeds de exemplo e:

  - rodar queries que respondem:
    - “quais partidas a temporada X tem?”
    - “quais partidas o clube Y jogou na temporada X?”
    - “quais competições e temporadas estão cadastradas?”

- O schema foi ajustado, se necessário, para cobrir problemas óbvios revelados
  pelos seeds.

- Existe um ponto de referência (arquivo ou doc) com:
  - as queries de sanidade,
  - uma visão clara do que o banco já responde bem
  - e do que ainda falta (para Etapa 3, 5, 6).
