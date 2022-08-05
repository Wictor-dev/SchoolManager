import { CreateStudentDTO } from "../../dtos/CreateStudentDTO";
import { v4 } from 'uuid'
import { PrismaClient, Student } from "@prisma/client";

const prisma = new PrismaClient()

export class UpdateStudentUseCase {
    async execute({ id, name, registration}: CreateStudentDTO): Promise<Student>{

        const student = prisma.student.update({
            where: {
                id: id
            }, 
            data: {
                name, registration
            }
        })

        return student
    }
}