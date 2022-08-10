import { Request, Response } from "express";
import { SyncCreateStudentAssignTeacherUseCase } from "./SyncCreateStudentAssignTeacherUseCase";

export class SyncCreateStudentAssignTeacherController {
  async handle(req: Request, res: Response) {
    if (req.body.created.length > 0) {
      const { id, student_id, teacher_id } = req.body.created[0];
      const { lastPulledVersion } = req.query;

      const syncCreateStudentAssignTeacherUseCase =
        new SyncCreateStudentAssignTeacherUseCase();

      try {

        const studentTeacher =
          await syncCreateStudentAssignTeacherUseCase.execute({
            id,
            student_id,
            teacher_id,
            lastPulledVersion: Number(lastPulledVersion),
          });
        return res.status(201).json(studentTeacher);

      } catch (error: any) {

        return res
          .status(error.statusCode ? error.statusCode : 400)
          .json(error.message);
      }
    } else {
      return res.status(201).json("The data informed is empty!");
    }
  }
}
