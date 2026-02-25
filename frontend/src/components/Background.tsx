import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'

export const styles = stylex.create({
    background: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        height: '100vh',
        width: '100vw',
    },

    color: {
        color: colors.primaryBlue,
    },

    img: {
        backgroundPosition: 'center',
        backgroundColor: colors.secondaryBlue,
        backgroundImage: 'url(/src/assets/background.png)',
        backgroundSize: 'cover',
    },
})

interface BackgroundProps {
    variant?: 'color' | 'img'
    sx?: stylex.StyleXStyles
    children: React.ReactNode
}

export const Background = ({
    variant = 'color',
    sx,
    children,
}: BackgroundProps) => {
    return (
        <div {...stylex.props(styles.background, styles[variant], sx)}>
            {children}
        </div>
    )
}
