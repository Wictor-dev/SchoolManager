import { Router } from "express";
import { SyncCreateStudentAssignTeacherController } from "../modules/studentAssignTeacher/useCases/createStudentAssignTeacher/SyncCreateStudentAssignTeacherController";

const studentTeacherRoutes = Router();

const syncCreateStudentAssignTeacherController =
  new SyncCreateStudentAssignTeacherController();

studentTeacherRoutes.post(
  "/sync/",
  syncCreateStudentAssignTeacherController.handle
);

export { studentTeacherRoutes };
