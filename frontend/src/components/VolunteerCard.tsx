import * as stylex from '@stylexjs/stylex'
import { colors, radius } from '../styles/tokens.stylex'
import { useState } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import { useNavigate } from 'react-router-dom'

interface VolunteerCardProps {
    id: number
    name: string
    avatar: string
    rating: string | number
    city: string
}

export const VolunteerCard = ({
    id,
    name,
    avatar,
    rating,
    city,
}: VolunteerCardProps) => {
    const [isHovered, setIsHovered] = useState(false)

    const navigate = useNavigate()

    const handleProfileClick = () => {
        void navigate(`/profile/${id}`)
    }
    return (
        <div
            {...stylex.props(
                styles.postItem,
                isHovered && styles.postItemHovered
            )}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <h3 {...stylex.props(styles.postTitle)}>{name}</h3>

            <div {...stylex.props(styles.info)}>
                <div {...stylex.props(styles.icons)}>
                    <Icon
                        variant="blue"
                        size="small"
                        iconName="fa-regular fa-location-dot"
                    />
                    {city}
                </div>
                <div {...stylex.props(styles.icons)}>
                    <Icon
                        variant="blue"
                        size="small"
                        iconName="fa-regular fa-star"
                    />
                    {rating}
                </div>
            </div>

            <img src={avatar} alt={name} {...stylex.props(styles.postImage)} />

            <div
                {...stylex.props(
                    styles.expandedContent,
                    isHovered && styles.expandedContentVisible
                )}
            >
                <Button variant="outlineBlue" onClick={handleProfileClick}>
                    View Profile
                </Button>
            </div>
        </div>
    )
}

const styles = stylex.create({
    postItem: {
        padding: '15px',
        borderColor: {
            default: 'none',
            ':hover': colors.secondaryBlue,
        },
        borderRadius: radius.medium,
        borderStyle: {
            default: 'none',
            ':hover': 'solid',
        },
        borderWidth: {
            default: 'none',
            ':hover': '4px',
        },
        overflow: 'hidden',
        transition: 'all 0.5s cubic-bezier(0.23, 1, 0.32, 1)',
        alignItems: 'center',
        backgroundColor: colors.primaryYellow,
        boxShadow: {
            default: 'none',
            ':hover': '0 3px 5px 0 rgba(0,0,0,0.6)',
        },
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '400px',
        width: '280px',
    },
    postItemHovered: {
        backgroundColor: colors.white,

        transform: 'translateY(-10px)',

        zIndex: 10,
        height: '450px',
    },
    postImage: {
        borderRadius: '8px',
        backgroundColor: '#ccc',
        display: 'block',

        flexShrink: 0,
        objectFit: 'cover',
        height: '250px',
        width: '100%',
    },
    postTitle: {
        overflow: 'hidden',
        WebkitBoxOrient: 'vertical',

        WebkitLineClamp: 2,
        color: colors.secondaryBrown,
        display: '-webkit-box',

        flexShrink: 0,
        fontSize: '18px',
        textAlign: 'center',
        marginBottom: '5px',
    },
    info: {
        gap: '30px',

        alignItems: 'center',
        color: colors.primaryBrown,
        display: 'flex',

        flexShrink: 0,
        fontSize: '14px',
        marginBottom: '10px',
    },
    icons: {
        gap: '5px',

        alignItems: 'flex-end',
        display: 'flex',
        flexShrink: 0,
    },
    expandedContent: {
        overflow: 'hidden',
        transition: 'all 0.4s ease',

        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        opacity: 0,
        maxHeight: 0,
    },
    expandedContentVisible: {
        opacity: 1,
        maxHeight: '150px',
        paddingTop: '15px',
    },
    description: {
        overflow: 'hidden',
        paddingInline: '5px',
        WebkitBoxOrient: 'vertical',
        WebkitLineClamp: 3,
        display: '-webkit-box',
        fontSize: '14px',

        textAlign: 'center',

        textOverflow: 'ellipsis',
        wordBreak: 'break-word',
        marginBottom: '10px',
        maxHeight: '4.5em',
    },
})
