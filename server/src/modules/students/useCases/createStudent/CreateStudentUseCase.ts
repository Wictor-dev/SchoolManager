import { CreateStudentDTO } from "../../dtos/CreateStudentDTO";
import { PrismaClient, Student } from "@prisma/client";

const prisma = new PrismaClient()

export class CreateStudentUseCase {
    async execute({ name, registration}: CreateStudentDTO): Promise<Student>{
        
        const student = await prisma.student.create({
            data: {
                name,
                registration,
            }
        })

        return student
    }
}