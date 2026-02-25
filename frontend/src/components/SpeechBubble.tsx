import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'

interface SpeechBubbleProps {
    text: string
}
const scale = stylex.keyframes({
    '0%': { transform: 'scale(1.0)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1.0)' },
})
export const SpeechBubble = ({ text }: SpeechBubbleProps) => {
    return (
        <div {...stylex.props(styles.bubble)}>
            <p {...stylex.props(styles.text)}> {text}</p>
        </div>
    )
}

const styles = stylex.create({
    bubble: {
        borderRadius: '40px',

        borderWidth: '40px',

        alignItems: 'center',
        animationDuration: '3s',
        animationIterationCount: 'infinite',
        animationName: scale,
        animationTimingFunction: 'ease-in-out',
        backgroundColor: colors.secondaryBlue,
        color: colors.white,
        display: 'flex',
        flexDirection: 'column',

        justifyContent: 'center',
        position: 'relative',
        height: '300px',
        width: '600px',
        '::after': {
            content: '""',

            position: 'absolute',
            borderLeftColor: 'transparent',
            borderLeftStyle: 'solid',
            borderLeftWidth: '20px',

            borderRightColor: 'transparent',
            borderRightStyle: 'solid',

            borderRightWidth: '20px',

            borderTopColor: '#7E8CC4',

            borderTopStyle: 'solid',

            borderTopWidth: '20px',
            bottom: '-20px',
            left: '40px',
        },
    },
    text: {
        fontSize: '30px',
        textAlign: 'center',
    },
})
