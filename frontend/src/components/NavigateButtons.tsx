import { useAuthStore } from '../store/authStore'
import { useNavigate } from 'react-router-dom'
import * as stylex from '@stylexjs/stylex'
import { Icon } from './Icon'
import { colors } from '../styles/tokens.stylex'

export const NavigateButtons = () => {
    const logOut = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.user)
    const navigate = useNavigate()

    const handleProfileClick = () => {
        if (user?.sub) {
            void navigate(`/profile/${user.sub}`)
        } else {
            void navigate(`/unauthorized`)
        }
    }

    const handleHandClick = () => {
        if (user?.sub) {
            void navigate(`/requests/${user.sub}`)
        } else {
            void navigate(`/unauthorized`)
        }
    }

    return (
        <div {...stylex.props(styles.navigateButtons)}>
            <div {...stylex.props(styles.iconWrapper)} onClick={logOut}>
                <Icon
                    variant="yellow"
                    size="medium"
                    iconName="fa-solid fa-arrow-right-from-bracket"
                />
            </div>
            <div
                onClick={handleHandClick}
                {...stylex.props(styles.iconWrapper)}
            >
                <Icon
                    variant="yellow"
                    size="medium"
                    iconName="fa-regular fa-hand-holding-heart"
                />
            </div>
            <div
                onClick={handleProfileClick}
                {...stylex.props(styles.iconWrapper)}
            >
                <Icon
                    variant="yellow"
                    size="medium"
                    iconName="fa-regular fa-circle-user"
                />
            </div>
        </div>
    )
}

const styles = stylex.create({
    navigateButtons: {
        gap: '20px',

        alignSelf: 'flex-start',

        display: 'flex',

        position: 'fixed',

        zIndex: 10000,

        marginLeft: 'auto',
        marginRight: '50px',

        marginTop: '20px',
        right: 0,
        top: '10px',
    },
    iconWrapper: {
        borderRadius: '50%',

        transition: 'all 0.3s ease-in-out',
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        filter: {
            default: 'drop-shadow(0 0 0px transparent)',
            ':hover': `drop-shadow(0 0 12px ${colors.primaryYellow})`,
        },
        justifyContent: 'center',
        transform: {
            default: 'scale(1)',
            ':hover': 'scale(1.1) translateY(-2px)',
        },
    },
})
