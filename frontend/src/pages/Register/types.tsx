import type { FieldError, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

export const UserSchema = z.object({
    firstName: z.string().min(2, 'Name is too short'),
    lastName: z.string().min(2, 'Last name is too short'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password is too short'),
    city: z.string().min(1, 'City is required'),
    isVolunteer: z.boolean(),
    dream: z.string().nullable().optional().or(z.literal('')),
})

export type FormData = z.infer<typeof UserSchema>

export type ValidFieldNames = keyof FormData

export type RegisterFormProps = {
    type: string
    placeholder: string
    name: ValidFieldNames
    register: UseFormRegister<FormData>
    error?: FieldError | undefined
}
