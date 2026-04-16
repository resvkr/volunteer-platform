import { Input } from './Input'
import type { UseFormRegister, FieldError } from 'react-hook-form'
import * as stylex from '@stylexjs/stylex'

const fieldStyles = stylex.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        maxWidth: '200px',
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

interface FormFieldProps {
    type: string
    placeholder: string
    name: any
    register: UseFormRegister<any>
    multiple?: boolean
    accept?: string
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
    size = 'medium',
}: FormFieldProps) => (
    <div {...stylex.props(fieldStyles.container, sx)}>
        <Input
            type={type}
            placeholder={placeholder}
            {...register(name)}
            size={size}
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
    errorBorder: {
        borderColor: 'red !important',

        marginBottom: '20px',
    },
})

export default FormField
