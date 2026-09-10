import type { AppReturn, AppReturnError } from '@/modules/@core/domain/types/app-return.type'
import type { Example } from '../../entities/example.entity'

/** Cada operação do gateway declara seu sucesso + erros possíveis (nomeados). */
export type ListExamplesReturnType = AppReturn<
  Example[],
  AppReturnError<'GENERIC_ERROR' | 'FORBIDDEN' | 'SERVICE_UNAVAILABLE'>
>

export type CreateExampleReturnType = AppReturn<
  Example,
  AppReturnError<'INVALID_INPUT' | 'ALREADY_EXISTS' | 'GENERIC_ERROR' | 'FORBIDDEN' | 'SERVICE_UNAVAILABLE'>
>
