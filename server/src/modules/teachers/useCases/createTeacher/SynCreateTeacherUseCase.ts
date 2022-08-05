import { PrismaClient, Teacher } from "@prisma/client";
import { CreateTeacherDTO } from "../../dtos/CreateTeacherDTO";

const prisma = new PrismaClient()

export class SyncCreateTeacherUseCase {
    async execute({ id, name, age, payment}: CreateTeacherDTO): Promise<Teacher>{
        console.log(id)
        const teacher = await prisma.teacher.create({
            data: {
                id,
                name,
                age,
                payment
            }
        })

        return teacher
    }
}