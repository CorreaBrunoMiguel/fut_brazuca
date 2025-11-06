# FutBrazuca · Codex Orion

## 1. Declaração de Repositório Vivo

Este documento registra o momento em que o fut_brazuca deixa de ser apenas
documentação e passa a existir como **repositório vivo**, com:

- visão filosófica consolidada (`00_semente.md`),
- modelo conceitual e arquitetura alvo (`01_genese.md`),
- mapa global de etapas e rastreabilidade (`02_fundacao.md`),
- e este próprio Echo Codex (`03_codex.md`), que sela:

  - estrutura inicial de diretórios,
  - convenções de Git,
  - estado zero oficial do projeto.

A partir deste ponto, qualquer mudança relevante em visão, modelo ou fluxo deve
ser refletida em commits rastreáveis.

---

## 2. Estrutura Inicial de Diretórios e Arquivos

Estado inicial desejado do repositório `fut_brazuca`:

```text
fut_brazuca/
  └── doc/
      ├── 00_semente.md        # Identidade, fenômeno, pergunta científica, hipóteses
      ├── 01_genese.md         # Modelo conceitual e arquitetura macro
      ├── 02_fundacao.md       # Mapa de etapas e rastreabilidade global
      └── 03_codex.md      # Este documento: repo vivo, git & baseline
```

Decisões explícitas neste momento:

- Nenhum código de aplicação ainda (sem `backend/`, `frontend/`, etc.).
- Nenhuma configuração de runtime ainda (`package.json`, `pyproject.toml`,
  Docker, etc.).

  - Essas estruturas serão criadas **a partir da Etapa 2** (Data Core), em
    Fase/Sprint/Tarefas específicas.

- Arquivos de qualidade de código como `.prettierrc`:

  - **não são criados automaticamente aqui**;
  - respeitamos o acordo de que a configuração avançada de Prettier é
    responsabilidade futura explícita, não um default jogado.

---

## 3. Convenções de Git — fut_brazuca

### 3.1 Branches principais

- `main`

  - Linha de releases estáveis.
  - Recebe apenas:

    - o commit inicial dos 4 documentos Orion (Etapas 0, 1, 1.5),
    - merges de features validadas (sem fast-forward, via PR/merge request).

- `develop`

  - Branch padrão de desenvolvimento contínuo.
  - Criada logo após o commit inicial na `main`.
  - Toda feature nasce a partir de `develop`.

### 3.2 Branches de feature

Padrão geral a partir da Etapa 2:

```text
feature/e<X>-f<Y>-s<Z>-t<W>-<slug-curto>
```

Exemplos:

- `feature/e2-f1-s1-t1-modelo-clube`
- `feature/e3-f1-s1-t2-endpoints-clubes`
- `feature/e4-f1-s1-t3-view-confrontos`

Interpretação:

- `e<X>` → Etapa
- `f<Y>` → Fase
- `s<Z>` → Sprint
- `t<W>` → Tarefa

Slug final curto e descritivo em `kebab-case`.

### 3.3 Commits

Commits devem:

- usar prefixos emoji padrão Orion, por exemplo:

  - `✨ feat: ...` (novas funcionalidades),
  - `🐛 fix: ...` (correções),
  - `📝 docs: ...` (documentação),
  - `🛠️ refactor: ...` (refatoração),
  - `🧪 test: ...` (testes),
  - `🧹 chore: ...` (tarefas auxiliares),
  - `🚀 release: ...` (releases),
  - `🔧 build: ...` (build/config infra),
  - `🔭 perf: ...` (performance/observabilidade),
  - `🛡️ security: ...` (ajustes de segurança).

- manter mensagens curtas, porém claras,

- referenciar Etapa/Fase/Tarefa quando fizer sentido.

Padrão especial para atualização de arquivos de planejamento (ex:
`faseY_tarefas.json`, etapas futuras):

- `🧭 plan(eX-fY): descrição curta`

  - Ex.: `🧭 plan(e2-f1): sync fase1_tarefas.json`

### 3.4 Tags

Quando releases forem relevantes (no futuro):

- utilizar tags semânticas (ex.: `v0.1.0`, `v0.2.0`),
- sempre associadas a merges na `main`.

---

## 4. Baseline Técnico Declarado (sem arquivos ainda)

Esta seção registra as **decisões de stack alvo** já assumidas nas Etapas
anteriores, sem ainda criar nenhum arquivo de código:

- **Banco de dados:**

  - PostgreSQL como banco relacional principal.
  - Modelo normalizado para:

    - `Clube`, `ClubeAlias`, `Competicao`, `Temporada`, `Rodada`, `Fase`,
      `Partida`, etc.

  - Uso eventual de JSONB apenas quando realmente fizer sentido.

- **Backend / API:**

  - Linguagem: Python (preferência por 3.11+).
  - Framework: FastAPI, seguindo padrões Orion:

    - camadas bem definidas (domínio, repositórios, aplicação, interface).
    - endpoints REST estáveis, com possibilidade futura de camada analítica
      extra.

- **Frontend:**

  - Stack alvo: React + TypeScript (provável Next.js em modo SPA/SSR).
  - Foco: UX limpa para:

    - navegar por competições/temporadas,
    - visualizar tabelas,
    - ver histórico de clubes,
    - explorar confrontos diretos.

- **Qualidade & Tooling (a aplicar na Etapa 2+):**

  - Respeitar `.prettierrc` do usuário, se/quando existir.
  - Não criar configs de formatação sem alinhamento.
  - Linters, formatadores, testes e afins serão definidos dentro de tarefas
    específicas de Etapas futuras.

---

## 5. Estado Zero Oficial (Snapshot)

No momento deste Echo Codex, considera-se como **estado zero oficial** do
fut_brazuca:

1. Repositório inicializado com:

   - pasta `doc/`,
   - arquivos:

     - `00_semente.md`,
     - `01_genese.md`,
     - `02_fundacao.md`,
     - `03_codex.md`.

2. Branches:

   - `main` existente com o commit inicial desses arquivos.
   - `develop` criada a partir de `main` e definida como branch padrão de
     trabalho.

3. Ainda **não existem**:

   - código de backend,
   - código de frontend,
   - esquemas físicos de banco,
   - scripts de ingestão,
   - configurações de build, CI/CD ou formatação.

Tudo isso será criado, fase a fase, a partir da **Etapa 2 — Data Core MVP**,
seguindo o Protocolo Orion.

---

## 6. Roteiro Sugerido de Comandos (Opcional, Referencial)

Exemplo de como materializar este Echo Codex na prática:

```bash
# 1. Inicializar o repositório
git init

mkdir -p doc

# 2. Criar/copiar os quatro documentos
# (colar conteúdos de 00, 01, 02, 03 nos arquivos correspondentes)

git add doc/00_semente.md doc/01_genese.md doc/02_fundacao.md doc/03_codex.md
git commit -m "📝 docs: seed fut_brazuca Orion core (00–03)"

# 3. Garantir que a branch é main
git branch -M main

# 4. Criar develop a partir de main
git checkout -b develop
```

Depois disso, qualquer implementação da **Etapa 2 em diante** deve começar a
partir da `develop`, criando as branches `feature/e2-...` conforme as Tarefas
forem nascendo.

---

Com este Echo Codex, o fut_brazuca está oficialmente **“on-line” no plano do
Git**. Na próxima fase (Etapa 2), a gente sai da arquitetura teórica e começa a
atacar o **Data Core MVP**: modelagem relacional concreta, migrações e primeiras
queries que já respondem perguntas simples sobre o domínio.
