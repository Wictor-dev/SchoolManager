import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite"
import { migrations } from "./models/migrations";
import { StudentModel } from "./models/StudentModel";
import { StudentTeacherModel } from "./models/StudentTeacherModel";
import { TeacherModel } from "./models/TeacherModel";
import { schemas } from "./schemas";

const adapter = new SQLiteAdapter({
    schema: schemas,
    migrations
})

export const database = new Database({
    adapter,
    modelClasses: [
        StudentModel,TeacherModel, StudentTeacherModel
    ]
})