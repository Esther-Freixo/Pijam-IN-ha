import type { FindPajamasComplete, PajamasRepository } from "../pajamas-repository.ts";
import { Prisma, type Pajama, type SizeType } from "@prisma/client";
import { prisma } from "../../lib/prisma.ts";

export class PrismaPajamasRepository implements PajamasRepository{
    async create(data: Prisma.PajamaCreateInput): Promise <Pajama>
    {
        const pajamaSizes = [
            { size: SizeType.PP, stockQuantity: 0 },
            { size: SizeType.P, stockQuantity: 0 },
            { size: SizeType.M, stockQuantity: 0 },
            { size: SizeType.G, stockQuantity: 0 },
            { size: SizeType.GG, stockQuantity: 0 }
        ]

        return await prisma.pajama.create({
            data: {
                ...data,
                pajamaSizes: {
                    create: pajamaSizes
                }
            }
        });

    }
    
    async update(id: number, data: Prisma.PajamaUpdateInput): Promise<Pajama> 
    {

        return await prisma.pajama.update({ where: id }, data)

    }

    async get(id: number): Promise<FindPajamasComplete | null>
    {

        return await prisma.pajama.findUnique({
            where: { id },
            include: {
                pajamaSize: true
            }
        })

    }
    
    async delete(id: number): Promise<void>
    {

        await prisma.pajama.delete({ where: { id } })

    }
    
    async list(): Promise<FindPajamasComplete[]>
    {

        return await prisma.pajama.findMany({
            include: {
                pajamaSize: true
            }
        })

    }
}
