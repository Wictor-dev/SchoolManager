import { Router } from 'express'
import { CreateTeacherController } from '../modules/teachers/useCases/createTeacher/CreateTeacherController'
import { SyncCreateTeacherController } from '../modules/teachers/useCases/createTeacher/SyncCreateTeacherController'
import { UpdateTeacherController } from '../modules/teachers/useCases/createTeacher/UpdateTeacherController'
import { SyncPullTeachersController } from '../modules/teachers/useCases/sync/SyncPullTeachersController'

const teachersRoutes = Router()

const createTeacherController = new CreateTeacherController()
const updateTeacherController = new UpdateTeacherController()
const syncCreateTeacherController = new SyncCreateTeacherController()
const syncPullTeachersController = new SyncPullTeachersController()

teachersRoutes.post('/', createTeacherController.handle)
teachersRoutes.put('/:id', updateTeacherController.handle)
teachersRoutes.post('/sync', syncCreateTeacherController.handle)
teachersRoutes.get("/sync/pull", 
    syncPullTeachersController.handle
)

export { teachersRoutes }
