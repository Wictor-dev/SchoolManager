import { Request, Response } from "express";
import { ListStudentUseCase } from "./ListStudentsUseCase";

export class ListStudentsController {
    async handle(req: Request, res: Response) {
        const listStudentUseCase = new ListStudentUseCase();

        const students = await listStudentUseCase.execute()

        return res.status(201).json({students})
    }
}