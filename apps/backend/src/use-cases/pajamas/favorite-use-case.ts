import { PajamasRepository } from '../../repositories/pajamas-repository.ts'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error.ts'
import { Pajama } from '@prisma/client'

interface FavoriteUseCaseRequest {
  pajamaId: string
}

interface FavoriteUseCaseResponse {
  pajama: Pajama
}

export class FavoriteUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({ pajamaId }: FavoriteUseCaseRequest): Promise<FavoriteUseCaseResponse> {

    const pajama = await this.pajamasRepository.findById(pajamaId)

    if (!pajama) {
      throw new ResourceNotFoundError()
    }

    const newFavoriteStatus = !pajama.favorite

    const updatedPajama = await this.pajamasRepository.update(pajamaId, {
      favorite: newFavoriteStatus,
    })

    return { pajama: updatedPajama }

  }
}