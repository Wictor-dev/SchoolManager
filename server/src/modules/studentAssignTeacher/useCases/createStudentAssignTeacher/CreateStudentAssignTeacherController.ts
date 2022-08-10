import { Request, Response } from "express";
import { CreateStudentAssignTeacherUseCase } from "./CreateStudentAssignTeacherUseCase";

export class CreateStudentAssignTeacherController {
  async handle(req: Request, res: Response) {
    const { id } = req.params;
    const { teacherId } = req.body;

    const createStudentAssignTeacherUseCase =
      new CreateStudentAssignTeacherUseCase();

    const result = await createStudentAssignTeacherUseCase.execute({
      id,
      teacherId,
    });

    if (Object.keys(result).length > 0) {
      return res.status(201).json(result);
    } else {
      return res.status(500).json("Error! This relation can't be created!");
    }
  }
}
