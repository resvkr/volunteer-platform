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

export default function Footer() {
    return (
        <footer {...stylex.props(styles.footerWrapper)}>
            <div {...stylex.props(styles.footerContent)}>
                <div {...stylex.props(styles.thanksBlock)}>
                    <p {...stylex.props(styles.thanksText)}>
                        <span {...stylex.props(styles.iconWrapper)}>
                            <Icon
                                variant="yellow"
                                size="small"
                                iconName="fa-regular fa-heart"
                            />
                        </span>
                        Thanks for sticking around
                        <span {...stylex.props(styles.iconWrapper)}>
                            <Icon
                                variant="yellow"
                                size="small"
                                iconName="fa-regular fa-heart"
                            />
                        </span>
                    </p>
                </div>

                <div {...stylex.props(styles.socialSection)}>
                    <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noreferrer"
                        {...stylex.props(styles.socialLink)}
                    >
                        <Icon
                            variant="yellow"
                            size="small"
                            iconName="fa-brands fa-facebook-f"
                        />
                    </a>
                    <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noreferrer"
                        {...stylex.props(styles.socialLink)}
                    >
                        <Icon
                            variant="yellow"
                            size="small"
                            iconName="fa-brands fa-instagram"
                        />
                    </a>
                    <a
                        href="https://telegram.org"
                        target="_blank"
                        rel="noreferrer"
                        {...stylex.props(styles.socialLink)}
                    >
                        <Icon
                            variant="yellow"
                            size="small"
                            iconName="fa-brands fa-telegram"
                        />
                    </a>
                    <a
                        href="https://twitter.com"
                        target="_blank"
                        rel="noreferrer"
                        {...stylex.props(styles.socialLink)}
                    >
                        <Icon
                            variant="yellow"
                            size="small"
                            iconName="fa-brands fa-twitter"
                        />
                    </a>
                </div>
            </div>
        </footer>
    )
}

const styles = stylex.create({
    iconWrapper: {
        margin: '5px',
        animationDuration: '2s',

        animationIterationCount: 'infinite',

        animationName: heartBeat,

        animationTimingFunction: 'ease-in-out',

        display: 'inline-block',
        verticalAlign: 'middle',
    },
    footerWrapper: {
        paddingBlock: '20px',

        alignItems: 'center',
        backgroundColor: '#7D8CC4',

        display: 'flex',

        justifyContent: 'center',
        width: '100%',
    },
    footerContent: {
        alignItems: 'center',
        display: 'flex',

        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '1200px',
        width: '100%',
    },
    thanksBlock: {
        paddingBlock: '10px',
        paddingInline: '0',
    },
    thanksText: {
        margin: 0,

        gap: '10px',
        alignItems: 'center',

        color: colors.primaryYellow,
        display: 'flex',
        fontSize: '32px',
        fontWeight: 'bold',
        whiteSpace: 'nowrap',
    },
    socialSection: {
        gap: '15px',

        alignItems: 'center',
        display: 'flex',
    },
    socialLink: {
        textDecoration: 'none',
        transition: 'transform 0.2s ease',
        display: 'flex',
    },
})
