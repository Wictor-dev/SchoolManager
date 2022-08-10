import { Router } from "express";
import { SyncCreateStudentAssignTeacherController } from "../modules/studentAssignTeacher/useCases/createStudentAssignTeacher/SyncCreateStudentAssignTeacherController";
import { SyncPullStudentAssignTeacherController } from "../modules/studentAssignTeacher/useCases/sync/SyncPullStudentAssignTeacherController";

const studentTeacherRoutes = Router();

const syncCreateStudentAssignTeacherController =
  new SyncCreateStudentAssignTeacherController();

const syncStudentAssignTeacherController =
  new SyncPullStudentAssignTeacherController();

studentTeacherRoutes.post(
  "/sync/",
  syncCreateStudentAssignTeacherController.handle
);

studentTeacherRoutes.get(
  "/sync/pull",
  syncStudentAssignTeacherController.handle
);

export { studentTeacherRoutes };
