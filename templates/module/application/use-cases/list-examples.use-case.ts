import type { ExampleGateway } from '../../domain/gateways/example.gateway'
import type { ListExamplesReturnType } from '../../domain/gateways/return-types/example-return-type'

export class ListExamplesUseCase {
  constructor(private readonly gateway: ExampleGateway) {}

  async execute(): Promise<ListExamplesReturnType> {
    return this.gateway.list()
  }
}
