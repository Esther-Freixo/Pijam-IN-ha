import { Prisma, type SizeType } from "@prisma/client";
import { PajamaSizeRepository } from "../pajamaSize-repository.ts";
import { prisma } from "../../lib/prisma.ts";

export class PrismaPajamaSizeRepository implements PajamaSizeRepository {
    async create(data: Prisma.PajamaSizeCreateInput) {
        const pajamaSize = await prisma.pajamaSize.create({
            data,
        });
        return pajamaSize;
    }

    async update(id: string, data: Prisma.PajamaSizeUpdateInput) {
        const pajamaSize = await prisma.pajamaSize.update({
            where: {
                id,
            },
            data,
        });
        return pajamaSize;
    }

    async findByPajamaIdAndSize(pajamaId: string, size: SizeType) {
        const pajamaSize = await prisma.pajamaSize.findFirst({
            where: {
                pajamaId,
                size,
            },
        });
        return pajamaSize;
    }
}