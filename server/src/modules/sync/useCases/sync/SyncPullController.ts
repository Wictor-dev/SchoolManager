import { Request, Response } from "express";
import { SyncPullUseCase } from "./SyncPullUseCase";
export class SyncPullController {
  async handle(req: Request, res: Response) {
    const { lastPulledVersion } = req.query;
    console.log({lastPulledVersion, date: new Date(Number(lastPulledVersion))})
    const syncPullUseCase = new SyncPullUseCase();

    const result = await syncPullUseCase.execute(
      Number(lastPulledVersion)
    );

    const {students, teachers, student_teachers} = result
    
    // await new Promise((resolve) => setTimeout(resolve, 1000))
    return res.status(201).json({
      latestVersion: new Date().getTime(),
      changes: {
        students,
        teachers,
        student_teachers
      },
    });
  }
}
