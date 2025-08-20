import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaPajamasRepository } from '../../../repositories/prisma/prisma-pajamas-repository.ts'
import { GetPajamaDetailsUseCase } from '../../../use-cases/pajamas/get-pajama-use-case.ts'
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error.ts'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {

  const getDetailsParamsSchema = z.object({
    pajamaId: z.string().uuid(),
  })

  const { pajamaId } = getDetailsParamsSchema.parse(request.params)

  try {

    const pajamasRepository = new PrismaPajamasRepository()
    const getPajamaDetailsUseCase = new GetPajamaDetailsUseCase(pajamasRepository)
    const { pajama } = await getPajamaDetailsUseCase.execute({ pajamaId })


    return reply.status(200).send({ pajama })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}