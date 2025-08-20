import { SalesRepository } from '../../repositories/sales-repository.ts'
import { Prisma } from '@prisma/client'
import { ResourceNotFoundError } from '../../errors/resource-not-find-error.ts'

interface UpdateSaleRequest {
  saleId: string
  buyer_name?: string
  cpf?: string
  price?: number
  payment_method?: string
  installments?: number
  card_number?: string | null
}

export class UpdateSaleUseCase {
  constructor(private salesRepository: SalesRepository) {}

  async execute(data: UpdateSaleRequest) {
    // Verify sale exists
    const existingSale = await this.salesRepository.findById(data.saleId)
    if (!existingSale) {
      throw new ResourceNotFoundError()
    }

    // Build update data
    const updateData: Prisma.SaleUpdateInput = {}
    if (data.buyer_name !== undefined) updateData.buyer_name = data.buyer_name
    if (data.cpf !== undefined) updateData.cpf = data.cpf
    if (data.price !== undefined) updateData.price = data.price
    if (data.payment_method !== undefined) updateData.payment_method = data.payment_method
    if (data.installments !== undefined) updateData.installments = data.installments
    if (data.card_number !== undefined) updateData.card_number = data.card_number

    const updatedSale = await this.salesRepository.update(data.saleId, updateData)

    return { sale: updatedSale }
  }
}
