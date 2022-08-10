import { PrismaClient, Teacher } from "@prisma/client";

import { CreateTeacherDTO } from "../../dtos/CreateTeacherDTO";

const prisma = new PrismaClient();

export class CreateTeacherUseCase {
  async execute({ name, age, payment }: CreateTeacherDTO): Promise<Teacher> {
    const teacher = await prisma.teacher.create({
      data: {
        name,
        age,
        payment,
      },
    });

    return teacher;
  }
}
