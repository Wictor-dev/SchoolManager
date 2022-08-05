import { CreateStudentUseCase } from "./CreateStudentUseCase"
import { Request, Response} from "express"

export class CreateStudentController {
    async handle(req: Request, res: Response) {
        const { name, registration } = req.body

        const createStudentUseCase = new CreateStudentUseCase()

        const result = await createStudentUseCase.execute({name, registration})

        return res.status(201).json(result)
    }
}