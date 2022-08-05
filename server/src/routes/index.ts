import { Router } from "express";
import { studentsRoutes } from "./students.routes";
import { teachersRoutes } from "./teachers.routes";
const routes = Router()

routes.use('/students', studentsRoutes )
routes.use('/teachers', teachersRoutes )

export { routes }