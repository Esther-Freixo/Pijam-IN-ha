import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaPajamasRepository } from '../../../repositories/prisma/prisma-pajamas-repository.ts'
import { UpdatePajamaStockUseCase } from '../../../use-cases/pajamas/update-pajama-stock-use-case.ts'
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error.ts'
import { SizeType } from '@prisma/client'

export async function updateStock(request: FastifyRequest, reply: FastifyReply) {

  const updateStockParamsSchema = z.object({
    pajamaId: z.string().uuid(),
  })
  const updateStockBodySchema = z.object({
    size: z.nativeEnum(SizeType), 
    quantity: z.number().min(0),
  })

  const { pajamaId } = updateStockParamsSchema.parse(request.params)
  const { size, quantity } = updateStockBodySchema.parse(request.body)

  try {

    const pajamasRepository = new PrismaPajamasRepository()
    const updatePajamaStockUseCase = new UpdatePajamaStockUseCase(
      pajamasRepository,
    )

    await updatePajamaStockUseCase.execute({ pajamaId, size, quantity })

 
    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}