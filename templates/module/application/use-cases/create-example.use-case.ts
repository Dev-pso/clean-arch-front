import { createExampleDtoSchema, type CreateExampleDto } from '../../domain/dtos/create-example.dto'
import type { ExampleGateway } from '../../domain/gateways/example.gateway'
import type { CreateExampleReturnType } from '../../domain/gateways/return-types/example-return-type'

/**
 * Use case: valida o input com o schema e delega ao gateway.
 * Nunca toca em HTTP nem React. Retorna AppReturn — não lança.
 */
export class CreateExampleUseCase {
  constructor(private readonly gateway: ExampleGateway) {}

  async execute(input: CreateExampleDto): Promise<CreateExampleReturnType> {
    const parsed = createExampleDtoSchema.safeParse(input)
    if (!parsed.success) {
      return { type: 'INVALID_INPUT' }
    }
    return this.gateway.create(parsed.data)
  }
}
