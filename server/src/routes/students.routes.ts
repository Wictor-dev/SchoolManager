import { Router } from 'express'
import { CreateStudentAssignTeacherController } from '../modules/studentAssignTeacher/useCases/createStudentAssignTeacher/CreateStudentAssignTeacherController'
import { CreateStudentController } from '../modules/students/useCases/createStudent/CreateStudentController'
import { SyncCreateStudentController } from '../modules/students/useCases/createStudent/SyncCreateStudentController'
import { UpdateStudentController } from '../modules/students/useCases/createStudent/UpdateStudentController'
import { ListStudentsController } from '../modules/students/useCases/listStudents/ListStudentsController'
import { SyncPullStudentsController } from '../modules/students/useCases/sync/SyncPullStudentsController'


const createStudentController = new CreateStudentController()
const updateStudentController = new UpdateStudentController()
const syncStudentsController = new SyncPullStudentsController()
const syncStudentController = new SyncCreateStudentController()
const listStudentsController = new ListStudentsController()
const createStudentAssignTeacherController = new CreateStudentAssignTeacherController()

const studentsRoutes = Router()

studentsRoutes.post('/', createStudentController.handle)
studentsRoutes.get('/', listStudentsController.handle)
studentsRoutes.put('/:id', updateStudentController.handle)
studentsRoutes.put('/assign/:id', createStudentAssignTeacherController.handle)

studentsRoutes.get("/sync/pull", 
    syncStudentsController.handle
)

studentsRoutes.post("/sync", syncStudentController.handle)

export { studentsRoutes}

