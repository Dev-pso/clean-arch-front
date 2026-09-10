import { useCallback, useEffect, useMemo, useState } from 'react'
import { useUseCase } from '@/modules/@core/presentation/hooks/use-use-case.hook'
import { ListExamplesUseCase } from '../../application/use-cases/list-examples.use-case'
import { CreateExampleUseCase } from '../../application/use-cases/create-example.use-case'
import { createExampleGateway } from '../../infra/gateways/create-example-gateway'
import type { Example } from '../../domain/entities/example.entity'

/**
 * Hook = ponte entre presentation e application. Instancia o use case com o
 * gateway da factory, expõe estado + ações prontas pra screen. A screen não
 * conhece use case nem gateway — só chama o que o hook devolve.
 */
export const useExamples = () => {
  const gateway = useMemo(() => createExampleGateway(), [])
  const listUseCase = useMemo(() => new ListExamplesUseCase(gateway), [gateway])
  const createUseCase = useMemo(() => new CreateExampleUseCase(gateway), [gateway])

  const [items, setItems] = useState<Example[]>([])
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const list = useUseCase(listUseCase, {
    onSuccess: (data) => setItems(data),
    onError: () => setErrorMessage('Não foi possível carregar os exemplos.'),
  })

  const create = useUseCase(createUseCase, {
    onInvalidInput: () => setErrorMessage('Verifique os dados.'),
    onError: (_error, type) => {
      if (type === 'ALREADY_EXISTS') setErrorMessage('Já existe um exemplo com esse nome.')
    },
  })

  const reload = useCallback(async () => {
    setErrorMessage(null)
    await list.execute(undefined)
  }, [list])

  useEffect(() => {
    void reload()
  }, [reload])

  const addExample = useCallback(
    async (name: string) => {
      setErrorMessage(null)
      const result = await create.execute({ name })
      if (result.type === 'SUCCESS') {
        await reload()
        return true
      }
      return false
    },
    [create, reload],
  )

  return {
    items,
    errorMessage,
    isLoading: list.isLoading,
    isCreating: create.isLoading,
    reload,
    addExample,
  }
}
