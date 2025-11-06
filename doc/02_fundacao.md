# FutBrazuca · Fundação Orion

## 1. Mapa Global de Etapas

Visão em “andares” do fut_brazuca, do conceito até IA:

- **Pré-Etapa 0 — Semente Orion** ✅ Documento: `00_semente.md` Define
  identidade, fenômeno observado, pergunta científica, universo de dados,
  hipótese de solução e princípios de evolução.

- **Etapa 0 — Gênese Orion** ✅ Documento: `01_genese.md` Modelo conceitual de
  domínio (entidades/relacionamentos) + visão macro de arquitetura (camadas:
  dados, API, frontend, ingestão, IA).

- **Etapa 1 — Fundação Orion** ⬅ (este documento) Documento: `02_fundacao.md`
  Mapa de etapas do projeto, alinhamento entre elas e plano de rastreabilidade
  global (como tudo será rastreado em docs, código e dados).

- **Etapa 1.5 — Echo Codex Orion** Documento: `03_echocodex_orion.md` Congela a
  visão documental, cria o repositório “vivo”:

  - commit inicial de `00/01/02/03_*.md`,
  - criação de `main` + `develop`,
  - definição final de convenções de branches e commits para fut_brazuca.

- **Etapa 2 — Data Core MVP (Domínio + Esquema)** Objetivo: tornar o **núcleo de
  dados implementável**. Entregas:

  - modelo lógico/relacional a partir do modelo conceitual,
  - migrações iniciais (PostgreSQL),
  - entidade `Clube`, `ClubeAlias`, `Competicao`, `Temporada`, `Rodada`, `Fase`,
    `Partida`,
  - primeiras consultas de validação (queries manuais) para responder perguntas
    simples (ex: lista de temporadas, clubes, contagem de partidas).

- **Etapa 3 — API v1 (Backend de Domínio)** Objetivo: expor o núcleo via API
  estável. Entregas:

  - serviço backend (provavelmente Python + FastAPI),
  - camadas separadas (domínio, repositórios, casos de uso, endpoints),
  - endpoints para:

    - clubes e aliases,
    - competições e temporadas,
    - partidas básicas,
    - primeiras rotas de confrontos diretos simples.

- **Etapa 4 — Frontend Exploratória v1** Objetivo: permitir navegação humana
  sobre o núcleo de dados. Entregas:

  - app web (ex: React/Next.js),
  - telas:

    - navegação por competição/temporada,
    - tabela por temporada,
    - visão de clube (histórico),
    - visão simples de confronto A x B.

- **Etapa 5 — Ingestão & Garimpo Estruturado** Objetivo: transformar teu
  “garimpo feliz” em fluxo organizado. Entregas:

  - estratégia RAW vs normalizado,
  - scripts de import/limpeza,
  - mapeamento de fontes e diário de garimpo,
  - checagens de consistência (não duplicar partidas, não criar clubes
    duplicados).

- **Etapa 6 — Confrontos & Consultas Avançadas** Objetivo: elevar o poder de
  pergunta do sistema. Entregas:

  - views / materializações para confrontos diretos,
  - consultas por recortes (competição, período, casa/fora),
  - endpoints específicos para head-to-head,
  - otimizações de índice e performance.

- **Etapa 7 — IA Lab v0 (Playground)** Objetivo: provar que o núcleo de dados
  funciona como base de IA. Entregas:

  - export de datasets limpos (CSV/Parquet),
  - scripts/notebooks de feature engineering (forma recente, histórico A x B,
    etc.),
  - primeiros modelos simples (benchmark) com rastreabilidade clara.

---

## 2. Alinhamento entre Etapas (Fluxo Macro)

Como cada Etapa alimenta a próxima:

- **Semente → Gênese** A Semente define **por quê** e **o que** em termos
  filosóficos e científicos. A Gênese traduz isso em **modelo conceitual** e
  **arquitetura alvo** (quais caixinhas existem, quem conversa com quem).

- **Gênese → Fundação (este doc)** A Gênese desenha o “mapa da cidade”; a
  Fundação define:

  - quais bairros serão construídos em qual ordem (Etapas),
  - como garantir que nenhuma rua fique sem nome (rastreabilidade).

- **Fundação → Echo Codex (1.5)** A Fundação define o plano; o Echo Codex:

  - congela o plano em arquivos versionados,
  - cria o repositório vivo,
  - prepara o terreno disciplinado para implementação (branches, commits,
    convenções).

- **Echo Codex → Etapa 2 (Data Core)** Com o repositório vivo e as convenções
  fixadas:

  - Etapa 2 implementa o **núcleo de dados** como primeira base concreta,
  - toda mudança relevante na modelagem é refletida nos docs ETO da Etapa 2.

- **Etapa 2 → Etapa 3 (API)** A Etapa 3 não “inventa” dados: ela expõe o que
  Etapa 2 consolidou. Se a API sofrer para responder perguntas simples, é sinal
  de que precisa revisitar o Data Core.

- **Etapa 3 → Etapa 4 (Frontend)** O frontend consome a API; nenhuma lógica de
  domínio deve existir só na interface. Tela pedindo dado que não existe na API
  é provocação para discutir requisitos, não gambiarra.

- **Etapa 4 → Etapa 5 (Ingestão)** Quando a interface já consegue mostrar alguma
  coisa:

  - Etapa 5 passa a encher a base com dados reais,
  - qualquer dor percebida ao popular o sistema retroalimenta Etapas 2 e 3.

- **Etapa 5 → Etapa 6 (Confrontos avançados)** Com dados suficientes:

  - Etapa 6 foca em consultas complexas (head-to-head, recortes temporais),
  - testa se o modelo aguenta perguntas mais pesadas sem virar Frankenstein.

- **Etapa 6 → Etapa 7 (IA Lab)** Só depois de ver confrontos, tabelas e
  históricos funcionando bem para humanos:

  - Etapa 7 joga essa mesma verdade para o domínio dos modelos,
  - sem alterar o núcleo só para “agradar” a IA.

---

## 3. Rastreabilidade Global (Documentos, Código, Dados)

### 3.1 Documentos

Documentos “núcleo Orion” (raiz `/doc`):

- `00_semente_orion.md` Identidade, fenômeno, pergunta científica, hipóteses,
  princípios.

- `01_genese_orion.md` Modelo conceitual de domínio + arquitetura alvo macro.

- `02_fundacao_orion.md` (este) Mapa de Etapas, alinhamento entre elas e
  rastreabilidade global.

- `03_echocodex_orion.md` Declaração do repositório vivo, estrutura de branches,
  convenções finais de commits, resumo do estado zero do código.

Documentos por Etapa (a partir da Etapa 2):

- Cada Etapa terá sua árvore em `/doc/ETO/etapa_<X>/` com:

  - `overview_etapa<X>.md` (plano macro de fases e sprints),
  - `eto_faseY.md` (execução: Fase → Sprint → Tarefas com Registro Orion e
    Implementação).

### 3.2 Código (Branches & Commits)

- Branches principais:

  - `main` → releases estáveis (pós Etapa 1.5).
  - `develop` → linha de desenvolvimento principal.

- Branches de feature por tarefa (a partir da Etapa 2):

  - padrão: `feature/e<X>-f<Y>-s<Z>-t<W>-<slug-curto>`
  - Ex.: `feature/e2-f1-s1-t1-modelo-clube`

- Commits:

  - usar prefixos emoji padrão Orion (feat, fix, docs, chore, etc.),
  - commits de planejamento JSON (tarefas, etc.) com prefixo
    `🧭 plan(eX-fY): ...`,
  - mensagens descritivas curtas, sempre referenciando Etapa/Fase/Tarefa quando
    fizer sentido.

### 3.3 Dados

- Separação conceitual:

  - **RAW**: dados como vêm das fontes (dumps, CSVs, respostas de APIs).
  - **NORMALIZADO**: dados já encaixados no modelo canônico (`Clube`, `Partida`,
    etc.).

- Rastreabilidade:

  - cada lote de importação deve carregar:

    - fonte (URL, nome do site, arquivo),
    - data de import,
    - script/processo usado (versão, se possível),
    - decisões especiais (renames manuais, ajuste de dados).

- Diário de garimpo:

  - documento vivo (por ex. `/doc/garimpo/diario_garimpo.md` na Etapa 5),
  - registra “arqueologia de dados”:

    - onde foi difícil,
    - quais fontes são mais confiáveis,
    - como resolver conflitos (dois sites divergentes sobre um placar, por
      exemplo).

---

## 4. Critérios de Encerramento por Etapa (Macro)

- **Etapas 0 e 1 (Semente, Gênese, Fundação):**

  - documentos `00`, `01`, `02` completos, coerentes entre si,
  - visão clara das Etapas futuras, mesmo que nomes internos mudem levemente.

- **Etapa 1.5 (Echo Codex):**

  - `00–03` versionados em `main`,
  - `develop` criada e definida como branch padrão,
  - padrões de branches/commits registrados,
  - repositório considerado oficialmente “vivo”.

- **Etapa 2 (Data Core MVP):**

  - modelo físico implementado (migrações rodando),
  - queries de verificação respondendo perguntas básicas sobre
    clubes/competições/partidas.

- **Etapa 3 (API v1):**

  - endpoints mínimos para navegar no domínio (clubes, competições, temporadas,
    partidas),
  - testes básicos garantindo que API reflete corretamente o núcleo de dados.

- **Etapa 4 (Frontend v1):**

  - usuário consegue navegar:

    - por competição/temporada,
    - ver tabela,
    - ver histórico simples de um clube.

- **Etapa 5 (Ingestão):**

  - pelo menos um conjunto de temporadas-chave totalmente populado (ex.:
    Brasileirão A 2003–2005),
  - diário de garimpo criado e em uso.

- **Etapa 6 (Confrontos):**

  - consultas head-to-head estáveis via API,
  - visualização de confronto A x B funcionando para humanos.

- **Etapa 7 (IA Lab v0):**

  - pelo menos um experimento de modelo documentado,
  - dataset de treino reprodutível descrito (de onde veio, como foi montado).

---
