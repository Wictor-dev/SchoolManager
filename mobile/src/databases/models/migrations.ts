import {
  createTable,
  schemaMigrations,
} from "@nozbe/watermelondb/Schema/migrations";

export const migrations = schemaMigrations({
  migrations: [
    {
      toVersion: 2,
      steps: [
        createTable({
          name: "student_teachers",
          columns: [
            { name: "student_id", type: "string" },
            { name: "teacher_id", type: "string" },
          ],
        }),
      ],
    },
  ],
});
