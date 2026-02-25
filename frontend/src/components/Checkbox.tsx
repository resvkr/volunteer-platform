import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'
import { forwardRef } from 'react'

const styles = stylex.create({
    base: {
        borderColor: {
            default: colors.primaryYellow,
            ':hover': colors.primaryBrown,
        },
        borderRadius: '6px',
        borderStyle: 'solid',
        borderWidth: '3px',

        placeContent: 'center',

        transition: 'all 0.2s ease',

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
    },

    checkmark: {
        transition: 'transform 0.2s ease-in-out',

        backgroundColor: 'white',

        clipPath:
            'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)',
        content: '""',

        position: 'absolute',

        transform: 'scale(0)',
        height: '12px',
        width: '12px',
    },
    checkmarkVisible: {
        transform: 'scale(1)',
    },
})

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    sx?: stylex.StyleXStyles
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ sx, checked, ...props }, ref) => {
        return (
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '20px',
                    height: '20px',
                }}
            >
                <input
                    type="checkbox"
                    {...props}
                    ref={ref}
                    checked={checked}
                    {...stylex.props(styles.base, sx)}
                    style={{
                        position: 'absolute',
                        margin: 0,
                        zIndex: 1,
                    }}
                />

                <div
                    {...stylex.props(
                        styles.checkmark,
                        checked && styles.checkmarkVisible
                    )}
                    style={{
                        zIndex: 2,
                        pointerEvents: 'none',
                    }}
                />
            </div>
        )
    }
)

Checkbox.displayName = 'Checkbox'
