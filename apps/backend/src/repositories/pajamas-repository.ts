import { type Pajama, type PajamaSize, Prisma } from "@prisma/client";

export interface FindPajamasComplete extends Pajama{
    pajamaSize: PajamaSize[];
}

export interface PajamasRepository{
    create(data: Prisma.PajamaCreateInput): Promise <Pajama>;
    update(id: number, data: Prisma.PajamaUpdateInput): Promise<Pajama>;
    get(id: number): Promise<FindPajamaWithDetails | null>;
    delete(id: number): Promise<void>;
    list(): Promise<FindPajamasComplete[]>
}