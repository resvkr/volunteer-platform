import { Icon } from './Icon'
import * as stylex from '@stylexjs/stylex'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { colors } from '../styles/tokens.stylex'

export function Home() {
    const navigate = useNavigate()

    const user = useAuthStore((state) => state.user)

    const handleHomeClick = () => {
        if (!user) {
            console.log('NotAuthorised')
            void navigate('/unauthorized')
            return
        }
        if (user.role === 'VOLUNTEER') {
            void navigate('/volunteer/dashboard')
        } else if (user.role === 'USER') {
            void navigate('/user/dashboard')
        } else {
            void navigate('/unauthorized')
        }
    }
    return (
        <div {...stylex.props(styles.iconWrapper)} onClick={handleHomeClick}>
            <Icon iconName="fa-house" variant="yellow" />
        </div>
    )
}

const styles = stylex.create({
    iconWrapper: {
        borderRadius: '50%',

        transition: 'all 0.3s ease-in-out',
        alignItems: 'center',

        color: colors.secondaryYellow,
        cursor: 'pointer',
        display: 'flex',
        filter: {
            default: 'drop-shadow(0 0 0px transparent)',
            ':hover': `drop-shadow(0 0 12px ${colors.primaryYellow})`,
        },
        justifyContent: 'center',
        position: 'fixed',
        textAlign: 'right',
        transform: {
            default: 'scale(1)',
            ':hover': 'scale(1.1) translateY(-2px)',
        },

        zIndex: 1000,
        right: '20px',
        top: '20px',
    },
})
