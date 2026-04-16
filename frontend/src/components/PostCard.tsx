import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { Icon } from './Icon'
import { Button } from './Button'
import { colors, radius } from '../styles/tokens.stylex'
import { useNavigate } from 'react-router-dom'

interface Post {
    id: number
    title: string
    description: string
    image_url: string
    location: string
}

export const PostCard = ({ post }: { post: Post }) => {
    const [isHovered, setIsHovered] = useState(false)
    const navigate = useNavigate()

    const handleDetailsClick = () => {
        void navigate(`/requests/details/${post.id}`)
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
            <h3 {...stylex.props(styles.postTitle)}>{post.title}</h3>

            <div {...stylex.props(styles.locationContainer)}>
                <Icon
                    variant="blue"
                    size="small"
                    iconName="fa-regular fa-location-dot"
                />
                {post.location}
            </div>

            {post.image_url && (
                <img
                    src={post.image_url}
                    alt={post.title}
                    {...stylex.props(styles.postImage)}
                />
            )}

            <div
                {...stylex.props(
                    styles.expandedContent,
                    isHovered && styles.expandedContentVisible
                )}
            >
                <p {...stylex.props(styles.description)}>{post.description}</p>
                <Button
                    variant="outlineBlue"
                    onClick={() => handleDetailsClick()}
                >
                    View Details
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
        transition: 'all 0.4s ease',
        alignItems: 'center',
        backgroundColor: colors.primaryYellow,
        boxShadow: colors.boxShadow,
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '320px',
        width: '280px',
    },
    postItemHovered: {
        backgroundColor: colors.white,

        transform: 'translateY(-10px)',

        zIndex: 10,
        height: '470px',
    },
    postImage: {
        borderRadius: '8px',
        backgroundColor: '#ccc',
        display: 'block',

        flexShrink: 0,
        objectFit: 'cover',
        height: '180px',
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
    locationContainer: {
        gap: '5px',

        alignItems: 'center',
        color: colors.primaryBrown,
        display: 'flex',

        flexShrink: 0,
        fontSize: '14px',
        marginBottom: '10px',
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
