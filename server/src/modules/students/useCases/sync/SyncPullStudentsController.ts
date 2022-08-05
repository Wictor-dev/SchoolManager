import { Request, Response} from "express"
import { SyncPullStudentsCase } from "./SyncPullStudentsCase"

export class SyncPullStudentsController {
    async handle(req: Request, res: Response) {
        const { lastPulledVersion } = req.query

        const syncStudentsUseCase = new SyncPullStudentsCase()

        const students = await syncStudentsUseCase.execute(Number(lastPulledVersion))

        return res.status(201).json({
            latestVersion: new Date().getTime(),
            changes: {
                students
            }
        })
    }
}