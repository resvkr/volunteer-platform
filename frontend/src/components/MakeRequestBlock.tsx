import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'
import { Button } from './Button'
import { Icon } from './Icon'

const reveal = stylex.keyframes({
    '0%': {
        filter: 'blur(8px)',
        opacity: 0,
        transform: 'translateY(40px) scale(0.96)',
    },
    '100%': {
        filter: 'blur(0)',
        opacity: 1,
        transform: 'translateY(0) scale(1)',
    },
})

const float = stylex.keyframes({
    '0%': { transform: 'translateY(0) rotate(0deg)' },
    '50%': { transform: 'translateY(-15px) rotate(3deg)' },
    '100%': { transform: 'translateY(0) rotate(0deg)' },
})

export const MakeRequestBlock = () => {
    return (
        <section {...stylex.props(styles.container)}>
            <div {...stylex.props(styles.card)}>
                <div {...stylex.props(styles.content)}>
                    <h2 {...stylex.props(styles.title)}>Need Assistance?</h2>
                    <p {...stylex.props(styles.subtitle)}>
                        Don't hesitate to ask for help. Our community of
                        volunteers is ready to support you with any task, big or
                        small.
                    </p>
                    <div {...stylex.props(styles.buttonWrapper)}>
                        <Button variant="full" sx={styles.btnCustom}>
                            Create a Request
                        </Button>
                    </div>
                </div>

                <div {...stylex.props(styles.illustration)}>
                    <div {...stylex.props(styles.iconCircle)}>
                        <Icon
                            iconName="fa-solid fa-hand-holding-heart"
                            size="large"
                            variant="blue"
                        />
                    </div>
                    <div {...stylex.props(styles.decorBlob)} />
                </div>
            </div>
        </section>
    )
}

const styles = stylex.create({
    container: {
        paddingBlock: '40px',
        paddingInline: '20px',

        backgroundColor: '#CBD1E8',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    card: {
        padding: '60px',

        borderRadius: '40px',

        overflow: 'hidden',

        alignItems: 'center',

        animationDuration: '1s',

        animationFillMode: 'forwards',

        animationName: reveal,

        animationTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
        backgroundColor: colors.secondaryBlue,

        boxShadow: '0 20px 50px rgba(126, 140, 196, 0.3)',

        display: 'flex',

        flexDirection: {
            default: 'row',
            '@media (max-width: 900px)': 'column',
        },

        position: 'relative',
        maxWidth: '1200px',
        width: '100%',
    },
    content: {
        flex: '1',
        zIndex: 2,
    },
    title: {
        margin: 0,
        color: colors.white,
        fontSize: '52px',
        fontWeight: 800,
        letterSpacing: '-0.02em',
    },
    subtitle: {
        color: 'rgba(255, 255, 255, 0.85)',
        fontSize: '18px',

        lineHeight: 1.6,
        marginBottom: '30px',
        marginTop: '20px',
        maxWidth: '450px',
    },
    buttonWrapper: {
        display: 'flex',
    },
    btnCustom: {
        paddingBlock: '16px',
        paddingInline: '40px',

        transition: 'transform 0.2s ease',
        fontSize: '18px',
        transform: {
            default: 'scale(1)',
            ':hover': 'scale(1.05)',
            ':active': 'scale(0.98)',
        },
    },
    illustration: {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
    },
    iconCircle: {
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',

        borderStyle: 'solid',
        borderWidth: '1px',
        alignItems: 'center',

        animationDuration: '5s',

        animationIterationCount: 'infinite',
        animationName: float,

        animationTimingFunction: 'ease-in-out',
        backdropFilter: 'blur(10px)',

        backgroundColor: 'rgba(255, 255, 255, 0.15)',

        display: 'flex',

        justifyContent: 'center',

        zIndex: 2,
        height: '180px',
        width: '180px',
    },
    decorBlob: {
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        position: 'absolute',
        zIndex: 1,
        height: '300px',
        right: '-50px',
        top: '-50px',
        width: '300px',
    },
})
