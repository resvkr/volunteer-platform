import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'
import { Button } from './Button'
import { Icon } from './Icon'
import { useNavigate } from 'react-router-dom'

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
    '50%': { transform: 'translateY(-15px) rotate(-3deg)' },
    '100%': { transform: 'translateY(0) rotate(0deg)' },
})

export const MakeNewsBlock = () => {
    const navigate = useNavigate()
    const handleClick = () => {
        void navigate('/news/create')
    }
    return (
        <section {...stylex.props(styles.container)}>
            <div {...stylex.props(styles.card)}>
                <div {...stylex.props(styles.content)}>
                    <h2 {...stylex.props(styles.title)}>Share Progress</h2>
                    <p {...stylex.props(styles.subtitle)}>
                        Tell the community about your latest activities. Your
                        stories inspire others to join and help those in need.
                    </p>
                    <div {...stylex.props(styles.buttonWrapper)}>
                        <Button
                            variant="full"
                            sx={styles.btnCustom}
                            onClick={handleClick}
                        >
                            Post an Update
                        </Button>
                    </div>
                </div>

                <div {...stylex.props(styles.illustration)}>
                    <div {...stylex.props(styles.iconCircle)}>
                        <Icon
                            iconName="fa-solid fa-bullhorn"
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
        backgroundColor: '#EBEEF6',
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
        boxShadow: colors.secondaryBlue,
        display: 'flex',
        flexDirection: {
            default: 'row',
            '@media (max-width: 900px)': 'column-reverse',
        },
        position: 'relative',
        maxWidth: '1200px',
        width: '100%',
    },
    content: {
        flex: '1.2',
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
        color: 'rgba(255, 255, 255, 0.9)',
        fontSize: '18px',
        lineHeight: 1.6,
        marginBottom: '30px',
        marginTop: '20px',
        maxWidth: '480px',
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
        borderColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: '1px',
        alignItems: 'center',
        animationDuration: '6s',
        animationIterationCount: 'infinite',
        animationName: float,
        animationTimingFunction: 'ease-in-out',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        display: 'flex',
        justifyContent: 'center',
        zIndex: 2,
        height: '200px',
        width: '200px',
    },
    decorBlob: {
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        position: 'absolute',
        zIndex: 1,

        bottom: '-100px',
        height: '350px',
        left: '20px',
        width: '350px',
    },
})
