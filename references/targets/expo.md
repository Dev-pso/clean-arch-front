# Alvo: Expo (app mobile)

Bootstrap de um app novo. Gerenciador: **pnpm**. Arquitetura e styling seguem o
SKILL.md e as outras references — aqui só o que é específico do Expo.

## 1. Criar o projeto

```bash
pnpm create expo-app@latest <nome-do-app> --template blank-typescript
cd <nome-do-app>
```

## 2. pnpm + Metro: `.npmrc` obrigatório

Metro (bundler do RN) não resolve bem os symlinks do pnpm. Crie um `.npmrc` na
raiz **antes** de instalar deps:

```
node-linker=hoisted
```

Sem isso o app quebra no bundling com "módulo não encontrado". Depois:

```bash
pnpm install
```

## 3. Unistyles

```bash
pnpm add react-native-unistyles react-native-nitro-modules react-native-edge-to-edge
```

Unistyles 3 usa Nitro Modules (precisa de dev build ou Expo prebuild — não roda no
Expo Go). Configure o plugin no `app.json`/`app.config.ts` conforme a doc do
Unistyles, e rode:

```bash
pnpm expo prebuild
```

Crie um arquivo `unistyles.ts` (carregado no topo da entry, antes de qualquer
componente) que registra o theme e os breakpoints:

```ts
// src/unistyles.ts
import { StyleSheet } from 'react-native-unistyles'
import { appTheme } from '@/modules/@core/presentation/tokens/theme'

const breakpoints = { xs: 0, sm: 576, md: 768, lg: 992, xl: 1200 } as const

type AppThemes = { light: typeof appTheme }
type AppBreakpoints = typeof breakpoints

declare module 'react-native-unistyles' {
  export interface UnistylesThemes extends AppThemes {}
  export interface UnistylesBreakpoints extends AppBreakpoints {}
}

StyleSheet.configure({
  themes: { light: appTheme },
  breakpoints,
  settings: { initialTheme: 'light' },
})
```

Importe `./src/unistyles` no topo do entry (`index.ts` / `App.tsx`).

## 4. Primitivos

Screens e componentes `@core` usam primitivos de `react-native`
(`View`, `Text`, `Pressable`, `ScrollView`, `TextInput`). Ícones:
`lucide-react-native`. Nunca HTML.

## 5. Roteamento

Expo Router (file-based) em `app/`, ou React Navigation. O shell da app fica em
`src/app/`. Telas de feature continuam em `src/modules/<feature>/presentation/screens/`
e são referenciadas pelas rotas.

## 6. Alias `@/`

Configure `tsconfig.json` com `"paths": { "@/*": ["./src/*"] }` e o resolver do
Metro/Babel (`babel-plugin-module-resolver` ou o de sua preferência) para o mesmo
alias, senão os imports `@/modules/...` não resolvem.

## Checklist de bootstrap

- [ ] `.npmrc` com `node-linker=hoisted`
- [ ] Unistyles + Nitro instalados, `expo prebuild` rodado
- [ ] `src/unistyles.ts` registra `appTheme` e é importado no entry
- [ ] Alias `@/` no tsconfig e no resolver
- [ ] `src/modules/@core/presentation/tokens/theme.ts` copiado do template
