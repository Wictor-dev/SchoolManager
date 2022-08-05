import { Request, Response} from "express"
import { SyncCreateStudentUseCase } from "./SyncCreateStudentUseCase"

export class SyncCreateStudentController {
    async handle(req: Request, res: Response) {
        console.log(req.body)
        
        const syncCreateStudentUseCase = new SyncCreateStudentUseCase()
        
        if (req.body.created.length > 0){
            const { id, name, registration } = req.body.created[0]
            console.log("entrou no if")
            const student = await syncCreateStudentUseCase.execute({id: id, name: name, registration: registration})
    
            return res.status(201).json({student})
        } else {
            console.log("entrou no else")
            return res.status(401).json({message: "Parâmetros inválidos"})
        }
    }
}