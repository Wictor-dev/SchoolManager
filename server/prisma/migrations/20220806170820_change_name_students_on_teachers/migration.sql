/*
  Warnings:

  - The primary key for the `student_teachers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `student_teachers` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student_teachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "assigned_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assigned_updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "student_teachers_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_student_teachers" ("assigned_at", "assigned_updated_at", "student_id", "teacher_id") SELECT "assigned_at", "assigned_updated_at", "student_id", "teacher_id" FROM "student_teachers";
DROP TABLE "student_teachers";
ALTER TABLE "new_student_teachers" RENAME TO "student_teachers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
