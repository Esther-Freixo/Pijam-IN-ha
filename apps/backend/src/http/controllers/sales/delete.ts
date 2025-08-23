import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaSalesRepository } from '../../../repositories/prisma/prisma-sales-repository.ts'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any
    const saleId = params.saleId

    try {

        const salesRepository = new PrismaSalesRepository()
        const sale = await salesRepository.findById(saleId)
        if (!sale) {
            return reply.status(404).send({ message: 'Sale not found' })
        }

        const addressId = sale.addressId

    
        await salesRepository.delete(saleId)

        const count = await salesRepository.countByAddress(addressId)
        if (count === 0) {
            await salesRepository.deleteAddress(addressId)
        }

        return reply.status(204).send()
    } catch (err) {

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
