import { Request, Response} from "express"
import { UpdateTeacherUseCase } from "./UpdateTeacherUseCase"

export class UpdateTeacherController {
    async handle(req: Request, res: Response) {
        const { name, age, payment } = req.body
        const {id} = req.params

        const updateTeacherUseCase = new UpdateTeacherUseCase()

        const result = await updateTeacherUseCase.execute({id, name, age, payment})

        return res.status(201).json(result)
    }
}