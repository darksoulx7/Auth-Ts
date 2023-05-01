import { CreateUserInput } from './../schema/user.schema';
import { Request, Response } from "express";
import { createUser } from '../service/user.service';
import sendEmail from '../utils/mailer';

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;

    try {
        const user = await createUser(body);
        await sendEmail({
            from: 'awesomefakeemail@example.com',
            to: user.email,
            subject: "Please Verify your acccount",
            text: `verification code ${user.verificationCode}. Id: ${user._id}`,

        });
        return res.send("User successfully created");
    } catch (e: any) {
        if (e.code === 11000) {
            return res.status(409).send("Account already exists");
        }

        return res.status(500).send(e);
    }
}