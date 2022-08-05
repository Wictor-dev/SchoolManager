import { Request, Response} from "express"
import { SyncPullTeachersCase } from "./SyncPullTeachersCase"

export class SyncPullTeachersController {
    async handle(req: Request, res: Response) {
        const { lastPulledVersion } = req.query

        const syncTeachersUseCase = new SyncPullTeachersCase()

        const teachers = await syncTeachersUseCase.execute(Number(lastPulledVersion))

        return res.status(201).json({
            latestVersion: new Date().getTime(),
            changes: {
                teachers
            }
        })
    }
}