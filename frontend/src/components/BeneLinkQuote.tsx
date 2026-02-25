import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'

const fadeInUp = stylex.keyframes({
    '0%': {
        filter: 'blur(10px)',
        opacity: 0,
        transform: 'translateY(30px) scale(0.98)',
    },
    '100%': {
        filter: 'blur(0)',
        opacity: 1,
        transform: 'translateY(0) scale(1)',
    },
})

const glow = stylex.keyframes({
    '0%': { textShadow: '0 0 10px rgba(126, 140, 196, 0.2)' },
    '50%': { textShadow: '0 0 20px rgba(126, 140, 196, 0.5)' },
    '100%': { textShadow: '0 0 10px rgba(126, 140, 196, 0.2)' },
})

export const BeneLinkQuote = () => {
    return (
        <section {...stylex.props(styles.container)}>
            <div {...stylex.props(styles.card)}>
                <p {...stylex.props(styles.text)}>
                    Introducing{' '}
                    <span {...stylex.props(styles.brand)}>BénéLink</span> – the
                    app that brings volunteering closer to you! Easily find
                    meaningful tasks, lend a helping hand where it’s needed, and
                    make a difference every day.
                </p>
            </div>
        </section>
    )
}

const styles = stylex.create({
    container: {
        overflow: 'hidden',
        paddingBlock: '60px',
        paddingInline: '20px',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        borderColor: '#EEF0F7',
        borderRadius: '32px',

        borderStyle: 'solid',

        borderWidth: '1px',

        paddingBlock: '40px',

        paddingInline: '60px',

        transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease',
        animationDuration: '1.2s',
        animationFillMode: 'forwards',
        animationName: fadeInUp,
        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        backgroundColor: colors.white,
        boxShadow: {
            default: '0 3px 5px 0 rgba(46, 68, 73, 0.6)',

            ':hover': '0px 20px 40px rgba(0, 0, 0, 0.4)',
        },
        textAlign: 'center',
        maxWidth: '1000px',
        width: '100%',
    },
    text: {
        margin: 0,
        color: colors.primaryBrown,
        fontFamily: 'sans-serif',
        fontSize: '22px',
        fontWeight: 400,
        lineHeight: 1.6,
    },
    brand: {
        animationDuration: '3s',

        animationIterationCount: 'infinite',

        animationName: glow,

        animationTimingFunction: 'ease-in-out',
        color: colors.secondaryBlue,
        display: 'inline-block',
        fontWeight: 800,
    },
})
