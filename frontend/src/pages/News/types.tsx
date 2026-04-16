import { z } from 'zod'
import type { FieldError, UseFormRegister, Path } from 'react-hook-form'

const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
]

export const CreateNewsSchema = z.object({
    caption: z
        .string()
        .min(1, 'Can not be empty')
        .max(2200, 'Caption is too long'),

    location: z.string().min(1, 'Location required'),

    photos: z
        .array(z.string().url('Invalid url'))
        .min(1, 'Photo is required')
        .max(10, '10 photos max'),
})

export const CreateNewsFormSchema = z.object({
    caption: z.string().min(1, 'Can not be empty').max(2200),
    location: z.string().min(1, 'Location required'),
    photos: z
        .custom<FileList>()
        .refine((files) => files && files.length > 0, 'Photo is required')
        .refine((files) => files && files.length <= 10, '10 photos max')
        .refine((files) => {
            if (!files) return false
            return Array.from(files).every((file) =>
                ACCEPTED_IMAGE_TYPES.includes(file.type)
            )
        }, 'Only .jpg, .jpeg, .png and .webp formats are supported.'),
})

export type CreatePostDto = z.infer<typeof CreateNewsSchema>
export type CreateNewsFormValues = z.infer<typeof CreateNewsFormSchema>

export type CreateNewsFormProps = {
    type: string
    placeholder: string
    name: Path<CreateNewsFormValues>
    register: UseFormRegister<CreateNewsFormValues>
    error?: FieldError
}
