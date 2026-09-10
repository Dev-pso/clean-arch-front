# Arquitetura — Clean Arch Villela

Leia antes de criar um módulo. A árvore e a regra de dependência aqui valem
**igual** para `expo` e `nextjs` — só `presentation` muda de primitivos.

## Árvore de pastas

```text
src/
  app/                      # roteamento + shell (específico do alvo)
  modules/
    @core/                  # compartilhado entre features
      domain/
        types/              # AppReturn, tipos base
        entities/           # PagedResult, etc.
        dtos/               # PagedQuery, etc.
      infra/
        http/               # http-client, env
      presentation/
        components/         # Button, Input, Label… + barrel components.ts
        hooks/              # use-use-case.hook.ts
        stores/             # helpers de store
        tokens/             # theme.ts (ver references/theme.md)
        utils/
    <feature>/              # ex.: clients, companies, processes
      domain/
        entities/           # <nome>.entity.ts
        dtos/               # <nome>.dto.ts  (schema Zod + tipo inferido)
        gateways/
          <feature>.gateway.ts          # INTERFACE (contrato)
          return-types/
            <feature>-return-type.ts    # AppReturn<...> por operação
      application/
        use-cases/          # <acao>-<feature>.use-case.ts
      infra/
        url/                # <feature>-urls.ts
        gateways/
          create-<feature>-gateway.ts   # factory → escolhe impl
          http-<feature>.gateway.ts     # impl real
          mock-<feature>.gateway.ts     # impl protótipo (memória)
        mappers/            # api.dto → entity
        dtos/               # formato cru da API
      presentation/
        hooks/              # use-<algo>.hook.ts
        screens/
          <screen>/
            <screen>.screen.tsx
            <screen>.css.ts             # estilos pareados (Unistyles)
            components.ts               # barrel dos componentes da screen
            components/<comp>/<comp>.component.tsx + <comp>.css.ts
        stores/             # <feature>.store.ts (zustand), se precisar
        utils/
```

## Regra de dependência

```text
presentation  →  application  →  domain  ←  infra
```

- **domain** não importa de `application`, `infra` nem `presentation`. Só tipos
  próprios e de `@core/domain`. É o centro estável.
- **application** importa de `domain`. Orquestra e valida (Zod). Não conhece HTTP
  nem React.
- **infra** importa de `domain` (implementa as interfaces). Conhece HTTP, URLs,
  formato da API. Não conhece React.
- **presentation** importa de `application` (via hooks) e de `@core`. Nunca
  instancia gateway HTTP direto — usa a factory `create-*-gateway.ts`.

Por que isso importa: a regra deixa o `domain`/`application` testáveis sem browser
e permite trocar o gateway mock pelo HTTP (o handoff) sem tocar na UI.

## O contrato `AppReturn`

Use cases e gateways nunca lançam exceção pro chamador — retornam um `AppReturn`,
uma união discriminada por `type`. `'SUCCESS'` carrega `data`; os demais são
variantes de erro nomeadas (`'INVALID_INPUT'`, `'NOT_FOUND'`, `'LIMIT_REACHED'`…).

O hook `useUseCase` (em `@core/presentation/hooks`) consome esse retorno e expõe
`execute` + `isLoading` + callbacks por tipo de erro. Ver `templates/module`.

## Contrato de um componente `@core`

Quando criar um componente compartilhado:

1. Pasta própria: `@core/presentation/components/<nome>/`
2. Dois arquivos: `<nome>.component.tsx` + `<nome>.css.ts`
3. Props tipadas e explícitas (nada de `any`); mesma **API nos dois alvos** —
   no Expo a entranha usa primitivos RN, no Next usa elementos web, mas o nome do
   componente e as props são idênticos, pra screen parecer igual.
4. Export no barrel `@core/presentation/components/components.ts`
5. Sem regra de negócio dentro — componente é burro, recebe tudo por prop.

A screen importa **sempre do barrel**:

```ts
import { Button, Input, Label } from '@/modules/@core/presentation/components/components'
```

## Screens magras

A `*.screen.tsx` compõe layout + liga hooks a componentes. Lógica vai pro hook;
pedaços de UI viram `*.component.tsx` em `components/` da própria screen, exportados
pelo `components.ts` local. Se a screen está ficando grande com JSX, extraia
componente — é sinal de que ela está fazendo demais.
