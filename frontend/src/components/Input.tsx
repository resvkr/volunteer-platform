import * as stylex from '@stylexjs/stylex'
import { forwardRef } from 'react'
import { colors, radius } from '../styles/tokens.stylex'

const styles = stylex.create({
    base: {
        padding: '10px',
        borderColor: {
            default: colors.primaryYellow,
            ':hover': colors.primaryBrown,
            ':focus': colors.primaryBrown,
        },
        borderRadius: radius.small,
        borderStyle: 'solid',
        borderWidth: '4px',

        outline: 'none',

        transition: 'border-color 0.3s ease',

        boxSizing: 'border-box',

        color: colors.primaryBrown,

        display: 'flex',

        justifyContent: 'center',
        height: '44px',
    },
    small: { width: '100px' },
    medium: { width: '200px' },
    large: { width: '200px' },
    error: {
        borderColor: 'red',
    },
})

interface InputProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size'
> {
    size?: 'small' | 'medium' | 'large'
    sx?: stylex.StyleXStyles
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ size = 'medium', sx, ...props }, ref) => {
        return (
            <input
                ref={ref}
                {...stylex.props(styles.base, styles[size], sx)}
                {...props}
            />
        )
    }
)
