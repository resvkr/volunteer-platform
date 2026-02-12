import z from 'zod'
import type { FieldError, UseFormRegister } from 'react-hook-form'

export const UserSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(2, 'Password is too short'),
})

export type FormData = z.infer<typeof UserSchema>

export type ValidFiledNames = keyof FormData

export type LoginFormProps = {
    type: string
    placeholder: string
    name: ValidFiledNames
    register: UseFormRegister<any>
    error?: FieldError | undefined
}
