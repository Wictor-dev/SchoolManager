import {
  PrismaClient,
  Student,
  Student_Teachers,
  Teacher,
} from "@prisma/client";

interface ResponseProps {
  created: Student[] | Teacher[] | Student_Teachers[];
  updated: Student[] | Teacher[] | Student_Teachers[];
  deleted: [];
}

interface ResponseData {
  students: ResponseProps;
  teachers: ResponseProps;
  student_teachers: ResponseProps;
}

const prisma = new PrismaClient();

export class SyncPullUseCase {
  async execute(lastPulledVersion: number): Promise<ResponseData> {
    const date = new Date(lastPulledVersion);
    const updatedStudents = await prisma.$queryRaw<
      Student[]
    >`SELECT * FROM students WHERE updated_at >= ${lastPulledVersion} AND updated_at <> created_at`;

    const createdStudents = await prisma.$queryRaw<
      Student[]
    >`SELECT * FROM students WHERE created_at > ${lastPulledVersion}`;

    const updatedTeachers = await prisma.$queryRaw<
      Teacher[]
    >`SELECT * FROM teachers WHERE updated_at >= ${lastPulledVersion} AND updated_at <> created_at`;
    const createdTeachers = await prisma.$queryRaw<
      Teacher[]
    >`SELECT * FROM teachers WHERE created_at > ${lastPulledVersion}`;

    const updatedRelation = await prisma.$queryRaw<
      Student_Teachers[]
    >`SELECT * FROM student_teachers WHERE updated_at >= ${lastPulledVersion} AND updated_at <> created_at`;

    const createdRelation = await prisma.$queryRaw<
      Student_Teachers[]
    >`SELECT * FROM student_teachers WHERE created_at > ${lastPulledVersion}`;

    console.log({
      students: {
        date,
        created: createdStudents[0],
        updated: updatedStudents,
        deleted: [],
      },
    });
    return {
      students: {
        created: createdStudents,
        updated: updatedStudents,
        deleted: [],
      },
      teachers: {
        created: createdTeachers,
        updated: updatedTeachers,
        deleted: [],
      },
      student_teachers: {
        created: createdRelation,
        updated: updatedRelation,
        deleted: [],
      },
    };
  }
}
