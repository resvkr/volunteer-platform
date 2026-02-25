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
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',

        alignItems: 'center',
        boxShadow: {
            default: 'none',
            ':hover': '0 3px 5px 0 rgba(0,0,0,0.6)',
        },

        color: colors.primaryBrown,

        cursor: 'pointer',

        display: 'flex',

        justifyContent: 'center',
        scale: {
            default: 1.0,
            ':hover': 1.01,
        },
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

    fullBlue: {
        borderColor: colors.secondaryBlue,

        backgroundColor: {
            default: colors.secondaryBlue,
            ':hover': colors.white,
        },
        color: {
            default: colors.white,
            ':hover': colors.secondaryBlue,
        },
    },

    outlineBlue: {
        borderColor: colors.secondaryBlue,
        backgroundColor: {
            default: colors.white,
            ':hover': colors.secondaryBlue,
        },
        color: {
            default: colors.secondaryBlue,
            ':hover': colors.white,
        },
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
    variant?: 'full' | 'outline' | 'outlineBlue' | 'fullBlue'
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
