# clean-arch-front

Skill do Claude Code que faz a IA estruturar frontend no padrão:
Clean Architecture em camadas + Unistyles + theme tokenizado, sem tailwind.
Dois alvos — **Expo** (app) e **Next.js / App Router** (web) — com o mesmo núcleo
de arquitetura, divergindo só na camada de apresentação.

Objetivo: um projeto iniciado por qualquer pessoa (ex.: validação pelo SEO) já
nasce no formato que o time de desenvolvimento só precisa continuar — **handoff suave**.

## Instalar

A skill é uma pasta com `SKILL.md`. Coloque-a em `~/.claude/skills/`:

```bash
git clone <url-deste-repo> ~/.claude/skills/clean-arch-front
```

Ou copie a pasta manualmente para `~/.claude/skills/clean-arch-front/`.

Abra o Claude Code e a skill fica disponível:
- **Automático** — o Claude a consulta sozinho quando o contexto bate (iniciar
  projeto, criar feature/tela/gateway num front React/React Native).
- **Manual** — digite `/clean-arch-front` no chat.

## Conteúdo

```text
SKILL.md                      # regras + fluxo + mapa (o cérebro)
references/
  architecture.md             # árvore, camadas, contrato @core
  styling-unistyles.md        # par .css.ts, como usar Unistyles
  theme.md                    # tokens, sombras por plataforma
  targets/expo.md             # bootstrap app (pnpm, Unistyles, Metro)
  targets/nextjs.md           # bootstrap web (App Router, react-native-web)
templates/
  theme/theme.ts              # theme base (troca identidade pelo brand*)
  core/                       # AppReturn, useUseCase, Button canônico
  module/                     # esqueleto completo de uma feature
```

## Como a IA usa

1. Descobre o alvo (`expo` ou `nextjs`) e lê o `references/targets/` certo.
2. Segue as regras do `SKILL.md` (camadas, naming, styling, theme).
3. Copia/renomeia os `templates/` em vez de escrever do zero.
4. Começa com `mock-*.gateway.ts`; no handoff o dev troca a factory pro `http-*`.

## Stack

Expo/React Native ou Next.js · TypeScript · Unistyles (sem tailwind) · Zod ·
zustand · pnpm.
