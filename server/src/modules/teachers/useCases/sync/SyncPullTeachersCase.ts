import { PrismaClient, Teacher } from "@prisma/client";

interface ResponseData {
    created: Teacher[],
    updated: Teacher[],
    deleted: []
}

const prisma = new PrismaClient()

export class SyncPullTeachersCase {
    async execute(lastPulledVersion: number): Promise<ResponseData> {
        const date = new Date(lastPulledVersion)
        const updated = await prisma.$queryRaw<Teacher[]>`SELECT * FROM teachers WHERE updated_at >= ${date} AND updated_at <> created_at`
        const created = await prisma.$queryRaw<Teacher[]>`SELECT * FROM teachers WHERE created_at > ${date}`
            
        return {
            created,
            updated,
            deleted: []
        }
    }
}