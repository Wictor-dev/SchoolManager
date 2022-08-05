import { PrismaClient, Teacher } from "@prisma/client";
import { CreateTeacherDTO } from "../../dtos/CreateTeacherDTO";

const prisma = new PrismaClient()

export class UpdateTeacherUseCase {
    async execute({ id, name, age, payment}: CreateTeacherDTO): Promise<Teacher>{

        const teacher = prisma.teacher.update({
            where: {
                id: id
            }, 
            data: {
                name, 
                age,
                payment
            }
        })

        return teacher
    }
}