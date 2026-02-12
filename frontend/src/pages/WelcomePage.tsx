import { Link } from 'react-router-dom'
import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'
import { Button } from '../UIcomponents/Button'
import { Logo } from '../UIcomponents/Logo'
import { Container } from '../UIcomponents/Container'
import { Background } from '../UIcomponents/Background'

export default function WelcomePage() {
    return (
        <Background variant="img">
            <div {...stylex.props(styles.mainContainer)}>
                <Logo size="medium" sx={styles.img} />

                <Container variant="white" sx={styles.buttonGroup}>
                    <h1 {...stylex.props(styles.h1)}>BénéLink</h1>
                    <Button
                        to="/auth/login"
                        as={Link}
                        variant="full"
                        size="medium"
                    >
                        Login
                    </Button>
                    <Button
                        as={Link}
                        to="/auth/register"
                        variant="outline"
                        size="medium"
                    >
                        Register
                    </Button>
                </Container>
            </div>
        </Background>
    )
}

const slideUp = stylex.keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateY(100%)',
    },

    '100%': {
        opacity: 1,
        transform: 'translateY(0)',
    },
})

const styles = stylex.create({
    buttonGroup: {
        zIndex: 2,
    },
    h1: {
        color: colors.secondaryBlue,
    },

    mainContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    img: {
        animationDuration: '0.8s',
        animationName: slideUp,
        zIndex: 1,
    },
})
