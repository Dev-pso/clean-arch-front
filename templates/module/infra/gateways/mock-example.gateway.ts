import type { CreateExampleDto } from '../../domain/dtos/create-example.dto'
import type { Example } from '../../domain/entities/example.entity'
import type { ExampleGateway } from '../../domain/gateways/example.gateway'
import type { CreateExampleReturnType, ListExamplesReturnType } from '../../domain/gateways/return-types/example-return-type'

/**
 * Impl de PROTÓTIPO — dados em memória, sem backend. Use na validação inicial.
 * No handoff, o dev troca a factory create-example-gateway.ts para o http gateway;
 * este arquivo pode ficar para testes/dev offline.
 */
const wait = () => new Promise((resolve) => setTimeout(resolve, 180))

let examples: Example[] = [
  { id: 'exemplo-1', name: 'Primeiro exemplo', isActive: true, createdAt: new Date().toISOString() },
  { id: 'exemplo-2', name: 'Segundo exemplo', isActive: false, createdAt: new Date().toISOString() },
]

export class MockExampleGateway implements ExampleGateway {
  async list(): Promise<ListExamplesReturnType> {
    await wait()
    return { type: 'SUCCESS', data: examples }
  }

  async create(dto: CreateExampleDto): Promise<CreateExampleReturnType> {
    await wait()
    if (examples.some((item) => item.name.toLowerCase() === dto.name.toLowerCase())) {
      return { type: 'ALREADY_EXISTS' }
    }
    const example: Example = {
      id: crypto.randomUUID(),
      name: dto.name,
      isActive: true,
      createdAt: new Date().toISOString(),
    }
    examples = [example, ...examples]
    return { type: 'SUCCESS', data: example }
  }
}
