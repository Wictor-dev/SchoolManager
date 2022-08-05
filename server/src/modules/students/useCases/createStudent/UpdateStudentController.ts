import { CreateStudentUseCase } from "./CreateStudentUseCase"
import { Request, Response} from "express"
import { UpdateStudentUseCase } from "./UpdateStudentUseCase"

export class UpdateStudentController {
    async handle(req: Request, res: Response) {
        const { name, registration } = req.body
        const {id} = req.params

        const updateStudentUseCase = new UpdateStudentUseCase()

        const result = await updateStudentUseCase.execute({id, name, registration})

        return res.status(201).json(result)
    }
}