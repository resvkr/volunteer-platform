import { ThanksPage } from '../../components/ThanksPage'
import { useNavigate } from 'react-router-dom'

export default function ThanksRequestPage() {
    const navigate = useNavigate()
    const primaryClick = () => {
        void navigate('/requests/create')
    }
    const secondaryClick = () => {
        void navigate('/user/dashboard')
    }
    return (
        <>
            <ThanksPage
                onPrimaryClick={primaryClick}
                onSecondaryClick={secondaryClick}
                title="Thanks for your request!"
                description="Your request has been submitted successfully."
                primaryBtnText="Create Another Request"
                secondaryBtnText="View Dashboard"
            />
        </>
    )
}
