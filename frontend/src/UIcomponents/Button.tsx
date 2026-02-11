import * as stylex from '@stylexjs/stylex'
import { colors, radius } from '../styles/tokens.stylex'

const styles = stylex.create({
    base: {
        margin: '10px',
        padding: '10px',
        borderRadius: radius.small,
        borderStyle: 'solid',
        borderWidth: '4px',
        outline: 'none',
        textDecoration: 'none',
        transition: 'background-color 0.3s ease',
        alignItems: 'center',
        color: colors.primaryBrown,
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
    },
    full: {
        borderColor: colors.primaryYellow,
        backgroundColor: {
            default: colors.primaryYellow,
            ':hover': colors.secondaryYellow,
        },
    },
    outline: {
        borderColor: {
            default: colors.primaryYellow,
            ':hover': colors.primaryBrown,
        },
        backgroundColor: colors.white,
    },
    small: {
        width: '100px',
    },
    medium: {
        width: '200px',
    },
    large: {
        width: '250px',
    },
})

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'full' | 'outline'
    size?: 'small' | 'medium' | 'large'
    sx?: stylex.StyleXStyles
    as?: any
    to?: string
    children: React.ReactNode
}

export const Button = ({
    variant = 'full',
    size = 'medium',
    sx,
    children,
    as: Component = 'button',
    ...props
}: ButtonProps) => {
    return (
        <Component
            {...stylex.props(styles.base, styles[variant], styles[size], sx)}
            {...props}
        >
            {children}
        </Component>
    )
}
