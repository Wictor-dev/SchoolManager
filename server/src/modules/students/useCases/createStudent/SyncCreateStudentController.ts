import { Request, Response } from "express";
import { SyncCreateStudentUseCase } from "./SyncCreateStudentUseCase";

export class SyncCreateStudentController {
  async handle(req: Request, res: Response) {
    const syncCreateStudentUseCase = new SyncCreateStudentUseCase();

    if (req.body.created.length > 0) {
      const { id, name, registration } = req.body.created[0];
      const { lastPulledVersion } = req.query;

      try {
        const student = await syncCreateStudentUseCase.execute({
          id: id,
          name: name,
          registration: registration,
          lastPulledVersion: Number(lastPulledVersion),
        });

        return res.status(201).json(student);
      } catch (err: any) {
        return res
          .status(err.statusCode ? err.statusCode : 400)
          .json(err.message);
      }
    } else {
      return res.status(201).json("The data informed is empty!");
    }
  }
}
