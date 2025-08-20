import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaSalesRepository } from '../../../repositories/prisma/prisma-sales-repository.ts'

export async function list(request: FastifyRequest, reply: FastifyReply) {
  try {
    const salesRepository = new PrismaSalesRepository()
    const sales = await salesRepository.listAll()

    // Add total quantity and total price per sale
    const enriched = sales.map(s => {
      const totalQuantity = s.pajamas.reduce((acc: number, p: any) => acc + p.quantity, 0)
      const totalPrice = s.pajamas.reduce((acc: number, p: any) => acc + (p.quantity * p.price), 0)
      return { ...s, totalQuantity, totalPrice }
    })

    return reply.status(200).send({ sales: enriched })
  } catch (err) {
    return reply.status(500).send({ message: 'Internal Server Error' })
  }
}
