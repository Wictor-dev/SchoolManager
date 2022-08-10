import { PrismaClient, Student, Student_Teachers } from "@prisma/client";
import { AppError } from "../../../../shared/errors/AppError";

const prisma = new PrismaClient();

interface Data {
  id: string;
  teacher_id: string;
  student_id: string;
  lastPulledVersion: number;
}
export class SyncCreateStudentAssignTeacherUseCase {
  async execute({
    id,
    student_id,
    teacher_id,
    lastPulledVersion
  }: Data): Promise<Student_Teachers> {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: teacher_id,
      },
    });

    const student = await prisma.student.findUnique({
      where: {
        id: student_id,
      },
    });

    const relation = await prisma.student_Teachers.findMany({
      where: {
        student_id: student_id,      
        OR: {
          teacher_id: teacher_id,
        },
      }
    })

    if (!student) {
      throw new AppError("Student not found!");
    }

    if (!teacher) {
      throw new AppError("Teacher not found!");
    }

    if (relation.length > 0){
      throw new AppError("Relation already exists!");
    }

    const studentTeacher = await prisma.student_Teachers.create({
      data: {
        id,
        student_id,
        teacher_id,
        created_at: new Date(lastPulledVersion),
        updated_at: new Date(lastPulledVersion)
      },
    });

    return studentTeacher;
  }
}
