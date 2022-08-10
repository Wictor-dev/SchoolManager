import { Router } from "express";
import { CreateStudentController } from "../modules/students/useCases/createStudent/CreateStudentController";
import { SyncCreateStudentController } from "../modules/students/useCases/createStudent/SyncCreateStudentController";
import { UpdateStudentController } from "../modules/students/useCases/createStudent/UpdateStudentController";
import { ListStudentsController } from "../modules/students/useCases/listStudents/ListStudentsController";
import { CreateStudentAssignTeacherController } from "../modules/studentAssignTeacher/useCases/createStudentAssignTeacher/CreateStudentAssignTeacherController";

const createStudentController = new CreateStudentController();
const updateStudentController = new UpdateStudentController();
const syncStudentController = new SyncCreateStudentController();
const listStudentsController = new ListStudentsController();
const createStudentAssignTeacherController =
  new CreateStudentAssignTeacherController();

const studentsRoutes = Router();

studentsRoutes.post("/", createStudentController.handle);
studentsRoutes.get("/", listStudentsController.handle);
studentsRoutes.put("/:id", updateStudentController.handle);
studentsRoutes.put("/assign/:id", createStudentAssignTeacherController.handle);

studentsRoutes.post("/sync", syncStudentController.handle);

export { studentsRoutes };
