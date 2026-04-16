import type { UseFormRegister } from 'react-hook-form'
import { z } from 'zod'

export const CreateRequestSchema = z.object({
    category_name: z.string().min(1, 'Category is required'),
    title: z.string().min(1, 'Title is required'),
    description: z
        .string()
        .min(1, 'Description is required')
        .max(500, 'Description must be less than 500 characters'),
    location: z.string().min(1, 'Location is required'),
    event_time: z.string().min(1, 'Event time is required'),
    event_date: z.string().min(1, 'Event date is required'),
    image_url: z.string().url('Invalid image url').optional(),
    contact: z.string().min(1, 'Contact info is required'),
    additional_info: z.string().optional(),
})

export type CreateRequestFormValues = z.infer<typeof CreateRequestSchema>

export type CreateRequestFormProps = {
    type: string
    placeholder: string
    name: keyof CreateRequestFormValues
    register: UseFormRegister<CreateRequestFormValues>
    error?: string
}
