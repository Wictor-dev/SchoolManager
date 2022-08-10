import { Request, Response } from "express";
import { SyncCreateTeacherUseCase } from "./SynCreateTeacherUseCase";

export class SyncCreateTeacherController {
  async handle(req: Request, res: Response) {
    if (req.body.created.length > 0) {
      const { id, name, age, payment } = req.body.created[0];
      const { lastPulledVersion } = req.query;
      const createTeacherUseCase = new SyncCreateTeacherUseCase();

      try {
        const result = await createTeacherUseCase.execute({
          id,
          name,
          age,
          payment,
          lastPulledVersion: Number(lastPulledVersion),
        });
        return res.status(201).json(result);
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
