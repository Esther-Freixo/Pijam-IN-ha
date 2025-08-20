import { PajamasRepository, PajamaWithSizes } from '../../repositories/pajamas-repository.ts'

interface ListPajamasUseCaseResponse {
  pajamas: PajamaWithSizes[]
}

export class ListPajamasUseCase {
  constructor(private pajamasRepository: PajamasRepository) {}

  async execute(): Promise<ListPajamasUseCaseResponse> {
    const pajamas = await this.pajamasRepository.listAll()

    return { pajamas }
  }
}
