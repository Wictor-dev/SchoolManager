import { CreateStudentUseCase } from "./CreateStudentUseCase"
import { Request, Response} from "express"

export class CreateStudentController {
    async handle(req: Request, res: Response) {
        const { name, registration } = req.body

        const createStudentUseCase = new CreateStudentUseCase()

        const result = await createStudentUseCase.execute({name, registration})

        if (Object.keys(result).length > 0){
            return res.status(201).json(result)
        } else {
            return res.status(500).json("Error! Student can't be created!")
        }
    }
}