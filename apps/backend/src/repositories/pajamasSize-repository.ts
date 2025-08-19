import { type PajamasSize, Prisma } from "@prisma/client";

export interface PajamaSizeRepository{
    create(data: Prisma.PajamaSizeCreateInput): Promise<PajamaSize>;
    update(id: number, data: Prisma.PajamaSizeUpdateInput): Promise<PajamaSize>;
    findByPajamaIdAndSize(pajamaId: number, size: SizeType): Promise<PajamaSize | null>;
}