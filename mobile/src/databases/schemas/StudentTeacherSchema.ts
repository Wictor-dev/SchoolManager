import { tableSchema } from "@nozbe/watermelondb/Schema";

export const StudentTeacherSchema = tableSchema({
    name: 'student_teachers',
    columns: [
        {name: "student_id", type: "string"},
        {name: "teacher_id", type: "string"},
    ]
})