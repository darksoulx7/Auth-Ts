import express from "express";
import { createUserHandler, forgotPasswordHandler, verfiyUserHandler, resetPasswordHandler, getCurrentUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource";
import { createUserSchema, verifyUserSchema, forgotPasswordSchema, resetPasswordSchema } from "../schema/user.schema";
import requireUser from "../middleware/requireUser";

const router = express.Router();

router.post('/users', validateResource(createUserSchema), createUserHandler)
router.post('/users/verify/:id/:verificationCode', validateResource(verifyUserSchema), verfiyUserHandler)
router.post('/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler)
router.post("/api/users/resetpassword/:id/:passwordResetCode", validateResource(resetPasswordSchema), resetPasswordHandler);
router.get("/api/users/me", requireUser, getCurrentUserHandler);

export default router