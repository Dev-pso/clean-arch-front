import { HttpError, httpClient } from '@/modules/@core/infra/http/http-client'
import type { CreateExampleDto } from '../../domain/dtos/create-example.dto'
import type { Example } from '../../domain/entities/example.entity'
import type { ExampleGateway } from '../../domain/gateways/example.gateway'
import type { CreateExampleReturnType, ListExamplesReturnType } from '../../domain/gateways/return-types/example-return-type'
import { exampleUrls } from '../url/example-urls'

/**
 * Impl REAL. Traduz status HTTP em erros nomeados do domain.
 * O mapeamento de erro é o que protege a presentation de detalhes de rede.
 * (O httpClient de @core injeta headers/auth — ver infra/http do alvo.)
 */
const mapError = (error: unknown): 'GENERIC_ERROR' | 'FORBIDDEN' | 'SERVICE_UNAVAILABLE' => {
  const status = error instanceof HttpError ? error.status : undefined
  if (status === 403) return 'FORBIDDEN'
  if (status === 502 || status === 503) return 'SERVICE_UNAVAILABLE'
  return 'GENERIC_ERROR'
}

export class HttpExampleGateway implements ExampleGateway {
  async list(): Promise<ListExamplesReturnType> {
    try {
      const data = await httpClient.request<Example[]>(exampleUrls.list)
      return { type: 'SUCCESS', data }
    } catch (error) {
      return { type: mapError(error) }
    }
  }

  async create(dto: CreateExampleDto): Promise<CreateExampleReturnType> {
    try {
      const data = await httpClient.request<Example>(exampleUrls.create, { method: 'POST', body: dto })
      return { type: 'SUCCESS', data }
    } catch (error) {
      if (error instanceof HttpError && error.status === 409) return { type: 'ALREADY_EXISTS' }
      if (error instanceof HttpError && (error.status === 400 || error.status === 422)) return { type: 'INVALID_INPUT' }
      return { type: mapError(error) }
    }
  }
}
