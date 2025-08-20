import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaSalesRepository } from '../../../repositories/prisma/prisma-sales-repository.ts'
import { UpdateSaleUseCase } from '../../../use-cases/sales/update-sale-use-case.ts'
import { ResourceNotFoundError } from '../../../errors/resource-not-find-error.ts'

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const updateSaleParamsSchema = z.object({
    saleId: z.string().uuid(),
  })

  const updateSaleBodySchema = z.object({
    buyer_name: z.string().optional(),
    cpf: z.string().optional(),
    price: z.number().positive().optional(),
    payment_method: z.string().optional(),
    installments: z.number().min(1).optional(),
    card_number: z.string().optional(),
  })

  const { saleId } = updateSaleParamsSchema.parse(request.params)
  const parsed = updateSaleBodySchema.parse(request.body)

  try {
    const salesRepository = new PrismaSalesRepository()
    const updateSaleUseCase = new UpdateSaleUseCase(salesRepository)

    const result = await updateSaleUseCase.execute({
      saleId,
      ...parsed,
    })

    return reply.status(200).send(result)
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Sale not found' })
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
