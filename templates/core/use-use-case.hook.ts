/**
 * Copie para: src/modules/@core/presentation/hooks/use-use-case.hook.ts
 *
 * Consome um use case que retorna AppReturn e expõe { execute, isLoading } +
 * callbacks por tipo de erro. É o único ponto onde a presentation lê o `type`
 * do retorno — as screens só passam callbacks.
 */
import { useCallback, useRef, useState } from 'react'
import type { AppReturn, AppReturnError } from '@/modules/@core/domain/types/app-return.type'

type UseCaseLike<TInput, TResult extends AppReturn> = {
  execute: (input: TInput) => Promise<TResult>
}

type UseUseCaseOptions<TResult extends AppReturn> = {
  onSuccess?: (data: Extract<TResult, { type: 'SUCCESS' }> extends { data: infer D } ? D : undefined) => void
  onInvalidInput?: () => void
  onGenericError?: () => void
  onServiceUnavailable?: () => void
  onForbidden?: () => void
  onUnauthorized?: () => void
  onError?: (error: Extract<TResult, AppReturnError>, type: string) => void
}

export const useUseCase = <TInput, TResult extends AppReturn>(
  useCase: UseCaseLike<TInput, TResult>,
  options: UseUseCaseOptions<TResult> = {},
) => {
  const [isLoading, setIsLoading] = useState(false)
  const optionsRef = useRef(options)
  optionsRef.current = options

  const execute = useCallback(
    async (input: TInput): Promise<TResult> => {
      setIsLoading(true)
      try {
        const result = await useCase.execute(input)
        const opts = optionsRef.current

        if (result.type === 'SUCCESS') {
          const success = result as Extract<TResult, { type: 'SUCCESS' }>
          if ('data' in success) {
            opts.onSuccess?.(success.data as never)
          } else {
            opts.onSuccess?.(undefined as never)
          }
          return result
        }

        if (result.type === 'INVALID_INPUT') opts.onInvalidInput?.()
        else if (result.type === 'GENERIC_ERROR') opts.onGenericError?.()
        else if (result.type === 'SERVICE_UNAVAILABLE') opts.onServiceUnavailable?.()
        else if (result.type === 'FORBIDDEN') opts.onForbidden?.()
        else if (result.type === 'UNAUTHORIZED') opts.onUnauthorized?.()

        opts.onError?.(result as Extract<TResult, AppReturnError>, result.type)
        return result
      } finally {
        setIsLoading(false)
      }
    },
    [useCase],
  )

  return { execute, isLoading }
}
