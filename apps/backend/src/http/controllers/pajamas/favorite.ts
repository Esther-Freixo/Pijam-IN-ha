import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaPajamasRepository } from '../../../repositories/prisma/prisma-pajamas-repository.ts'
import { FavoriteUseCase } from '../../../use-cases/pajamas/favorite-use-case.ts'
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error.ts'

export async function favorite(
  request: FastifyRequest,
  reply: FastifyReply,
) {

  const toggleFavoriteParamsSchema = z.object({
    pajamaId: z.string().uuid(),
  })

  const { pajamaId } = toggleFavoriteParamsSchema.parse(request.params)

  try {

    const pajamasRepository = new PrismaPajamasRepository()
    const toggleFavoriteUseCase = new FavoriteUseCase(pajamasRepository)

    const { pajama } = await toggleFavoriteUseCase.execute({ pajamaId })


    return reply.status(200).send({ pajama })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
  
}