import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaPajamasRepository } from '../../../repositories/prisma/prisma-pajamas-repository.ts'
import { CreatePajamaUseCase } from '../../../use-cases/pajamas/create-pajama-use-case.ts'

export async function create(request: FastifyRequest, reply: FastifyReply) {

  const createPajamaBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    image: z.string().url(),
    price: z.number().positive(),
    season: z.string(),
    type: z.string(),
    gender: z.string(),
    favorite: z.boolean().default(false),
    on_sale: z.boolean().default(false),
    sale_percent: z.number().nullable().optional(),
  })

  const parsedBody = createPajamaBodySchema.parse(request.body)
  const pajamaData = {
    ...parsedBody,
    sale_percent: parsedBody.sale_percent ?? null,
  }

  try {
    const pajamasRepository = new PrismaPajamasRepository()
    const createPajamaUseCase = new CreatePajamaUseCase(pajamasRepository)

    const pajama = await createPajamaUseCase.execute(pajamaData)

    return reply.status(201).send({ pajama })
  } catch (err) {
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}