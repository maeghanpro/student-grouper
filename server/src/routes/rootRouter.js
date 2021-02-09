import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import classSectionsRouter from "./api/v1/classSectionsRouter.js";
import studentsRouter from "./api/v1/studentsRouter.js";

const rootRouter = new express.Router();
rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/classes", classSectionsRouter);
rootRouter.use("/api/v1/students", studentsRouter);

export default rootRouter;
