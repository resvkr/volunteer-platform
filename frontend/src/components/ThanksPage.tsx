import * as stylex from '@stylexjs/stylex'
import { Button } from './Button'
import { Background } from './Background'
import { Icon } from './Icon'

const heartBeat = stylex.keyframes({
    '0%': { opacity: 0.8, transform: 'scale(1)' },
    '14%': { transform: 'scale(1.3)' },
    '28%': { opacity: 0.8, transform: 'scale(1)' },
    '42%': { opacity: 1, transform: 'scale(1.3)' },
    '70%': { opacity: 0.8, transform: 'scale(1)' },
})

const fadeInUp = stylex.keyframes({
    '0%': { opacity: 0, transform: 'translateY(20px)' },
    '100%': { opacity: 1, transform: 'translateY(0px)' },
})

interface ThanksPageProps {
    title?: string
    description?: string
    primaryBtnText?: string
    secondaryBtnText?: string
    onPrimaryClick?: () => void
    onSecondaryClick?: () => void
    icon?: React.ReactNode
}

export const ThanksPage = ({
    title = 'Thanks for sharing',
    description = 'Your post was published successfully.',
    primaryBtnText = 'Create New Post',
    secondaryBtnText = 'Go to Dashboard',
    onPrimaryClick,
    onSecondaryClick,
}: ThanksPageProps) => {
    return (
        <Background variant="color" {...stylex.props(styles.main)}>
            <div {...stylex.props(styles.mainContainer)}>
                <div {...stylex.props(styles.title)}>
                    <div
                        {...stylex.props(
                            styles.mainTitle,
                            styles.entrance,
                            styles.delayFirst
                        )}
                    >
                        <span {...stylex.props(styles.iconWrapper)}>
                            <Icon
                                variant="yellow"
                                size="small"
                                iconName="fa-regular fa-heart"
                            />
                        </span>
                        <h1 {...stylex.props(styles.h1)}>{title}</h1>
                        <span {...stylex.props(styles.iconWrapper)}>
                            <Icon
                                variant="yellow"
                                size="small"
                                iconName="fa-regular fa-heart"
                            />
                        </span>
                    </div>
                    <p
                        {...stylex.props(
                            styles.description,
                            styles.entrance,
                            styles.delaySecond
                        )}
                    >
                        {description}
                    </p>
                </div>
                <div {...stylex.props(styles.delayThird, styles.entrance)}>
                    <Button variant="full" onClick={onPrimaryClick}>
                        {primaryBtnText}
                    </Button>
                    <Button variant="outline" onClick={onSecondaryClick}>
                        {secondaryBtnText}
                    </Button>
                </div>
            </div>
            <div
                {...stylex.props(
                    styles.images,
                    styles.entrance,
                    styles.delayFourth
                )}
            >
                <img
                    src="/src/assets/peace1.png"
                    {...stylex.props(styles.arms)}
                />
                <img
                    src="/src/assets/high_eyes.png"
                    {...stylex.props(styles.img)}
                />
                <img
                    src="/src/assets/peace2.png"
                    {...stylex.props(styles.arms)}
                />
            </div>
        </Background>
    )
}

const styles = stylex.create({
    main: {
        position: 'relative',
    },
    mainContainer: {
        alignItems: 'center',
        display: 'flex',

        flexDirection: 'column',

        justifyContent: 'center',

        position: 'absolute',
        marginTop: '-145px',
    },
    h1: {
        margin: 0,
        color: 'white',
        fontSize: '50px',
    },
    description: {
        color: 'white',
        fontSize: '25px',
    },
    title: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    mainTitle: {
        alignItems: 'center',
        display: 'flex',
    },
    iconWrapper: {
        margin: '5px',

        animationDuration: '2s',

        animationIterationCount: 'infinite',

        animationName: heartBeat,

        animationTimingFunction: 'ease-in-out',

        display: 'inline-block',

        verticalAlign: 'middle',
    },
    arms: {
        height: '320px',
    },
    img: {
        height: '240px',
    },
    images: {
        gap: '60px',
        alignItems: 'end',
        display: 'flex',
        position: 'absolute',
        bottom: 0,
    },
    entrance: {
        animationDuration: '0.8s',

        animationFillMode: 'forwards',
        animationName: fadeInUp,
        opacity: 0,
    },

    delayFirst: { animationDelay: '0.2s' },
    delaySecond: { animationDelay: '0.5s' },
    delayThird: { animationDelay: '0.8s' },
    delayFourth: { animationDelay: '1.1s' },
})
