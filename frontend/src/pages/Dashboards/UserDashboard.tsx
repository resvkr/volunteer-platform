import { useEffect, useState } from 'react'
import { BeneLinkQuote } from '../../components/BeneLinkQuote'
import { Header } from '../../components/Header'
import { MakeRequestBlock } from '../../components/MakeRequestBlock'
import { Slider } from '../../components/Slider'
import api from '../../api/axios'
import { VolunteerCard } from '../../components/VolunteerCard'
import { BecomeVolunteer } from '../../components/BecomeVolunteer'
import * as stylex from '@stylexjs/stylex'
import { Icon } from '../../components/Icon'
import { colors } from '../../styles/tokens.stylex'
import NewsPreview from '../../components/NewsPreview'
import Footer from '../../components/Footer'
import { NavigateButtons } from '../../components/NavigateButtons'

const heartBeat = stylex.keyframes({
    '0%': { opacity: 0.8, transform: 'scale(1)' },
    '14%': { transform: 'scale(1.3)' },
    '28%': { opacity: 0.8, transform: 'scale(1)' },
    '42%': { opacity: 1, transform: 'scale(1.3)' },
    '70%': { opacity: 0.8, transform: 'scale(1)' },
})

interface Volunteers {
    id: number
    name: string
    firstName: string
    lastName: string
    city: string
    dream: string
    rating: string
    photo: string | null
}

export default function UserDashboard() {
    const [volunteers, setVolunteers] = useState<Volunteers[]>([])

    useEffect(() => {
        const getVolunteers = async () => {
            try {
                const responce = await api.get<Volunteers[]>(
                    `${import.meta.env.VITE_API_URL}/volunteers`
                )
                setVolunteers(responce.data)
            } catch (error) {
                console.log(error)
            }
        }
        void getVolunteers()
    }, [])

    return (
        <>
            <Header />
            <NavigateButtons />
            <BeneLinkQuote />
            <MakeRequestBlock />
            <div {...stylex.props(styles.helpers)}>
                <span {...stylex.props(styles.iconWrapper)}>
                    <Icon
                        variant="blue"
                        size="small"
                        iconName="fa-regular fa-heart"
                    />
                </span>{' '}
                Our Helpers
                <span {...stylex.props(styles.iconWrapper)}>
                    <Icon
                        variant="blue"
                        size="small"
                        iconName="fa-regular fa-heart"
                    />
                </span>{' '}
            </div>
            <Slider
                items={volunteers}
                itemsPerPage={4}
                renderItem={(vol) => (
                    <VolunteerCard
                        id={vol.id}
                        key={vol.id}
                        name={`${vol.firstName}`}
                        avatar={vol.photo || '/default-avatar.png'}
                        rating={vol.rating}
                        city={vol.city}
                    />
                )}
            />
            <BecomeVolunteer />
            <NewsPreview />
            <Footer />
        </>
    )
}

const styles = stylex.create({
    iconWrapper: {
        marginInline: '10px',

        animationDuration: '2s',

        animationIterationCount: 'infinite',

        animationName: heartBeat,

        animationTimingFunction: 'ease-in-out',
        display: 'inline-block',
        verticalAlign: 'middle',
    },
    helpers: {
        alignItems: 'center',

        color: colors.primaryBrown,
        display: 'flex',
        fontSize: '30px',
        justifyContent: 'center',
        height: '100px',
    },
})
