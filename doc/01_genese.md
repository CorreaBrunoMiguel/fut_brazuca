# FutBrazuca · Gênese Orion

## 1. Manifesto de Visão

fut_brazuca nasce como um **núcleo canônico de dados do futebol brasileiro**,
começando em 2003, quando o Brasileirão Série A assume o formato de pontos
corridos de forma estável. A aplicação não quer ser mais um site de tabela; quer
ser a **infraestrutura de verdade** por trás de qualquer experiência que queira
entender o futebol brasileiro com profundidade.

A visão é simples de dizer e difícil de executar:

> “Transformar o futebol brasileiro de clubes em um grafo coerente de clubes,
> competições, partidas e confrontos, acessível por API e visualizações claras.”

fut_brazuca trata:

- **Clubes** como entidades canônicas, acima de nomes de época e escudos.
- **Competições** como contextos com regras próprias (liga, copa, mata-mata).
- **Partidas** como eventos fundamentais do sistema.
- **Confrontos diretos** (head-to-head) como cidadãos de primeira classe, não só
  uma curiosidade estatística.

A longo prazo, a aplicação será:

- um **repositório histórico** confiável para humanos;
- um **repositório de features** honesto para modelos de IA.

O projeto assume que **garimpar dados é parte nobre do trabalho**: escavar,
limpar, reconciliar e versionar os dados é tão importante quanto desenhar telas
ou treinar modelos.

---

## 2. Modelo Conceitual de Domínio (Alto Nível)

### 2.1 Entidades centrais

- **Clube**

  - Identidade canônica do clube.
  - Campos: id, nome_atual, cidade, estado, metadados administrativos.
  - Usado em todas as referências (partidas, participações, confrontos).

- **ClubeAlias**

  - Representa um “rosto” histórico do clube:

    - nome de época,
    - opcionalmente escudo/logotipo,
    - período de validade (de/até),
    - tipo de mudança (renome, fusão, rebranding).

  - Liga-se sempre a um `Clube`.
  - Regra conceitual: consultas atuais usam `Clube.nome_atual`, mas a UI pode
    expor aliases em contexto histórico (ex: tooltip, nota de rodapé).

- **Competicao**

  - Ex.: Brasileirão Série A, Série B, Copa do Brasil.
  - Atributos:

    - tipo (liga, copa, mista),
    - nível (nacional, continental),
    - organizador (CBF, CONMEBOL),
    - descrição textual de formato.

- **Temporada**

  - Combinação de uma `Competicao` com um ano específico (ex: Brasileirão Série
    A 2015).
  - Carrega:

    - regras específicas (nº de rodadas, critério de desempate, nº de clubes),
    - marcadores como: tem_rebaixamento, vagas_libertadores, etc.

- **Fase**

  - Aplicável principalmente a copas (ex: 3ª fase da Copa do Brasil, oitavas,
    quartas, final).
  - Em ligas, pode ser opcional (ex: fase única de pontos corridos).

- **Rodada**

  - Para ligas de pontos corridos (Série A, Série B).
  - Campos: número, data de início/fim, vínculo à `Temporada`.

- **Partida**

  - Evento central:

    - data/hora,
    - estádio/local,
    - mandante, visitante (referindo `Clube` canônico),
    - placar,
    - referência à `Temporada`,
    - opcionalmente `Rodada` (ligas) ou `Fase` (copas),
    - metadata de origem (fonte, data de importação).

- **Classificacao (derivada)**

  - Tabela de uma `Temporada` de liga em um determinado corte (por rodada ou
    final):

    - pontos, vitórias, empates, derrotas, gols pró/contra, saldo, posição.

  - Conceitualmente derivada de `Partida` (não deve ser digitada à mão).

- **ConfrontoDireto (head-to-head)**

  - Visão conceitual do histórico entre dois clubes:

    - (clube_a, clube_b) como chave canônica (ordem irrelevante),
    - contadores de vitórias/empates/derrotas,
    - recortes por competição, por período, por contexto (casa/fora).

  - Pode ser implementado como:

    - _view_ calculada em tempo real, ou
    - tabela materializada periodicamente para acelerar consultas.

### 2.2 Perguntas que o modelo deve responder bem

- “Qual foi a tabela do Brasileirão Série A 2015 na rodada 30?”
- “Como o Clube X se saiu na Série B entre 2010 e 2020?”
- “Qual o retrospecto histórico de X vs Y em:

  - todas as competições,
  - só Brasileirão,
  - só Copa do Brasil?”

- “Qual a forma recente de um time nos últimos N jogos de uma competição?”

Se o modelo precisar de contorcionismo absurdo para responder isso, ele precisa
ser refeito.

---

## 3. Arquitetura Alvo (Visão Macro)

### 3.1 Visão em camadas

- **Camada de Dados (Data Core)**

  - Banco relacional (PostgreSQL como candidato natural):

    - relações fortes entre clubes, competições, temporadas e partidas,
    - uso pontual de JSONB quando conveniente, sem abrir mão da estrutura.

  - Tabelas divididas entre:

    - domínio principal (`clube`, `competicao`, `temporada`, `partida`, …),
    - apoio (aliases, metadados),
    - visões/materializações (tabelas, confrontos).

- **Camada de Backend / API**

  - Serviço principal (ex: Python + FastAPI, seguindo baseline Orion):

    - design orientado a domínio,
    - separação clara entre:

      - camada de domínio,
      - repositórios (acesso a dados),
      - camada de aplicação (casos de uso),
      - camada de apresentação (controllers / endpoints).

  - Estilo de API:

    - REST bem desenhado como caminho principal,
    - espaço para futuramente oferecer:

      - endpoints de export (datasets para IA),
      - talvez uma camada GraphQL ou endpoints “analíticos” mais flexíveis.

  - Exemplos conceituais de endpoints:

    - `/clubes`, `/clubes/{id}`, `/clubes/{id}/historico`
    - `/competicoes`, `/competicoes/{id}/temporadas`
    - `/temporadas/{id}/tabela`, `/temporadas/{id}/partidas`
    - `/confrontos?clube_a=...&clube_b=...&competicao=...&de=...&ate=...`

- **Camada de Frontend**

  - Aplicação web (ex: React/Next.js com TypeScript) focada em:

    - visualizações limpas de tabela por temporada,
    - tela de clube (histórico por competição),
    - tela de confronto A x B (head-to-head),
    - navegação intuitiva:

      - escolher competição → temporada → rodada/jogos/tabela,
      - escolher clubes → confronto.

  - Prioridade: clareza e consistência visual acima de animações ou enfeites.

- **Camada de Ingestão/Garimpo**

  - Scripts e pipelines para:

    - consumir dados de fontes externas (CSV, APIs, scraping),
    - fazer mapeamento de nomes de clubes → `Clube` canônico,
    - registrar conflitos.

  - Primeiramente manuais/semiautomáticos (você rodando feliz e curioso),

    - com espaço para, mais tarde, virar ETLs mais robustos.

- **Camada de IA / Analytics (futuro)**

  - Não integrada diretamente ao domínio:

    - lê os dados do núcleo via exports ou consultas específicas,
    - gera datasets reproduzíveis,
    - treina/avalia modelos sem “contaminar” o modelo de domínio.

### 3.2 Estilo de desenvolvimento

- Evolução guiada por **domínio e perguntas reais**, não por features
  aleatórias.
- Forte uso de testes em:

  - regras de domínio (cálculo de tabela, critérios de desempate),
  - consistência de import (não duplicar partidas, não criar clubes duplicados).

- Decisões arquiteturais documentadas em pontos-chave:

  - forma de calcular tabelas,
  - formato de representar fases de Copa do Brasil,
  - regras para aliases de clubes.

---

## 4. Ética, Privacidade e Uso Responsável

Mesmo lidando com um domínio “leve” (futebol), fut_brazuca ainda precisa de
alguns princípios éticos:

- **Transparência de origem:**

  - indicar claramente as fontes dos dados (sites, APIs, arquivos),
  - registrar quando um dado é corrigido manualmente e por quê.

- **Uso responsável de IA (futuro):**

  - deixar explícito que qualquer previsão é **probabilística**, não certeza,
  - explicar, quando possível, em linguagem acessível o que o modelo está
    usando:

    - forma recente, histórico de confrontos, desempenho em casa/fora, etc.

  - evitar comunicação enganosa do tipo “a IA garante que X vai ganhar”.

- **Respeito a direitos autorais e termos de uso de fontes:**

  - cuidado ao consumir dados de terceiros,
  - preferir fontes oficiais ou com permissão explícita para uso.

- **Neutralidade e auditabilidade:**

  - o sistema não favorece clube nenhum; a lógica de domínio é a mesma para
    todos,
  - qualquer usuário avançado deve ser capaz de:

    - entender de onde veio uma informação,
    - reproduzir uma estatística a partir das partidas.

- **Proteção de dados pessoais:**

  - por design, fut_brazuca não precisa armazenar dados sensíveis de pessoas
    físicas.
  - em caso de usuários/ofertas futuras, seguir boas práticas (LGPD, etc.), mas
    isso é um horizonte separado do núcleo atual.

---
