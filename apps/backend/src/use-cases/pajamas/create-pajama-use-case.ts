import { PajamasRepository } from '../../repositories/pajamas-repository.ts'
import { Pajama, Prisma, SizeType } from '@prisma/client'

interface CreatePajamaUseCaseRequest {
  name: string
  description: string
  image: string
  price: number
  season: string
  type: string
  gender: string
  favorite: boolean
  on_sale: boolean
  sale_percent?: number | null
}

interface CreatePajamaUseCaseResponse {
  pajama: Pajama
}

export class CreatePajamaUseCase {

  constructor(private pajamasRepository: PajamasRepository) {}

  async execute(
    request: CreatePajamaUseCaseRequest,
  ): Promise<CreatePajamaUseCaseResponse> {

    const pajamaSizesToCreate = Object.values(SizeType).map((sizeEnum) => {
      return {
        size: sizeEnum,
        stock_quantity: 0, 
      }
    })

    const pajamaData: Prisma.PajamaCreateInput = {
      ...request,
      sizes: {
        create: pajamaSizesToCreate,
      },
    }

    const pajama = await this.pajamasRepository.create(pajamaData)

    return { pajama }
  }
}