/**
 * Copie para: src/modules/@core/domain/types/app-return.type.ts
 *
 * Contrato de retorno de todo use case e gateway. União discriminada por `type`:
 * 'SUCCESS' (com data opcional) ou uma variante de erro nomeada. Ninguém lança
 * exceção pro chamador — o erro é um valor tipado que a presentation trata.
 */
export type AppReturnSuccessType = 'SUCCESS'

export type AppReturnBaseErrorType =
  | 'INVALID_INPUT'
  | 'GENERIC_ERROR'
  | 'SERVICE_UNAVAILABLE'
  | 'FORBIDDEN'
  | 'UNAUTHORIZED'

export type AppReturnError<TType extends string = string, TData = undefined> = TData extends undefined
  ? { type: TType }
  : { type: TType; data: TData }

export type AppReturn<TData = undefined, TError extends AppReturnError = AppReturnError> =
  TData extends undefined
    ? { type: AppReturnSuccessType } | TError
    : { type: AppReturnSuccessType; data: TData } | TError
