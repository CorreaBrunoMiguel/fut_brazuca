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

## Como rodar as migrações

Pré-requisitos:

- PostgreSQL acessível localmente ou via Docker.
- Um banco criado para desenvolvimento, por exemplo:

  ```sql
  CREATE DATABASE fut_brazuca_dev;
  CREATE USER fut_brazuca WITH PASSWORD 'sua_senha';
  GRANT ALL PRIVILEGES ON DATABASE fut_brazuca_dev TO fut_brazuca;
  ```

### Rodando migrações

Por padrão, o script `db/migrate.sh`usa:

- `DB_HOST=localhost`
- `DB_PORT=5432`
- `DB_NAME=fut_brazuca_dev`
- `DB_USER=fut_brazuca`

Execute:

```bash
DB_USER=fut_brazuca DB_NAME=fut_brazuca_dev ./db/migrate.sh
```

Se precisar passar opções extras para o `psql` (por exemplo, `-W` para pedir
senha)

```bash
DB_EXTRA_OPTS="-W" DB_USER=fut_brazuca DB_NAME=fut_brazuca_dev ./db/migrate.sh
```

Após rodar, você pode inspecionar o schema:

```bash
psql -h localhost -p 5432 -U fut_brazuca -d fut_brazuca_dev

-- dentro do psql:
\dt
\d clube
\d partida
```
