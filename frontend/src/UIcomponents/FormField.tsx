import { Input } from './Input'
import type { UseFormRegister, FieldError } from 'react-hook-form'
import * as stylex from '@stylexjs/stylex'

const fieldStyles = stylex.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
    },
    errorText: {
        color: 'red',
        fontSize: '12px',
        fontWeight: 'bold',
        position: 'absolute',
        bottom: '2px',
        left: '10px',
    },
})

// Універсальний інтерфейс для будь-якої сторінки
interface FormFieldProps {
    type: string
    placeholder: string
    name: string
    register: UseFormRegister<any>
    error?: FieldError
    sx?: stylex.StyleXStyles
    size?: 'small' | 'medium' | 'large'
}

export const FormField = ({
    type,
    placeholder,
    name,
    register,
    error,
    sx,
    size = 'large',
}: FormFieldProps) => (
    <div {...stylex.props(fieldStyles.container, sx)}>
        <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            size={size}
            // Якщо є помилка — додаємо червону рамку (якщо в Input є такий пропс)
            sx={error ? [inputErrorStyles.errorBorder] : undefined}
        />
        {error && (
            <span {...stylex.props(fieldStyles.errorText)}>
                {error.message}
            </span>
        )}
    </div>
)

const inputErrorStyles = stylex.create({
    errorBorder: { borderColor: 'red !important', marginBottom: '20px' },
})

export default FormField
