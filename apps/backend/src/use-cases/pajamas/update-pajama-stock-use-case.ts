import { PajamasRepository } from '../../repositories/pajamas-repository.ts'
import { ResourceNotFoundError } from '../../errors/resource-not-find-error.ts'
import { SizeType } from '@prisma/client'

interface UpdatePajamaStockUseCaseRequest {
  pajamaId: string
  size: SizeType 
  quantity: number
}

export class UpdatePajamaStockUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({
    pajamaId,
    size,
    quantity,
  }: UpdatePajamaStockUseCaseRequest): Promise<void> {
    const pajamaExists = await this.pajamasRepository.findById(pajamaId)

    if (!pajamaExists) {
      throw new ResourceNotFoundError()
    }

    if (quantity < 0) {
      throw new Error('Quantidade de estoque não pode ser negativa')
    }

    await this.pajamasRepository.updateStock(pajamaId, size, quantity)
  }
}