import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        firstname: string({
            required_error: "First Name is required"
        }),
        lastname: string({
            required_error: "Last Name is required"
        }),
        password: string({
            required_error: "Password is required"
        }).min(6, "Password is too short - Should be min 6 chars"),
        passwordConfirmation: string({
            required_error: "Password Confirmation is required"
        }),
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email address"),
    }).refine(data => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    })
})

export const verifyUserSchema = object({
    params: object({
        id: string(),
        verificationCode: string()
    })
})

export const forgotPasswordSchema = object({
    body: object({ 
        email: string({
            required_error: "Email is required"
        }).email("Not a valid email")
    }),
})

export type CreateUserInput = TypeOf<typeof createUserSchema>['body'];
export type VerifyUserInput = TypeOf<typeof verifyUserSchema>['params'];
export type ForgotPasswordInput = TypeOf<typeof forgotPasswordSchema>['body'];
