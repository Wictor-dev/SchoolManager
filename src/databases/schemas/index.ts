import { appSchema } from "@nozbe/watermelondb/Schema";
import { StudentTeacherModel } from "../models/StudentTeacherModel";
import { StudentsSchema } from "./StudentSchema";
import { StudentTeacherSchema } from "./StudentTeacherSchema";
import { TeachersSchema } from "./TeachersSchema";

export const schemas = appSchema({
    version: 2,
    tables: [StudentsSchema, TeachersSchema, StudentTeacherSchema]
})