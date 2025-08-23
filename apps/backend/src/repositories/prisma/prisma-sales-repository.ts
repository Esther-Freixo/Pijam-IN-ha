import { SalesRepository } from '../sales-repository.ts'
import { Prisma, type Sale } from '@prisma/client'
import { prisma } from '../../lib/prisma.ts'

export class PrismaSalesRepository implements SalesRepository {
  async create(data: Prisma.SaleCreateInput): Promise<Sale> {
    const sale = await prisma.sale.create({
      data,
      include: { address: true, pajamas: true },
    })

    return sale
  }

  async findById(id: string): Promise<Sale | null> {
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        address: true,
        pajamas: true,
      },
    })

    return sale
  }

 async listAll() {
  const sales = await prisma.sale.findMany({
    include: {
      pajamas: {
        include: {
          pajama: true, // Isso inclui os detalhes do pijama, se necessário.
        },
      },
      address: true, // Incluindo o endereço também para completar os dados
    },
  });
  return sales;
}

  async delete(id: string): Promise<void> {
    await prisma.sale.delete({ where: { id } })
  }

  async update(id: string, data: Prisma.SaleUpdateInput): Promise<Sale> {
    const sale = await prisma.sale.update({
      where: { id },
      data,
      include: { address: true, pajamas: true },
    })

    return sale
  }

  async countByAddress(addressId: string): Promise<number> {
    const count = await prisma.sale.count({ where: { addressId } })
    return count
  }

  async deleteAddress(id: string): Promise<void> {
    await prisma.address.delete({ where: { id } })
  }
}
