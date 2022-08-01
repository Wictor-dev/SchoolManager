import { Model } from "@nozbe/watermelondb";
import { immutableRelation } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import Relation from "@nozbe/watermelondb/Relation";
import { StudentModel } from "./StudentModel";
import { TeacherModel } from "./TeacherModel";

export class StudentTeacherModel extends Model {
    static table = "student_teachers"
    public static associations: Associations = {
        teachers: { type: "belongs_to", key: 'teacher_id'},
        students: { type: "belongs_to", key: 'student_id'},
    }

    @immutableRelation('teachers', 'teacher_id') teacher!: Relation<TeacherModel>
    @immutableRelation('students', 'student_id') student!: Relation<StudentModel>
}