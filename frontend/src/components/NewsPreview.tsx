import * as stylex from '@stylexjs/stylex'

import { SpeechBubble } from './SpeechBubble'

import { NewsLink } from './NewsLink'
import { useNavigate } from 'react-router-dom'

const wave = stylex.keyframes({
    '0%': { transform: 'rotate(207deg)' },
    '50%': { transform: 'rotate(195deg) translateY(-10px)' },
    '100%': { transform: 'rotate(207deg)' },
})

export default function NewsPreview() {
    const navigate = useNavigate()

    const handleClick = async () => {
        await navigate('/news/dashboard')
    }
    return (
        <div {...stylex.props(styles.mainContainer)}>
            <div {...stylex.props(styles.upContent)}>
                <SpeechBubble text="Stay in the loop! Check out our latest news and useful content" />
                <div onClick={void handleClick()}>
                    <NewsLink />
                </div>
            </div>

            <div {...stylex.props(styles.monsterContainer)}>
                <img
                    src="/src/assets/high_eyes.png"
                    {...stylex.props(styles.img)}
                />

                <img
                    src="/src/assets/ArmNorm2.png"
                    {...stylex.props(styles.arm)}
                />
            </div>
        </div>
    )
}

const styles = stylex.create({
    mainContainer: {
        overflow: 'hidden',

        backgroundColor: '#CBD1E8',

        position: 'relative',

        height: '700px',

        width: '100%',
    },

    upContent: {
        padding: '30px',

        gap: '50px',

        display: 'flex',

        justifyContent: 'center',

        position: 'relative',

        zIndex: 10,
    },

    monsterContainer: {
        gap: '300px',

        alignItems: 'flex-end',

        display: 'flex',

        pointerEvents: 'none',

        position: 'absolute',

        transform: 'translateX(-50%)',

        bottom: 0,

        left: '50%',

        width: 'auto',
    },

    img: {
        display: 'block',

        zIndex: 2,

        height: 'auto',

        width: '540px',
    },

    arm: {
        animationDuration: '3s',

        animationIterationCount: 'infinite',
        animationName: wave,
        animationTimingFunction: 'ease-in-out',
        position: 'relative',
        transform: 'rotate(207deg)',

        zIndex: 1,

        bottom: '-100px',

        height: 'auto',

        left: '-30px',

        width: '300px',
    },
})
