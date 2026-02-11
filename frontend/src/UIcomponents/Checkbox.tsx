import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
    base: {
        borderColor: {
            default: colors.primaryYellow,
            ':hover': colors.primaryBrown,
            ':focus': colors.primaryBrown,
        },
        borderRadius: '6px',

        borderStyle: 'solid',

        borderWidth: '3px',

        placeContent: 'center',

        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',

        appearance: 'none',

        backgroundColor: {
            default: 'transparent',
            ':checked': colors.primaryYellow,
        },

        cursor: 'pointer',

        display: 'grid',

        position: 'relative',
        height: '20px',
        width: '20px',

        '::before': {
            transition: 'transform 0.2s ease-in-out',
            backgroundColor: 'white',

            clipPath:
                'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)',
            content: '""',
            transform: 'scale(0)',
            height: '12px',
            width: '12px',
        },
    },

    checked: {
        borderColor: colors.primaryYellow,
        backgroundColor: colors.primaryYellow,
        '::before': {
            transform: 'scale(1)',
        },
    },
})

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'base' | 'checked'
    sx?: stylex.StyleXStyles
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ variant = 'base', sx, ...props }, ref) => {
        return (
            <input
                type="checkbox"
                {...props}
                ref={ref}
                {...stylex.props(
                    styles.base,
                    variant === 'checked' && styles.checked,
                    sx
                )}
            />
        )
    }
)

Checkbox.displayName = 'Checkbox'
