import { Router } from 'express'
import { CreateTeacherController } from '../modules/teachers/useCases/createTeacher/CreateTeacherController'
import { SyncCreateTeacherController } from '../modules/teachers/useCases/createTeacher/SyncCreateTeacherController'
import { UpdateTeacherController } from '../modules/teachers/useCases/createTeacher/UpdateTeacherController'

const teachersRoutes = Router()

const createTeacherController = new CreateTeacherController()
const updateTeacherController = new UpdateTeacherController()
const syncCreateTeacherController = new SyncCreateTeacherController()

teachersRoutes.post('/', createTeacherController.handle)
teachersRoutes.put('/:id', updateTeacherController.handle)
teachersRoutes.post('/sync', syncCreateTeacherController.handle)

export { teachersRoutes }
