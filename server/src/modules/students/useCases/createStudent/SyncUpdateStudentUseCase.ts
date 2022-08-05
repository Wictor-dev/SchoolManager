import { CreateStudentDTO } from "../../dtos/CreateStudentDTO";
import { v4 } from "uuid";
import { PrismaClient, Student } from "@prisma/client";

const prisma = new PrismaClient();

interface Data {
  id: string;
  name: string;
  registration: string;
}

export class SyncStudentUseCase {
  async execute({
    id,
    name,
    registration,
  }: Data): Promise<Student> {

    const student = await prisma.student.findUnique({
      where: {
        id
      }
    });

    console.log(student)
    if (!student){
      throw new Error("deu erro");
    } 

    student.name = name
    student.registration = registration
    return student
  }
}
