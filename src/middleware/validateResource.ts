import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

const mapErrorMessages: any = {
    "firstname": "First Name",
    "lastname": "Last Name",
    "email": "Email",
    "password": "Password",
    "passwordConfirmation": "Password Confirmation",
    "verficationCode": "Verification Code",
    "id": "User id",
}

const validateResource = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: req.body,
            query: req.query,
            params: req.params
        })
        next()
    } catch (err: any) {

        if (err instanceof ZodError) {
            let errorMessages: any = {}
            for (let i = 0; i < err.issues.length; i++) {
                if (err.issues[i].message.includes(getErrorMessageMap(err.issues[i].path[1]))) {
                    err.issues[i].path[1] = `prop${i + 1}`
                }
                errorMessages[err.issues[i].path[1]] = err.issues[i].message
            }
            return res.status(400).send(errorMessages);
        }
    }
}

export default validateResource;

const getErrorMessageMap = (key: any) => {
    return mapErrorMessages[key]
}