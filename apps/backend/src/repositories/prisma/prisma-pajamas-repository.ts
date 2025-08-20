import { PajamasRepository, PajamaWithSizes } from '../pajamas-repository.ts'
import { Prisma, Pajama, SizeType } from '@prisma/client'
import { prisma } from '../../lib/prisma.ts'
import { ResourceNotFoundError } from '../../errors/resource-not-find-error.ts'

export class PrismaPajamasRepository implements PajamasRepository {
  
  async create(data: Prisma.PajamaCreateInput): Promise<Pajama> {
    return prisma.pajama.create({
      data,
    })
  }

  
  async update(id: string, data: Prisma.PajamaUpdateInput): Promise<Pajama> {
    return prisma.pajama.update({
      where: { id },
      data,
    })
  }
  
  async updateStock(pajamaId: string, size: SizeType, newQuantity: number): Promise<void> {
    const pajamaSize = await prisma.pajamaSize.findFirst({
      where: {
        pajamaId,
        size,
      },
    })

    if (!pajamaSize) {
      throw new ResourceNotFoundError()
    }

    await prisma.pajamaSize.update({
      where: { id: pajamaSize.id },
      data: { stock_quantity: newQuantity },
    })
  }

  async findById(id: string): Promise<PajamaWithSizes | null> {
    const pajama = await prisma.pajama.findUnique({
      where: { id },
      include: {
        sizes: true,
      },
    })

    return pajama
  }

  async delete(id: string): Promise<void> {
    await prisma.pajama.delete({ where: { id } })
  }

  async listAll(): Promise<PajamaWithSizes[]> {
    const pajamas = await prisma.pajama.findMany({
      include: {
        sizes: true,
      },
    })

    return pajamas
  }
  
}