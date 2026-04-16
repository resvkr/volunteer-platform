import { useNavigate } from 'react-router-dom'
import { ThanksPage } from '../../components/ThanksPage'

export default function ThanksNewsPage() {
    const navigate = useNavigate()
    const primaryClick = () => {
        void navigate('/news/create')
    }
    const secondaryClick = () => {
        void navigate('/news/dashboard')
    }
    return (
        <div>
            <ThanksPage
                onPrimaryClick={primaryClick}
                onSecondaryClick={secondaryClick}
            />
        </div>
    )
}
