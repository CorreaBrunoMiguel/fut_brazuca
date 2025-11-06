# FutBrazuca - Semente

## 1. Identidade da Aplicação

**Nome do projeto (provisório):** Orion FutBR Core **Tagline:**

> “O futebol brasileiro em dados canônicos — da partida isolada ao confronto
> histórico.”

**Essência em uma frase:** Um **núcleo canônico de dados** do futebol brasileiro
(clubes + competições + partidas + confrontos), exposto via API e visualizações
limpas, pensado desde o início para ser combustível de análises e IA.

**Três camadas de visão:**

1. **Data Core** – modelagem, banco, integridade, histórico, confrontos,
   identidades de clubes.
2. **API & Apps** – backend estável + frontend exploratório, focado em consultas
   humanas.
3. **IA Lab (futuro)** – camada de experimentos em cima de uma base confiável.

---

## 2. Fenômeno Observado

1. Dados do futebol brasileiro estão espalhados, divergentes e pouco
   estruturados:

   - nomes diferentes para o mesmo clube,
   - formatos distintos de competições,
   - tabelas e confrontos calculados “na mão” ou só em UI.

2. O foco costuma ser o **produto final** (site bonitinho ou “modelo preditivo
   bacana”), não o **núcleo de dados**:

   - pouco cuidado com rastreabilidade,
   - difícil reproduzir ou auditar qualquer análise.

3. A tarefa de “escavar dados” é vista como castigo, não como **parte criativa
   da construção**:

   - poucos projetos tratam o garimpo como fluxo estruturado,
   - quase nunca há um registro claro de como os dados foram parar ali.

**Posicionamento desta aplicação:** Assumir explicitamente que **garimpar e
organizar dados é parte nobre do projeto**, não um detalhe escondido.

---

## 3. Pergunta Científica

**Pergunta central:**

> Como construir um núcleo canônico de dados do futebol brasileiro (2003+),
> capaz de representar clubes, competições, partidas e confrontos, de forma
> extensível e auditável, servindo tanto a humanos (exploração visual) quanto a
> máquinas (modelos de IA)?

**Subperguntas:**

- Como representar **identidades de clubes ao longo do tempo** (nome, escudo,
  fusões) mantendo um ID canônico único?
- Como permitir consultas eficientes de **head-to-head**:

  - A x B em todas as competições,
  - A x B só em Brasileirão,
  - A x B em recorte temporal (ex: 2010–2019),
  - com filtros de casa/fora/mata-mata?

- Como desenhar desde cedo uma estrutura de dados que suporte:

  - uso operacional (API, frontend),
  - uso analítico (features pra modelos de IA),
  - **sem precisar reescrever tudo** no meio do caminho?

---

## 4. Universo de Dados (Escopo, Perguntas e Fronteiras)

**Recorte temporal inicial:**

- 2003 em diante, para todas as competições que entrarem na base.

**Competições incluídas inicialmente:**

- Campeonato Brasileiro Série A (pontos corridos – foco principal).
- Campeonato Brasileiro Série B.
- Copa do Brasil.

**Em aberto / planejadas para futuro:**

- Série C e D.
- Libertadores e Sul-Americana (competição continental, cruzando com clubes
  brasileiros).

**Eixos de perguntas que o sistema deve responder bem:**

- **Por temporada:**

  - Como terminou a tabela final?
  - Como estava a tabela em uma rodada intermediária?
  - Quem subiu, quem caiu, quem classificou pra o quê?

- **Por clube:**

  - Histórico do clube em cada competição (por ano).
  - Desempenho em casa/fora.
  - Retrospecto recente (últimos N jogos).

- **Por confronto direto (head-to-head):**

  - Retrospecto geral de A vs B.
  - Corte por competição (ex: só Brasileirão).
  - Corte por período (ex: “era pontos corridos”).

- **Por partida:**

  - Detalhes do jogo (data, estádio, mandante, visitante, placar).
  - Em que contexto foi (rodada X do Brasileirão, oitavas da Copa do Brasil,
    etc.).

Essas perguntas funcionam como **critério de projeto**: se a modelagem não
permitir isso de forma razoável, algo está errado.

---

## 5. Hipótese de Solução (Arquitetura Conceitual)

**Camada 1 — Núcleo Canônico de Dados**:

- `Clube`:

  - ID canônico,
  - nome atual (para exibição padrão),
  - cidade, estado, metadados.

- `ClubeAlias`:

  - nome histórico,
  - período de validade (de/até),
  - tipo de mudança (renome, fusão, etc.),
  - opcionalmente escudo/logotipo.

- `Competicao`:

  - tipo (liga, copa),
  - nível (nacional, continental),
  - metadados (organizador, formato textual).

- `Temporada`:

  - combinação de competição + ano,
  - configuração específica (nº de rodadas, formato final, regras).

- `Fase`, `Rodada`, `Partida`:

  - abstrações para acomodar liga e copa:

    - liga → foco em rodadas;
    - copa → foco em fases/mata-mata.

- **ConfrontoDireto** (visão materializada ou consulta derivada):

  - chave (Clube A, Clube B),
  - agregados por competição/período,
  - contadores de vit/emp/der, gols pró/contra, etc.

**Camada 2 — API & Aplicações**:

- API pensada como “porta de entrada única”:

  - recursos para clubes, competições, temporadas, partidas, confrontos.
  - rotas específicas para perguntas comuns (tabela, retrospectos).

- Frontend:

  - dashboards simples e limpos:

    - tabela por temporada,
    - visão por clube,
    - visão de confronto A x B.

**Camada 3 — IA Lab (Futuro)**:

- Camada analítica separada:

  - export de dados em formato amigável (CSV, Parquet, etc.).
  - scripts / notebooks para feature engineering:

    - forma recente,
    - histórico A x B,
    - posição atual vs posição final,
    - etc.

- Não mexer no modelo de domínio pra “agradar” o modelo de IA; a IA se adapta ao
  domínio, não o contrário.

---

## 6. Critérios de Verdade, Qualidade e Confiança

- **Canonicidade de clube:** Um clube sempre é identificado por um ID estável;
  nomes e escudos podem mudar, mas o ID não.
- **Reprodutibilidade:**

  - Sempre possível reexecutar o processo que gerou um conjunto de dados.
  - Scripts de import não são mágicos; são versionados.

- **Idempotência de importação:**

  - Rodar um import duas vezes não deve “duplicar” partidas.

- **Auditabilidade:**

  - Cada partida e cada temporada carrega metadados de origem (fonte, data de
    coleta).

- **Performance razoável:**

  - Consultas típicas (tabela, histórico de um time, confronto A x B) retornam
    em tempo aceitável com índices bem pensados.

---

## 7. Riscos, Limites e Decisões Iniciais

**Riscos:**

- Divergência de dados entre fontes, exigindo decisões editoriais.
- Complexidade demais na modelagem de copas pode atrasar o MVP.
- Vontade de “abraçar todas as competições” cedo demais e perder foco em
  qualidade.

**Limites conscientes da primeira fase:**

- Foco: Série A + Série B + Copa do Brasil, 2003+.
- Sem dados de jogadores num primeiro momento; apenas clubes e partidas.
- IA fica para depois que:

  - a base estiver consistente,
  - e as perguntas “humanas” estiverem bem respondidas.

---

## 8. Horizonte de IA (Visão de Longo Prazo)

- **Curto/médio prazo:**

  - gerar datasets limpos para:

    - previsões de jogos,
    - probabilidade de rebaixamento/classificação,
    - análise de consistência de desempenho.

- **Longo prazo:**

  - experimentar modelos que considerem:

    - histórico de confrontos diretos,
    - forma recente,
    - contexto da competição,
    - possíveis features derivadas de calendário (sequência de jogos difíceis,
      etc.).

- Filosofia:

  > “A IA é uma camada de leitura da história que a base de dados conta; se a
  > história estiver mal contada, o modelo vai delirar.”

---

## 9. Estratégia de Alimentação de Dados (Garimpo)

**Princípio:** Teu prazer em “escavar dados” vira parte oficial da arquitetura,
não um hobby paralelo.

**Camada RAW vs Normalizada:**

- **RAW (bruta):**

  - dados exatamente como vieram da fonte (CSV, HTML, API externa),
  - armazenados em formato de dump, com log de origem.

- **Normalizada:**

  - dados transformados para o modelo canônico (Clube, Partida, etc.).
  - sem duplicações, referenciando IDs canônicos.

**Fluxo inicial (manual & feliz):**

1. Escolher uma fonte “oficial/estável” por competição.
2. Criar scripts simples de import:

   - ler dados brutos,
   - mapear clubes para IDs canônicos,
   - registrar conflitos/erros em log.

3. Registrar num **“Diário de Garimpo”** (pode ser um doc ou tabela):

   - qual fonte foi usada,
   - quais ajustes manuais foram feitos,
   - decisões editoriais (ex: como tratar renome de clube).

No começo, não há problema nenhum em **apertar botões manualmente**; o objetivo
é entender o terreno. Automação vem depois, quando os caminhos ficam claros.

---

## 10. Princípios de Evolução do Projeto

- **Canônico primeiro, features depois:**

  - Não sacrificar consistência de dados por uma tela nova bonitinha.

- **Um passo por camada:**

  - quando mexer na modelagem de dados, entender impacto em API e IA.

- **Documentar decisões “estranhas”:**

  - renomes de clubes,
  - divergência de fontes,
  - ajustes de partidas.

- **Escopo progressivo:**

  - só adicionar novas competições (Série C, Libertadores, etc.) quando:

    - a modelagem estiver madura,
    - o fluxo de import estiver confortável.

---
