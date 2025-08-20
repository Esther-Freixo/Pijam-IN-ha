import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaPajamasRepository } from '../../../repositories/prisma/prisma-pajamas-repository.ts'
import { ListPajamasUseCase } from '../../../use-cases/pajamas/list-pajama-use-case.ts'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const pajamasRepository = new PrismaPajamasRepository()
    const listPajamasUseCase = new ListPajamasUseCase(pajamasRepository)

    const { pajamas } = await listPajamasUseCase.execute()

    return reply.status(200).send({ pajamas })
  } catch (err) {
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}