import { Model, Q } from "@nozbe/watermelondb";
import { field, lazy, text, writer } from "@nozbe/watermelondb/decorators";
import { Associations } from "@nozbe/watermelondb/Model";
import { StudentModel } from "./StudentModel";
import { StudentTeacherModel } from "./StudentTeacherModel";

export class TeacherModel extends Model {
  static table = "teachers";
  static associations: Associations = {
    student_teachers: { type: "has_many", foreignKey: "teacher_id" },
  };
  @text("name") name!: string;

  @field("age") age!: number;

  @field("payment") payment!: number;

  @lazy
  students = this.collections
    .get<StudentModel>("students")
    .query(Q.on("student_teachers", "teacher_id", this.id));

  @writer async addTeacher(student: StudentModel) {
    const newStudentTeacher = await this.collections
      .get<StudentTeacherModel>("student_teachers")
      .create((studentRelationTeacher) => {
        studentRelationTeacher.teacher.set(this);
        studentRelationTeacher.student.set(student);
      });   
    return newStudentTeacher;
  }
}
