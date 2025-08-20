import { Pajama, Prisma, PajamaSize, SizeType } from '@prisma/client'

export interface PajamaWithSizes extends Pajama {
  sizes: PajamaSize[]
}

export interface PajamasRepository {
  create(data: Prisma.PajamaCreateInput): Promise<Pajama>
  update(id: string, data: Prisma.PajamaUpdateInput): Promise<Pajama>
  updateStock(pajamaId: string, size: SizeType, newQuantity: number): Promise<void> // Adicionado
  findById(id: string): Promise<PajamaWithSizes | null>
  delete(id: string): Promise<void>
  listAll(): Promise<PajamaWithSizes[]>
}