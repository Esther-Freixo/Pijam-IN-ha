import { FastifyRequest, FastifyReply } from 'fastify'
import { PrismaSalesRepository } from '../../../repositories/prisma/prisma-sales-repository.ts'

export async function remove(request: FastifyRequest, reply: FastifyReply) {
    const params = request.params as any
    const saleId = params.saleId

    try {
        // cria o repositório pras vendas (uma forma simples de acessar o DB)
        const salesRepository = new PrismaSalesRepository()
        // busca a venda pra pegar o addressId
        const sale = await salesRepository.findById(saleId)
        if (!sale) {
            // se não achar a venda, avisa com 404
            return reply.status(404).send({ message: 'Sale not found' })
        }

        const addressId = sale.addressId

        // deleta a venda
        await salesRepository.delete(saleId)

        // checa se mais alguma venda usa esse endereço, se não usar mais, apaga o endereço também
        const count = await salesRepository.countByAddress(addressId)
        if (count === 0) {
            await salesRepository.deleteAddress(addressId)
        }

        return reply.status(204).send()
    } catch (err) {
        // erro genérico, manda 500
        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
