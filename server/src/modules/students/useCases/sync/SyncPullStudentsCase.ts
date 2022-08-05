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
        const updated = await prisma.$queryRaw<Student[]>`SELECT * FROM students WHERE updated_at >= ${date} AND updated_at <> created_at`
        console.log('lastPulledVersion Studen', lastPulledVersion)
        console.log(date)
        console.log('updated student',updated)
        const created = await prisma.$queryRaw<Student[]>`SELECT * FROM students WHERE created_at > ${date}`
        
        console.log('Created student', created)
        return {
            created,
            updated,
            deleted: []
        }
    }
}