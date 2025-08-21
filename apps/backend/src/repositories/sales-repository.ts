import { Sale, Prisma } from '@prisma/client'

export interface SalesRepository {
  create(data: Prisma.SaleCreateInput): Promise<Sale>
  findById(id: string): Promise<Sale | null>
  listAll(): Promise<Sale[]>
  update(id: string, data: Prisma.SaleUpdateInput): Promise<Sale>
  delete(id: string): Promise<void>
  countByAddress(addressId: string): Promise<number>
  deleteAddress(id: string): Promise<void>
}
