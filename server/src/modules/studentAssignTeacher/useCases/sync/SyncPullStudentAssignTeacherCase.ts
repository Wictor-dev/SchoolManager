import { PrismaClient, Student, Student_Teachers } from "@prisma/client";

interface ResponseData {
    created: Student_Teachers[],
    updated: Student_Teachers[],
    deleted: []
}

const prisma = new PrismaClient()

export class SyncPullStudentAssignTeacherCase {
    async execute(lastPulledVersion: number): Promise<ResponseData> {
        const date = new Date(lastPulledVersion)
        
        // const all = await prisma.$queryRaw`SELECT * FROM student_teachers`
       
        const updated = await prisma.$queryRaw<Student_Teachers[]>`SELECT * FROM student_teachers WHERE updated_at >= ${lastPulledVersion} AND updated_at <> created_at`

        const created = await prisma.$queryRaw<Student_Teachers[]>`SELECT * FROM student_teachers WHERE created_at > ${lastPulledVersion}`
        console.log({
            lastPulledVersion,
            date,
            updated,
            created
        })
        return {
            created,
            updated,
            deleted: []
        }
    }
}