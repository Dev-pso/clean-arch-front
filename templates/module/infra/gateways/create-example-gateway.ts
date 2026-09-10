import type { ExampleGateway } from '../../domain/gateways/example.gateway'
import { HttpExampleGateway } from './http-example.gateway'
import { MockExampleGateway } from './mock-example.gateway'

/**
 * Factory: o ÚNICO lugar que decide qual impl a app usa.
 * A presentation chama createExampleGateway() e não sabe se é mock ou http.
 *
 * Protótipo (SEO): retorne new MockExampleGateway().
 * Handoff (dev): troque para new HttpExampleGateway().
 */
export const createExampleGateway = (): ExampleGateway => new MockExampleGateway()

// Handoff: trocar a linha acima por:
// export const createExampleGateway = (): ExampleGateway => new HttpExampleGateway()

void HttpExampleGateway // evita "unused" enquanto a factory aponta pro mock
