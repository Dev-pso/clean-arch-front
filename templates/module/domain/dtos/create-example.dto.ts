import { z } from 'zod'

/**
 * DTO = schema Zod + tipo inferido. O schema valida o input no use case.
 * Regra: valide no domain/application, nunca confie no formulário.
 */
export const createExampleDtoSchema = z.object({
  name: z.string().trim().min(3, 'Informe o nome'),
})

export type CreateExampleDto = z.infer<typeof createExampleDtoSchema>
