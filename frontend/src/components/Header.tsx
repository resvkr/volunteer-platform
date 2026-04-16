import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'
import { Logo } from './Logo'

interface HeaderProps {
    sx?: stylex.StyleXStyles
}

const slideLeft = stylex.keyframes({
    from: { opacity: 0, transform: 'translateX(-50%)' },
    to: { opacity: 1, transform: 'translateX(0)' },
})

const slideRight = stylex.keyframes({
    from: { opacity: 0, transform: 'translateX(50%)' },
    to: { opacity: 1, transform: 'translateX(0)' },
})

export const Header = ({ sx }: HeaderProps) => {
    return (
        <header {...stylex.props(styles.base, sx)}>
            <div {...stylex.props(styles.logoContainer)}>
                <span {...stylex.props(styles.logoText, styles.bene)}>
                    Béné
                </span>
                <Logo size="large" sx={styles.logoImg} />
                <span {...stylex.props(styles.logoText, styles.link)}>
                    Link
                </span>
            </div>
        </header>
    )
}

const styles = stylex.create({
    base: {
        overflow: 'hidden',

        paddingInline: '40px',

        transition: 'all 0.3s ease',

        alignItems: 'center',

        backgroundColor: colors.secondaryBlue,

        display: 'flex',

        justifyContent: 'space-between',
        position: 'relative',
        height: '200px',
        width: '100%',
    },
    logoContainer: {
        gap: '280px',

        alignItems: 'center',
        display: 'flex',
        position: 'absolute',

        transform: 'translateX(-50%)',

        zIndex: 10,
        bottom: '-20px',
        left: '50%',
    },
    logoText: {
        color: colors.primaryBlue,

        fontSize: '100px',
    },
    logoImg: {
        position: 'absolute',

        transform: 'translateX(-50%)',
        bottom: '20px',

        height: '150px',
        left: '50%',
        width: 'auto',
    },
    link: {
        animationDuration: '3s',
        animationName: slideRight,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
        marginRight: '45px',
    },
    bene: {
        animationDuration: '3s',

        animationName: slideLeft,
        animationTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
    },
})
