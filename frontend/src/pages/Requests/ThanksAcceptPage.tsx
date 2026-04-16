import { ThanksPage } from '../../components/ThanksPage'
import { useNavigate } from 'react-router-dom'

export default function ThanksAccept() {
    const navigate = useNavigate()
    const primaryClick = () => {
        void navigate('/requests/create')
    }
    const secondaryClick = () => {
        void navigate('/volunteer/dashboard')
    }
    return (
        <>
            <ThanksPage
                onPrimaryClick={primaryClick}
                onSecondaryClick={secondaryClick}
                title="Thanks for accepting the request!"
                description="Connect with the requester as soon as possible to provide the help they need."
                primaryBtnText="Create Your Own Request"
                secondaryBtnText="View Dashboard"
            />
        </>
    )
}
