import { CreateStudentDTO } from "../../dtos/CreateStudentDTO";
import { PrismaClient, Student } from "@prisma/client";

const prisma = new PrismaClient()

export class SyncCreateStudentUseCase {
    async execute({ id, name, registration}: CreateStudentDTO): Promise<Student>{
        console.log(id)
        const student = await prisma.student.create({
            data: {
                id,
                name,
                registration,
            }
        })

        return student
    }
}