import { PrismaClient, Student } from "@prisma/client";

const prisma = new PrismaClient()

export class ListStudentUseCase {
    async execute(): Promise<Student[]>{

        const students = await prisma.student.findMany()

        return students
    }
}