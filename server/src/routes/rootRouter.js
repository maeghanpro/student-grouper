import express from "express";
import userSessionsRouter from "./api/v1/userSessionsRouter.js";
import usersRouter from "./api/v1/usersRouter.js";
import clientRouter from "./clientRouter.js";
import classSectionsRouter from "./api/v1/classSectionsRouter.js";
import studentsRouter from "./api/v1/studentsRouter.js";
import arrangementsRouter from "./api/v1/arrangementsRouter.js";
import rejectUnauthorizedApiRequest from "../middlewares/rejectUnauthorizedApiRequest.js";

const rootRouter = new express.Router();

rootRouter.use("/", clientRouter);

rootRouter.use("/api/v1/user-sessions", userSessionsRouter);
rootRouter.use("/api/v1/users", usersRouter);
rootRouter.use("/api/v1/classes", rejectUnauthorizedApiRequest, classSectionsRouter);
rootRouter.use("/api/v1/students", rejectUnauthorizedApiRequest, studentsRouter);
rootRouter.use("/api/v1/arrangements", rejectUnauthorizedApiRequest, arrangementsRouter);

export default rootRouter;
