/*
  Warnings:

  - You are about to drop the `StudentsOnTeachers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "StudentsOnTeachers";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "student_teachers" (
    "student_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "assigned_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("student_id", "teacher_id"),
    CONSTRAINT "student_teachers_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
