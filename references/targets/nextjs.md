# Alvo: Next.js (site / sistema web)

Bootstrap de um projeto web novo. Gerenciador: **pnpm**. Roteamento: **App Router**.
Arquitetura e styling seguem o SKILL.md e as references — aqui só o específico do Next.

## 1. Criar o projeto

```bash
pnpm create next-app@latest <nome> --ts --app --src-dir --import-alias "@/*"
cd <nome>
```

`--app` (App Router), `--src-dir` (mantém tudo em `src/`, casa com a árvore do
skill), `--import-alias "@/*"` (alias que os templates usam). **Sem tailwind** —
recuse a opção de Tailwind no prompt do create-next-app.

## 2. Unistyles no web via react-native-web

O mesmo `.css.ts` do app roda no web porque o Unistyles suporta react-native-web.
Isso é o que dá theme e estilos compartilhados de verdade, sem reescrever.

```bash
pnpm add react-native-web react-native-unistyles
pnpm add -D @types/react-native
```

Configure o `next.config.ts` para transpilar os pacotes RN e apontar
`react-native` → `react-native-web`:

```ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  transpilePackages: ['react-native', 'react-native-web', 'react-native-unistyles'],
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      'react-native$': 'react-native-web',
    }
    return config
  },
}

export default nextConfig
```

Crie `src/unistyles.ts` registrando o theme (igual ao do Expo) e importe-o num
client boundary no topo da árvore (um componente `'use client'` em `app/layout.tsx`
ou um provider), porque o Unistyles roda no cliente.

```ts
// src/unistyles.ts
import { StyleSheet } from 'react-native-unistyles'
import { appTheme } from '@/modules/@core/presentation/tokens/theme'

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 } as const

declare module 'react-native-unistyles' {
  export interface UnistylesThemes { light: typeof appTheme }
  export interface UnistylesBreakpoints extends typeof breakpoints {}
}

StyleSheet.configure({ themes: { light: appTheme }, breakpoints, settings: { initialTheme: 'light' } })
```

## 3. SSR e "use client"

Componentes que usam Unistyles/estado/efeitos precisam de `'use client'`. Mantenha
as screens de feature como client components; use Server Components para data
fetching de borda quando fizer sentido, mas a camada `infra` (gateways) é a fonte
de dados canônica do skill — não fure a arquitetura buscando direto no server
component. Páginas em `app/` são finas: importam a screen do módulo.

## 4. Primitivos web e SEO

Aqui está a razão de o web **não** ser um clone cego do app: sites Villela
precisam de HTML semântico e SSR para SEO e performance. Então:

- Componentes `@core` no web renderizam **HTML semântico** por baixo
  (`<button>`, `<input>`, `<nav>`, `<main>`, headings), mantendo a **mesma API**
  do componente do app.
- Primitivos de layout (`View`→`div`, `Text`→`span/p`) vêm de react-native-web ou
  de componentes `@core` web — o `.css.ts` não muda.
- Ícones: `lucide-react`.

A screen continua compondo só de `@core` + `styles.*`; a diferença mora dentro de
`@core`, não na screen.

## 5. Estrutura de `app/`

```text
src/
  app/                 # Next App Router: layout.tsx, page.tsx, rotas
  modules/             # igual ao skill (feature + @core)
  unistyles.ts
```

`app/<rota>/page.tsx` importa e renderiza a `*.screen.tsx` do módulo.

## Checklist de bootstrap

- [ ] create-next-app com App Router, src-dir, alias `@/*`, **sem tailwind**
- [ ] react-native-web + Unistyles; `transpilePackages` e alias `react-native$`
- [ ] `src/unistyles.ts` registra `appTheme`, importado num `'use client'` no topo
- [ ] Componentes `@core` web = HTML semântico com a mesma API do app
- [ ] `theme.ts` copiado do template
