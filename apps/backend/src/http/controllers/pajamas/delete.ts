import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaPajamasRepository } from '../../../repositories/prisma/prisma-pajamas-repository.ts'
import { DeletePajamaUseCase } from '../../../use-cases/pajamas/delete-pajama-use-case.ts'
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error.ts'

export async function remove(request: FastifyRequest, reply: FastifyReply) {

  const deleteParamsSchema = z.object({
    pajamaId: z.string().uuid(),
  })

  const { pajamaId } = deleteParamsSchema.parse(request.params)

  try {

    const pajamasRepository = new PrismaPajamasRepository()
    const deletePajamaUseCase = new DeletePajamaUseCase(pajamasRepository)

    await deletePajamaUseCase.execute({ pajamaId })


    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}