import { Model, Q } from "@nozbe/watermelondb";
import { field, lazy, text, writer } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import { StudentTeacherModel } from "./StudentTeacherModel";
import { TeacherModel } from "./TeacherModel";

export class StudentModel extends Model {
    static table = 'students'
    static associations: Associations = {
        student_teachers: { type: "has_many", foreignKey: "student_id"}
    }
    @text('name') name!: string

    @text('registration') registration!: string

    @lazy
    teachers = this.collections
        .get<TeacherModel>('teachers')
        .query(Q.on('student_teachers', 'student_id',this.id))

    @writer async addTeacher(teacher: TeacherModel){
        const newStudentTeacher = await this.collections.get<StudentTeacherModel>('student_teachers').create(studentRelationTeacher => {
            studentRelationTeacher.student.set(this)
            studentRelationTeacher.teacher.set(teacher)
        })
        return newStudentTeacher
    }
}