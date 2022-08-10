/*
  Warnings:

  - You are about to drop the column `assigned_at` on the `student_teachers` table. All the data in the column will be lost.
  - You are about to drop the column `assigned_updated_at` on the `student_teachers` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_student_teachers" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "student_id" TEXT NOT NULL,
    "teacher_id" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "student_teachers_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "student_teachers_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "teachers" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_student_teachers" ("id", "student_id", "teacher_id") SELECT "id", "student_id", "teacher_id" FROM "student_teachers";
DROP TABLE "student_teachers";
ALTER TABLE "new_student_teachers" RENAME TO "student_teachers";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
