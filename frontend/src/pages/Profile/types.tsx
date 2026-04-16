import type { FieldError, UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

export const ReviewSchema = z.object({
    rating: z.number().min(1, 'select a rating'),
    comment: z.string().min(1, 'comment is required'),
})

export type FormData = z.infer<typeof ReviewSchema>

export type ValidFiledNames = keyof FormData

export type RegisterFormProps = {
    type: string
    placeholder: string
    name: ValidFiledNames
    register: UseFormRegister<FormData>
    error?: FieldError | undefined
}
