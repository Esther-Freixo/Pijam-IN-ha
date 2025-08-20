import { PajamasRepository, PajamaWithSizes } from '../../repositories/pajamas-repository.ts'
import { ResourceNotFoundError } from '../../errors/resource-not-find-error.ts'

interface GetPajamaDetailsUseCaseRequest {
  pajamaId: string
}

interface GetPajamaDetailsUseCaseResponse {
  pajama: PajamaWithSizes
}

export class GetPajamaDetailsUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute({
    pajamaId,
  }: GetPajamaDetailsUseCaseRequest): Promise<GetPajamaDetailsUseCaseResponse> {
    const pajama = await this.pajamasRepository.findById(pajamaId)

    if (!pajama) {
      throw new ResourceNotFoundError()
    }

    return { pajama }
  }
}