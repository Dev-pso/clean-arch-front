---
name: clean-arch-front
description: >-
  Padrão canônico de frontend — Clean Architecture em camadas + Unistyles +
  theme tokenizado, para iniciar e estruturar projetos novos. Use SEMPRE que for
  começar um app ou site do zero, criar um módulo/feature novo, montar uma tela,
  um componente, um gateway ou um use case num projeto que segue este padrão,
  mesmo quando o usuário não citar "clean arch" — qualquer pedido de "cria o
  projeto", "estrutura o front", "monta a tela X", "adiciona a feature Y" num
  frontend React (Expo/React Native ou Next.js) deve passar por aqui. Escolhe o
  alvo (expo para app, nextjs para web/site), aplica a árvore de pastas, o naming
  por sufixo, o fluxo domain→application→infra→presentation e o styling sem
  tailwind (Unistyles em arquivos .css.ts pareados com a screen).
---

# Clean Arch Front

Este skill faz a IA **estruturar frontend nesse padrão**: mesma arquitetura,
mesmo naming, mesmo theme e mesmo padrão de estilo que o time de desenvolvimento
usa. O objetivo prático é **handoff suave** — um projeto iniciado pelo SEO (ou por
qualquer um) já nasce no formato que o dev só precisa continuar, não refazer.

Dois alvos, **um núcleo de arquitetura idêntico**:

| Alvo      | Quando                    | Runtime                |
|-----------|---------------------------|------------------------|
| `expo`    | app mobile                | Expo / React Native    |
| `nextjs`  | site ou sistema web       | Next.js (App Router)   |

O que muda entre alvos é **só a camada de `presentation`** (primitivos RN vs
componentes web) e o **bootstrap**. Tudo abaixo de `presentation`
(`domain`, `application`, `infra`) é TypeScript puro e **igual nos dois**.

## Primeiro passo: descobrir o alvo

Antes de escrever qualquer arquivo, confirme o alvo com o usuário se ele não disse:

> "Esse projeto é **app** (Expo/React Native) ou **site/sistema web** (Next.js)?"

App → leia `references/targets/expo.md`.
Web → leia `references/targets/nextjs.md`.

Esses arquivos trazem o bootstrap específico (deps via **pnpm**, config do
Unistyles, entry/provider). O resto deste skill vale para os dois.

## As regras que não se quebram

Estas são as decisões que tornam o código reconhecível como parte deste padrão. Seguir
todas é o que garante o handoff. Cada uma tem um porquê — respeite o porquê, não
só a letra.

1. **Arquitetura em 4 camadas por feature.** Cada feature vive em
   `src/modules/<feature>/` com `domain`, `application`, `infra`, `presentation`.
   Código compartilhado mora em `src/modules/@core/`. Detalhes e a árvore completa
   em `references/architecture.md` — **leia antes de criar um módulo**.

2. **Regra de dependência:** `presentation → application → domain ← infra`.
   O `domain` não importa ninguém de fora dele. `application` orquestra casos de
   uso e valida input com Zod. `infra` implementa as interfaces do `domain`
   (gateways HTTP). `presentation` só fala com `application` via hooks. Isso é o
   que deixa a lógica testável e o back trocável sem tocar na UI.

3. **Naming por sufixo** (a IA e o dev acham qualquer arquivo pelo nome):

   | Artefato        | Sufixo                                             |
   |-----------------|----------------------------------------------------|
   | Tela            | `*.screen.tsx`                                     |
   | Estilo da tela  | `*.css.ts` (pareado, mesmo nome da screen)         |
   | Componente      | `*.component.tsx`                                  |
   | Hook            | `use-*.hook.ts`                                     |
   | Store (zustand) | `*.store.ts`                                        |
   | Use case        | `*.use-case.ts`                                     |
   | Gateway         | `*.gateway.ts` / `http-*.gateway.ts` / `mock-*.gateway.ts` |
   | Entity          | `*.entity.ts`                                       |
   | DTO / schema    | `*.dto.ts`                                          |

4. **Styling só com Unistyles, nunca tailwind.** Cada screen e cada componente
   com estilo tem um arquivo **`.css.ts` pareado** (mesmo nome-base). A screen
   importa os estilos de lá; **nada de className, nada de estilo inline solto**,
   nada de objeto de estilo no meio do JSX. Veja `references/styling-unistyles.md`.

5. **Compõe a partir de `@core`, cria sob demanda.** A UI se monta com
   componentes de `@core/presentation/components` (Button, Input, Label, etc.).
   Esses componentes ainda não existem num projeto novo — **crie-os conforme a
   necessidade** seguindo o contrato em `references/architecture.md` (pasta
   própria + `.css.ts` + export no barrel `components.ts`). Não semeie um kit
   gigante de uma vez; crie o que a tela atual precisa. Screens nunca usam
   primitivo cru (`View`/`div`) espalhado — isso vira componente `@core`.

6. **Theme tokenizado, trocável pelo `brand*`.** Cores, espaçamento, tipografia,
   raios e sombras vivem num único `theme.ts` consumido pelo Unistyles. Trocar a
   identidade visual de um projeto = mexer só na escala `brand*`. Sombras são
   **semânticas** (`shadow.md`) com mapa por plataforma, porque RN e web expressam
   sombra de formas diferentes. Veja `references/theme.md`.

7. **Gateway começa mock, vira HTTP no handoff.** Num protótipo (o caso do SEO),
   a `infra` pode implementar `mock-*.gateway.ts` com dados em memória, e a factory
   `create-*-gateway.ts` aponta pro mock. Quando o dev assume, ele troca a factory
   pro `http-*.gateway.ts` sem tocar em `domain`, `application` ou `presentation`.
   Essa é a costura do handoff — mantenha a interface do gateway estável.

8. **pnpm sempre.** Gerenciador de pacote é `pnpm` nos dois alvos (mesmo ambiente
   do time). No Expo exige `.npmrc` com `node-linker=hoisted` — ver target.

## Fluxo para criar uma feature nova

Siga nesta ordem — é a ordem da regra de dependência, e evita retrabalho:

1. **Domain** — `entity`, `gateway` (interface), `return-types` (com `AppReturn`),
   `dto` com schema Zod.
2. **Application** — `use-case` que valida o input com o schema e delega ao gateway.
3. **Infra** — `mock-*.gateway.ts` (protótipo) e/ou `http-*.gateway.ts`, `url`,
   e a factory `create-*-gateway.ts`.
4. **Presentation** — hook (`use-*.hook.ts` usando `useUseCase`) → `*.component.tsx`
   → `*.screen.tsx` + `*.css.ts` → barrel `components.ts` → registrar a rota.

Os templates em `templates/module/` são um esqueleto **completo e funcional**
dessa sequência — copie e renomeie em vez de escrever do zero. O `templates/theme/`
tem o theme base, e `templates/core/` um componente `@core` canônico de referência.

## Quando este skill se aplica

- Iniciar um projeto frontend do zero (app ou web)
- Adicionar um módulo/feature a um projeto que já segue este padrão
- Criar uma screen, componente `@core`, hook, use case ou gateway
- Revisar se um código está no padrão antes do handoff pro dev

Se o projeto **não** é React/React Native, ou o usuário pediu explicitamente outra
arquitetura, este skill não se aplica — diga isso em vez de forçar.

## Mapa dos arquivos de referência

| Preciso de…                                  | Leia                                  |
|----------------------------------------------|---------------------------------------|
| Árvore de pastas, camadas, contrato de `@core` | `references/architecture.md`         |
| Como usar Unistyles, par `.css.ts`, exemplos | `references/styling-unistyles.md`     |
| Estrutura do theme, tokens, sombras por plataforma | `references/theme.md`           |
| Bootstrap do app (Expo)                      | `references/targets/expo.md`          |
| Bootstrap do site (Next.js)                  | `references/targets/nextjs.md`        |
