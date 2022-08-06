import { Request, Response } from "express";
import { CreateStudentAssignTeacherUseCase } from "./CreateStudentAssignTeacherUseCase";

export class CreateStudentAssignTeacherController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { teacherId } = req.body;

    const createStudentAssignTeacherUseCase = new CreateStudentAssignTeacherUseCase();

    const result = await createStudentAssignTeacherUseCase.execute({ id, teacherId });

    return res.status(200).json(result)
  }
}
