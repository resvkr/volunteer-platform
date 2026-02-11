import * as stylex from '@stylexjs/stylex'
import { colors, radius } from '../styles/tokens.stylex'

const styles = stylex.create({
    formContainer: {
        borderRadius: radius.medium,
        paddingBlock: '40px',

        paddingInline: '20px',
        alignItems: 'center',
        boxShadow: colors.boxShadow,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        width: '350px',
    },

    white: {
        backgroundColor: colors.white,
    },

    blue: {
        backgroundColor: colors.primaryBlue,
    },
})

interface ContainerProps {
    variant?: 'white' | 'blue'
    children: React.ReactNode
    sx?: stylex.StyleXStyles
}

export const Container: React.FC<ContainerProps> = ({
    children,
    sx,
    variant,
}) => {
    return (
        <div
            {...stylex.props(
                styles.formContainer,
                styles[variant || 'white'],
                sx
            )}
        >
            {children}
        </div>
    )
}
