import { CreateStudentDTO } from "../../dtos/CreateStudentDTO";
import { PrismaClient, Student } from "@prisma/client";
import { AppError } from "../../../../shared/errors/AppError";

const prisma = new PrismaClient();

interface Data {
  id: string;
  name: string;
  registration: string;
  lastPulledVersion: number;
}
export class SyncCreateStudentUseCase {
  async execute({
    id,
    name,
    registration,
    lastPulledVersion
  }: Data): Promise<Student> {
    const findStudent = await prisma.student.findUnique({ where: { id } });
    
    if (!!findStudent) {
      throw new AppError("Student Already exists!");
    }

    const student = await prisma.student.create({
      data: {
        id,
        name,
        registration,
        created_at: new Date(lastPulledVersion),
        updated_at: new Date(lastPulledVersion)
      },
    });
    
    return student
  }
}
