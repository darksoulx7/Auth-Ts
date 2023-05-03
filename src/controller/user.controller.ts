import { CreateUserInput, verifyUserInput } from './../schema/user.schema';
import { Request, Response } from "express";
import { createUser, findUserById } from '../service/user.service';
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

export async function verfiyUserHandler(req: Request<verifyUserInput>, res: Response) {
    const id = req.params.id;
    const verificationCode = req.params.verificationCode;
    // find user by id 
    const user = await findUserById(id);

    if (!user) {
        return res.send('Could not find user')
    }

    // check to see if user already verified
    if (user.verified) {
        return res.send('User already verified');
    }

    // check to see if the verification code matches
    if (user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();

        return res.send('User successfully verified');
    }

    return res.send('Could not verify user');

}