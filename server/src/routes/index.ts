import { Router } from "express";
import { studentsRoutes } from "./students.routes";
import { studentTeacherRoutes } from "./studentTeachers.routes";
import { syncRoutes } from "./sync.routes";
import { teachersRoutes } from "./teachers.routes";
const routes = Router()

routes.use('/students', studentsRoutes )
routes.use('/teachers', teachersRoutes )
routes.use('/assign', studentTeacherRoutes)
routes.use('/sync', syncRoutes)

export { routes }