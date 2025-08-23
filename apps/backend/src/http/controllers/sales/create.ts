import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { PrismaSalesRepository } from '../../../repositories/prisma/prisma-sales-repository.ts'
import { CreateSaleUseCase } from '../../../use-cases/sales/create-sale-use-case.ts'
import { OutOfStockError } from '../../../errors/out-of-stock-error.ts'
import { ResourceNotFoundError } from '../../../errors/resource-not-found-error.ts'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createSaleBodySchema = z.object({
    buyer_name: z.string(),
    cpf: z.string(),
    price: z.number().positive(),
    payment_method: z.string(),
    installments: z.number().optional(),
    card_number: z.string().nullable().optional(), // `nullable` para aceitar `null`
    address: z.object({
      zip_code: z.string(),
      state: z.string(),
      city: z.string(),
      neighborhood: z.string(),
      address: z.string(),
      number: z.string(),
    }),
    pajamas: z.array(z.object({
      pajamaId: z.string(), // Corrigido para string
      size: z.string().optional(),
      quantity: z.number().min(1),
      price: z.number().positive(),
    }))
  })

  const parsed = createSaleBodySchema.parse(request.body)

  try {
    const salesRepository = new PrismaSalesRepository()
    const createSaleUseCase = new CreateSaleUseCase(salesRepository)

    const sale = await createSaleUseCase.execute({
      ...parsed,
      address: parsed.address,
      pajamas: parsed.pajamas.map((p: any) => ({ pajamaId: p.pajamaId, size: p.size, quantity: p.quantity, price: p.price })),
    })

    return reply.status(201).send({ sale })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: 'Resource not found' })
    }

    if (err instanceof OutOfStockError) {
      return reply.status(409).send({ message: 'Out of stock' })
    }

    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}