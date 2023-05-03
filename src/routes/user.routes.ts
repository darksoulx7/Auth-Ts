import express from "express";
import { createUserHandler, verfiyUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema, verifyUserSchema } from "../schema/user.schema";

const router = express.Router();

router.post('/users', validateResource(createUserSchema), createUserHandler)
router.post('/users/verify/:id/:verificationCode', validateResource(verifyUserSchema), verfiyUserHandler)

export default router;