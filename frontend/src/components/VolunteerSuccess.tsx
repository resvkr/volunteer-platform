import { ThanksPage } from '../components/ThanksPage'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

export default function VolunteerSuccess() {
    const navigate = useNavigate()
    const userId = useAuthStore((state) => state.user?.sub as string)
    const primaryClick = () => {
        void navigate(`/profile/${userId}`)
    }
    const secondaryClick = () => {
        void navigate('/volunteer/dashboard')
    }
    return (
        <>
            <ThanksPage
                onPrimaryClick={primaryClick}
                onSecondaryClick={secondaryClick}
                title="Congratulations on becoming a volunteer!"
                description="You can now start accepting requests and making a difference in your community."
                primaryBtnText="View your profile"
                secondaryBtnText="View Dashboard"
            />
        </>
    )
}
