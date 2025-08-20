import { PajamaSize, SizeType, Prisma } from "@prisma/client";

export interface PajamaSizeRepository{
    create(data: Prisma.PajamaSizeCreateInput): Promise<PajamaSize>;
    update(id: string, data: Prisma.PajamaSizeUpdateInput): Promise<PajamaSize>;
    findByPajamaIdAndSize(pajamaId: string, size: SizeType): Promise<PajamaSize | null>;
}