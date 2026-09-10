# Theme — tokens Villela

Um único `theme.ts` (em `@core/presentation/tokens/`) é a fonte de verdade de
cor, espaçamento, tipografia, raio e sombra. O Unistyles recebe esse objeto e o
injeta em todo `.css.ts` via `theme =>`. Trocar a identidade de um projeto deve ser
**mexer só na escala `brand*`** — o resto do app referencia tokens, nunca hex cru.

O arquivo pronto está em `templates/theme/theme.ts`. Este doc explica a estrutura
e as duas decisões que costumam gerar dúvida: sombras e plataforma.

## Estrutura

```ts
export const appTheme = {
  colors: {
    // base / gray / brand / error / warning / success / blue + tokens de produto
  },
  spacing,     // escala 4/8: xs, sm, md, lg, xl, xxl…
  radii,       // sm, md, lg, pill, full
  typography,  // fontFamily, fontSize, fontWeight, lineHeight, letterSpacing
  borderWidths,
  opacities,
  zIndex,      // base, dropdown, sticky, modal, toast
  iconSizes,
  timings,     // durations + easing para animação
  shadows,     // SEMÂNTICAS — ver abaixo
}
```

Cores seguem a paleta em escalas de 25→950. As famílias `error/warning/success/blue`
são de estado e **não mudam** entre projetos; `gray` é neutro; **`brand*` é o que se
troca** por projeto. Mantenha também os tokens de produto que o app precisar
(ex.: `pillarProcessos`, `pillarDebt`) agrupados e comentados.

## Sombras: semânticas, não cruas

RN e web expressam sombra de formas diferentes:

- **RN** usa `elevation` (Android) + `shadowColor/shadowOffset/shadowOpacity/shadowRadius` (iOS).
- **web** usa uma string `boxShadow`.

Se você guardar o formato cru de uma plataforma no theme, ele não serve na outra.
Então o theme guarda **tokens semânticos** (`xs, sm, md, lg, xl, xxl, xxxl`) com os
valores primitivos, e o Unistyles resolve por plataforma. Com Unistyles isso é
quase automático: defina os valores RN no theme e, no web, o Unistyles converte
`shadowOffset/shadowRadius/shadowColor` para `boxShadow`. Quando precisar de
controle fino no web, exponha um helper `boxShadow(token)` no próprio theme.

Regra prática: **no `.css.ts`, refira `theme.shadows.md`**, nunca escreva
`elevation` ou `boxShadow` na mão numa screen.

## Plataforma dentro do theme

O Unistyles dá `UnistylesRuntime` e breakpoints. Use o theme para tokens; use os
recursos do Unistyles (variants, breakpoints, `rt`) para variação por tamanho de
tela. Não crie dois themes (um web, um app) — é **um theme, dois consumidores**.

## Trocar a identidade de um projeto

1. Abra `theme.ts`.
2. Substitua a escala `brand25 … brand900` pelas cores do novo projeto.
3. Pronto — botões, links, destaques e estados de marca seguem, porque todos
   referenciam `theme.colors.brand*`. Se algum componente hardcodou um hex, é bug:
   troque por token.
