import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaSalesRepository } from '../../../repositories/prisma/prisma-sales-repository.ts'
import { ResourceNotFoundError } from '../../../errors/resource-not-find-error.ts'

export async function getDetails(request: FastifyRequest, reply: FastifyReply) {
  const params = request.params as any
  const saleId = params.saleId

  try {
    const salesRepository = new PrismaSalesRepository()
    const sale = await salesRepository.findById(saleId)

    if (!sale) {
      return reply.status(404).send({ message: 'Sale not found' })
    }

    return reply.status(200).send({ sale })
  } catch (err) {
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
