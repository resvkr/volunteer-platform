import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'
import { Icon } from './Icon'

const heartBeat = stylex.keyframes({
    '0%': { opacity: 0.8, transform: 'scale(1)' },
    '14%': { transform: 'scale(1.3)' },
    '28%': { opacity: 0.8, transform: 'scale(1)' },
    '42%': { opacity: 1, transform: 'scale(1.3)' },
    '70%': { opacity: 0.8, transform: 'scale(1)' },
})

export const QuoteBlock = () => {
    return (
        <section {...stylex.props(styles.container)}>
            <div {...stylex.props(styles.card)}>
                <p {...stylex.props(styles.text)}>
                    <span {...stylex.props(styles.iconWrapper)}>
                        <Icon
                            variant="blue"
                            size="small"
                            iconName="fa-regular fa-heart"
                        />
                    </span>{' '}
                    Volunteering is the ultimate expression of human
                    sovereignty.{' '}
                    <span {...stylex.props(styles.iconWrapper)}>
                        <Icon
                            variant="blue"
                            size="small"
                            iconName="fa-regular fa-heart"
                        />
                    </span>
                    <br />
                    <span {...stylex.props(styles.subText)}>
                        It is the conscious decision to tilt the axis of the
                        world toward empathy, proving that our greatest power
                        lies not in what we accumulate for ourselves, but in the
                        deliberate fragments of time and soul we gift to the
                        collective hope of strangers.
                    </span>
                </p>
            </div>
        </section>
    )
}

const styles = stylex.create({
    container: {
        overflow: 'hidden',
        paddingBlock: '40px',
        paddingInline: '20px',
        backgroundColor: '#F8F9FD',
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
        fontWeight: 600,
        lineHeight: 1.6,
    },
    subText: {
        display: 'inline-block',
        fontSize: '18px',
        fontWeight: 400,
        opacity: 0.9,
        marginTop: '10px',
    },
    iconWrapper: {
        marginInline: '5px',

        animationDuration: '2s',

        animationIterationCount: 'infinite',

        animationName: heartBeat,

        animationTimingFunction: 'ease-in-out',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
})
