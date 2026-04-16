import { ThanksPage } from '../components/ThanksPage'
import { useNavigate } from 'react-router-dom'

export default function Unauthorized() {
    const navigate = useNavigate()
    const primaryClick = () => {
        void navigate('/auth/login')
    }
    const secondaryClick = () => {
        void navigate('/auth/register')
    }
    return (
        <>
            <ThanksPage
                onPrimaryClick={primaryClick}
                onSecondaryClick={secondaryClick}
                title="You are not authorized"
                description="You need to be logged in to access this page."
                primaryBtnText="Login"
                secondaryBtnText="Register"
            />
        </>
    )
}
