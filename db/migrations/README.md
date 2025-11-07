# Migrações de banco · fut_brazuca

Este diretório contém as migrações SQL do schema PostgreSQL do fut_brazuca.

## Convenções

- Banco alvo: **PostgreSQL**
- Migrações em **SQL puro**, aplicadas na ordem numérica do prefixo.
- Nomes seguem o padrão:

  `NNN_descricao_curta.sql`

  onde `NNN` é um número com 3 dígitos:

  - `001_clube_e_clube_alias.sql`
  - `002_competicao_e_temporada.sql`
  - `003_fase_rodada_e_partida.sql`

## Ordem planejada

1. `001_clube_e_clube_alias.sql`

   - Tabelas: `clube`, `clube_alias`.

2. `002_competicao_e_temporada.sql`

   - Tabelas: `competicao`, `temporada`.

3. `003_fase_rodada_e_partida.sql`
   - Tabelas: `fase`, `rodada`, `partida`.

Cada arquivo deve ser **idempotente em ambiente limpo** (ou seja, funcionar bem
quando aplicado em um banco vazio).
