import * as stylex from '@stylexjs/stylex'
import { Icon } from './Icon'
import { Button } from './Button'
import { colors } from '../styles/tokens.stylex'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import api from '../api/axios'
import { useState } from 'react'
import { Input } from './Input'

const ICONS = [
    'fa-truck',
    'fa-box',
    'fa-paw',
    'fa-utensils',
    'fa-hands-holding',
    'fa-stethoscope',
    'fa-brain',
    'fa-house-user',
    'fa-leaf',
    'fa-biohazard',
    'fa-laptop-code',
    'fa-car',
    'fa-book-open',
    'fa-users',
    'fa-shapes',
]

const scrollRight = stylex.keyframes({
    from: { transform: 'translateX(-50%)' },
    to: { transform: 'translateX(0)' },
})

const scrollLeft = stylex.keyframes({
    from: { transform: 'translateX(0)' },
    to: { transform: 'translateX(-50%)' },
})

const pulse = stylex.keyframes({
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
    '100%': { transform: 'scale(1)' },
})

export const BecomeVolunteer = () => {
    const doubledIcons = [...ICONS, ...ICONS]
    const navigate = useNavigate()

    const [isStepTwo, setIsStepTwo] = useState(false)
    const [dream, setDream] = useState('')
    const [loading, setLoading] = useState(false)

    const handleButtonClick = async () => {
        if (!isStepTwo) {
            setIsStepTwo(true)
            return
        }

        if (!dream.trim()) {
            alert('Please enter your dream before submitting.')
            return
        }

        try {
            setLoading(true)
            const response = await api.patch('/users/become-volunteer', {
                dream,
            })
            const { access_token } = response.data

            useAuthStore.getState().setAuth(access_token)

            api.defaults.headers.common['Authorization'] =
                `Bearer ${access_token}`
            setTimeout(() => {
                navigate('/become-volunteer/success', { replace: true })
            }, 100)
        } catch (error) {
            console.error('Error becoming volunteer:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div {...stylex.props(styles.base)}>
            <div {...stylex.props(styles.sliderContainer)}>
                <div {...stylex.props(styles.track, styles.animateRight)}>
                    {doubledIcons.map((icon, index) => (
                        <button
                            key={`top-${index}`}
                            {...stylex.props(styles.button)}
                        >
                            <Icon
                                variant="blue"
                                size="medium"
                                iconName={icon}
                            />
                        </button>
                    ))}
                </div>
            </div>
            <div {...stylex.props(styles.content)}>
                <p {...stylex.props(styles.title)}>
                    Your help is{' '}
                    <span {...stylex.props(styles.yellowText)}>Invaluable</span>
                </p>
                <div {...stylex.props(styles.subText)}>
                    {!isStepTwo ? (
                        <p {...stylex.props(styles.description)}>
                            Join our team and start making difference today!
                        </p>
                    ) : (
                        <div style={{ marginBottom: '20px', width: '300px' }}>
                            <Input
                                type="text"
                                placeholder="Tell us about your dream..."
                                value={dream}
                                onChange={(e) => setDream(e.target.value)}
                                style={{
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: `4px solid ${colors.primaryYellow}`,
                                    width: '100%',
                                    outline: 'none',
                                }}
                            />
                        </div>
                    )}
                    <Button
                        onClick={() => void handleButtonClick()}
                        variant="full"
                        size="large"
                        sx={styles.volunteerButton}
                    >
                        {loading
                            ? 'Submitting...'
                            : !isStepTwo
                              ? 'Become a Volunteer'
                              : 'Submit and Join'}
                    </Button>
                </div>
            </div>
            <div {...stylex.props(styles.sliderContainer)}>
                <div {...stylex.props(styles.track, styles.animateLeft)}>
                    {doubledIcons.map((icon, index) => (
                        <button
                            key={`bottom-${index}`}
                            {...stylex.props(styles.button)}
                        >
                            <Icon
                                variant="blue"
                                size="medium"
                                iconName={icon}
                            />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

const styles = stylex.create({
    base: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    title: {
        margin: '30px',
        padding: 0,
        color: colors.secondaryBlue,
        fontSize: 56,
    },
    yellowText: {
        color: colors.primaryYellow,
    },
    subText: {
        alignItems: 'center',

        display: 'flex',

        flexDirection: 'column',

        justifyContent: 'center',
        paddingBottom: '30px',
    },
    description: {
        margin: '20px',
        color: colors.primaryBrown,
        fontSize: '18px',
        lineHeight: 1.6,
    },
    content: {
        alignItems: 'center',
        display: 'flex',

        flexDirection: 'column',
        justifyContent: 'center',
    },
    volunteerButton: {
        animationDuration: '2s',

        animationIterationCount: 'infinite',

        animationName: pulse,
        animationTimingFunction: 'ease-in-out',
    },
    sliderContainer: {
        overflow: 'hidden',
        paddingBlock: '10px',
        backgroundColor: 'white',
        display: 'flex',
        position: 'relative',
        width: '100%',
    },
    track: {
        gap: '20px',

        animationDuration: '40s',
        animationIterationCount: 'infinite',

        animationTimingFunction: 'linear',
        display: 'flex',
        whiteSpace: 'nowrap',
        width: 'max-content',
    },
    animateRight: {
        animationName: scrollRight,
    },
    animateLeft: {
        animationName: scrollLeft,
    },
    button: {
        borderColor: '#CBD1E8',
        borderRadius: '30px',
        borderStyle: 'solid',
        borderWidth: '11px',
        outline: 'none',
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        alignItems: 'center',
        backgroundColor: 'white',
        boxShadow: {
            default: 'none',
            ':hover': '0 3px 15px 0 rgba(0,0,0,0.2)',
        },
        cursor: 'pointer',
        display: 'flex',
        flexShrink: 0,
        justifyContent: 'center',
        height: '85px',
        width: '90px',
    },
})
