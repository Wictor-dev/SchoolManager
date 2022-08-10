import { PrismaClient, Teacher } from "@prisma/client";
import { AppError } from "../../../../shared/errors/AppError";
import { CreateTeacherDTO } from "../../dtos/CreateTeacherDTO";

const prisma = new PrismaClient();

export class SyncCreateTeacherUseCase {
  async execute({
    id,
    name,
    age,
    payment,
  }: CreateTeacherDTO): Promise<Teacher> {
    const teacherFinded = await prisma.teacher.findUnique({ where: { id } });

    if (!!teacherFinded) {
      throw new AppError("Teacher Already exists!");
    }

    const teacher = await prisma.teacher.create({
      data: {
        id,
        name,
        age,
        payment,
      },
    });

    return teacher;
  }
}
