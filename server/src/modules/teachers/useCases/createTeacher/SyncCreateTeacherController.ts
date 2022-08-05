
import { Request, Response} from "express"
import { SyncCreateTeacherUseCase } from "./SynCreateTeacherUseCase"

export class SyncCreateTeacherController {
    async handle(req: Request, res: Response) {
        const { id, name, age, payment } = req.body.created[0]

        const createTeacherUseCase = new SyncCreateTeacherUseCase()

        const result = await createTeacherUseCase.execute({id, name, age, payment})

        return res.status(201).json(result)
    }
}