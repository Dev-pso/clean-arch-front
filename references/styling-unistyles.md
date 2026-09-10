# Styling — Unistyles + par `.css.ts`

Sem tailwind, sem className, sem estilo inline solto. Todo estilo vive num arquivo
`.css.ts` pareado, usando [react-native-unistyles](https://www.unistyl.es/). O
mesmo arquivo roda no Expo e no Next (via react-native-web), consumindo o mesmo
`theme.ts`.

## A regra do par

Para cada `x.screen.tsx` existe um `x.css.ts`. Para cada `y.component.tsx` com
estilo próprio, um `y.css.ts`. Mesmo nome-base, mesma pasta. A screen/componente
importa os estilos de lá e só referencia `styles.algo` no JSX.

Por quê: separar estrutura (tsx) de estilo (css.ts) deixa a screen legível, os
estilos reutilizáveis e o diff do dev limpo. É o que faz a tela "parecer Villela".

## Como escrever um `.css.ts`

```ts
// example.css.ts
import { StyleSheet } from 'react-native-unistyles'

export const styles = StyleSheet.create((theme) => ({
  container: {
    flex: 1,
    backgroundColor: theme.colors.gray50,
    padding: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.semibold,
    color: theme.colors.gray900,
  },
  card: {
    backgroundColor: theme.colors.baseWhite,
    borderRadius: theme.radii.lg,
    borderWidth: theme.borderWidths.hairline,
    borderColor: theme.colors.gray200,
    padding: theme.spacing.md,
    ...theme.shadows.sm, // sombra semântica, resolvida por plataforma
  },
}))
```

Nada de valor cru: `padding: 16` vira `theme.spacing.md`; `#fff` vira
`theme.colors.baseWhite`; sombra vira `theme.shadows.sm`. Se falta um token,
adicione ao theme — não hardcode na screen.

## Como consumir no `.screen.tsx`

```tsx
// example.screen.tsx
import { View, Text } from 'react-native'           // Expo; no Next ver nota abaixo
import { Button } from '@/modules/@core/presentation/components/components'
import { styles } from './example.css' // arquivo example.css.ts

export const ExampleScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>Exemplo</Text>
    <View style={styles.card}>
      <Button onPress={() => {}}>Ação</Button>
    </View>
  </View>
)
```

- **Expo:** primitivos `View`/`Text`/`Pressable` de `react-native`.
- **Next:** a screen ainda compõe de `@core`; primitivos de layout vêm de
  componentes `@core` (ex.: um `Box`/`Stack` web) ou de `react-native-web`
  conforme o bootstrap do alvo escolher. O `.css.ts` é idêntico — é o ganho do
  Unistyles. Detalhes no `references/targets/nextjs.md`.

A regra firme, igual nos dois: **a screen só vê `styles.*` e componentes `@core`**.
Nenhum literal de estilo no meio do JSX.

## Variants e responsivo

Precisa variar por estado ou breakpoint? Use os recursos do Unistyles (variants,
`breakpoints`, `UnistylesRuntime`) dentro do `.css.ts`, não `if` de estilo
espalhado no tsx. Isso mantém a decisão visual num lugar só.

## Checklist antes de entregar uma tela

- [ ] Existe o `.css.ts` pareado e a screen só referencia `styles.*`
- [ ] Zero className, zero tailwind, zero objeto de estilo inline no JSX
- [ ] Zero hex/px cru — tudo via `theme.*`
- [ ] UI composta de componentes `@core` (primitivo cru só dentro de `@core`)
- [ ] Sombra via `theme.shadows.*`, não `elevation`/`boxShadow` na mão
