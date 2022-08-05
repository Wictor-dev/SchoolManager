
import { Request, Response} from "express"
import { CreateTeacherUseCase } from "./CreateTeacherUseCase"

export class CreateTeacherController {
    async handle(req: Request, res: Response) {
        const { name, age, payment } = req.body

        const createTeacherUseCase = new CreateTeacherUseCase()

        const result = await createTeacherUseCase.execute({name, age, payment})

        return res.status(201).json(result)
    }
}