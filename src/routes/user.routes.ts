import express from "express";
import { createUserHandler, forgotPasswordHandler, verfiyUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema, verifyUserSchema, forgotPasswordSchema } from "../schema/user.schema";

const router = express.Router();

router.post('/users', validateResource(createUserSchema), createUserHandler)
router.post('/users/verify/:id/:verificationCode', validateResource(verifyUserSchema), verfiyUserHandler)
router.post('/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler)

export default router;