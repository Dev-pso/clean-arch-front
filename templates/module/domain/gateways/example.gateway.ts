import type { CreateExampleDto } from '../dtos/create-example.dto'
import type { CreateExampleReturnType, ListExamplesReturnType } from './return-types/example-return-type'

/**
 * Interface do gateway = contrato estável entre application e infra.
 * Mock e HTTP implementam esta mesma interface. No handoff, troca-se a impl
 * (mock → http) sem mexer em application nem presentation.
 */
export interface ExampleGateway {
  list(): Promise<ListExamplesReturnType>
  create(dto: CreateExampleDto): Promise<CreateExampleReturnType>
}
