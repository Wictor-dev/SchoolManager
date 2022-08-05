import { CreateStudentDTO } from "../../dtos/CreateStudentDTO";
import { v4 } from 'uuid'
import { PrismaClient, Student } from "@prisma/client";

const prisma = new PrismaClient()

export class CreateStudentUseCase {
    async execute({ id, name, registration}: CreateStudentDTO): Promise<Student>{

        const student = await prisma.student.create({
            data: {
                name,
                registration,
            }
        })

        if (id) {
            student.id = id
        }

        console.log({
            id,
            student
        })
        return student
    }
}