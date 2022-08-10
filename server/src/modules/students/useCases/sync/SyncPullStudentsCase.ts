import { PrismaClient, Student } from "@prisma/client";



interface ResponseData {
    created: Student[],
    updated: Student[],
    deleted: []
}

const prisma = new PrismaClient()

export class SyncPullStudentsCase {
    async execute(lastPulledVersion: number): Promise<ResponseData> {
        const date = new Date(lastPulledVersion) 
        const updated = await prisma.$queryRaw<Student[]>`SELECT * FROM students WHERE updated_at >= ${lastPulledVersion} AND updated_at <> created_at`
        
        const created = await prisma.$queryRaw<Student[]>`SELECT * FROM students WHERE created_at > ${lastPulledVersion}`
        
        console.log({student:{
            lastPulledVersion,
            date,
            updated,
            created
        }})
        return {
            created,
            updated,
            deleted: []
        }
    }
}