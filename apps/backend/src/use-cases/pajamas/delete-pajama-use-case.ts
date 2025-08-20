import { PajamasRepository } from '../../repositories/pajamas-repository.ts'
import { ResourceNotFoundError } from '../../errors/resource-not-find-error.ts'

interface DeletePajamaUseCaseRequest {
  pajamaId: string
}

export class DeletePajamaUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ pajamaId }: DeletePajamaUseCaseRequest): Promise<void> {
    const pajama = await this.pajamasRepository.findById(pajamaId)

    if (!pajama) {
      throw new ResourceNotFoundError()
    }

    await this.pajamasRepository.delete(pajamaId)
  }
}