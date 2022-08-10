import { Request, Response} from "express"
import { SyncPullStudentAssignTeacherCase } from "./SyncPullStudentAssignTeacherCase"
export class SyncPullStudentAssignTeacherController {
    async handle(req: Request, res: Response) {
        const { lastPulledVersion } = req.query

        const syncStudentAssignTeacherUseCase = new SyncPullStudentAssignTeacherCase()

        const student_teachers = await syncStudentAssignTeacherUseCase.execute(Number(lastPulledVersion))
        // console.log({student_teachers})
        return res.status(201).json({
            latestVersion: new Date().getTime(),
            changes: {
                student_teachers
            }
        })
    }
}