import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

interface Data {
    id: string;
    teacherId: string;
}

export class CreateStudentAssignTeacherUseCase {
    async execute({id, teacherId }: Data) {
        const teacher = await prisma.teacher.findUniqueOrThrow({
            where: {
                id: teacherId
            }
        })

        const student = await prisma.student.update({
            where: {
                id
            },
            data: {
                teachers: {
                    create: [
                        {
                            teacher: {
                                connect: {
                                    id: teacherId
                                }
                            }
                        }
                    ]
                }
            }
        })

        return student
    }
}