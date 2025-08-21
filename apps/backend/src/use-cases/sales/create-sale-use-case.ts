import { SalesRepository } from '../../repositories/sales-repository.ts'
import { Prisma, SizeType } from '@prisma/client'
import { prisma } from '../../lib/prisma.ts'
import { OutOfStockError } from '../../errors/out-of-stock-error.ts'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error.ts'

interface SaleItemInput {
  pajamaId: string
  size?: SizeType | string
  quantity: number
  price: number
}

interface CreateSaleRequest {
  buyer_name: string
  cpf: string
  price: number
  payment_method: string
  installments?: number
  card_number?: string | null
  address: Prisma.AddressCreateInput
  pajamas: SaleItemInput[]
}

export class CreateSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute(data: CreateSaleRequest) {
    // Validate items: pajama exists and has at least the requested stock for at least one size
    // The schema models stock per PajamaSize. For simplicity, here we assume the client refers to a pajamaId and quantity
    // and we will try to reduce stock from any available size in order PP->GG (or use a more precise client-side size parameter in the future).

  return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Verify each pajama exists
      for (const item of data.pajamas) {
        const pajama = await tx.pajama.findUnique({ where: { id: item.pajamaId }, include: { sizes: true } })
        if (!pajama) throw new ResourceNotFoundError()

        if (item.size) {
          // Try to decrement the specific size
          const pajamaSize = pajama.sizes.find((s: any) => String(s.size) === String(item.size))
          if (!pajamaSize) throw new ResourceNotFoundError()
          if (pajamaSize.stock_quantity < item.quantity) throw new OutOfStockError()

          await tx.pajamaSize.update({ where: { id: pajamaSize.id }, data: { stock_quantity: pajamaSize.stock_quantity - item.quantity } })
        } else {
          // Find any size with enough stock

          const sizeWithStock = pajama.sizes.find((s: any) => s.stock_quantity >= item.quantity)
          if (!sizeWithStock) {
            // Not enough stock for this pajama
            throw new OutOfStockError()
          }

          // Decrement stock on the found size
          await tx.pajamaSize.update({ where: { id: sizeWithStock.id }, data: { stock_quantity: sizeWithStock.stock_quantity - item.quantity } })
        }
      }

      // Build create input using nested create for address and pajamas (use create for items so Prisma returns them)
      const saleData: Prisma.SaleCreateInput = {
        buyer_name: data.buyer_name,
        cpf: data.cpf,
        price: data.price,
        payment_method: data.payment_method,
        installments: data.installments ?? 1,
        card_number: data.card_number ?? null,
        address: { create: data.address },
        pajamas: {
          create: data.pajamas.map(p => ({
            pajama: { connect: { id: p.pajamaId } },
            quantity: p.quantity,
            price: p.price,
          }))
        }
      }

      const sale = await tx.sale.create({ data: saleData, include: { address: true, pajamas: true } })

      return sale
    })
  }
}
