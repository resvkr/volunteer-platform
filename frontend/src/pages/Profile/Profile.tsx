import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'
import { Background } from '../../components/Background'
import { colors } from '../../styles/tokens.stylex'
import * as stylex from '@stylexjs/stylex'
import { Icon } from '../../components/Icon'
import { Button } from '../../components/Button'
import { useAuthStore } from '../../store/authStore'
import FloatingBackground from '../../components/FloatingBackground'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ReviewSchema } from './types'
import type { FormData } from './types'
import FormField from '../../components/FormField'
import { Home } from '../../components/Home'

interface User {
    id: number
    firstName: string
    lastName: string
    city: string
    photoUrl: string
    bio?: string
    profile?: {
        dream: string | null
        averageRating: string
        reviewCount: number
    }
    receivedReviews?: any[]
}

export default function Profile() {
    const { userId } = useParams()

    const [user, setUser] = useState<User | null>(null)

    const [loading, setLoading] = useState(true)

    const [rating, setRating] = useState(0)

    const [hover, setHover] = useState(0)

    const currentUser = useAuthStore((state) => state.user)

    const isOwnProfile =
        currentUser && String(currentUser.sub) === String(userId)

    const navigate = useNavigate()

    const {
        register,

        handleSubmit,

        setValue,

        reset,

        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(ReviewSchema),

        defaultValues: { rating: 0, comment: '' },
    })

    const onReviewSubmit = async (data: FormData) => {
        try {
            await api.post(`/users/review`, {
                ...data,

                toUserId: Number(userId),
            })

            reset()

            setRating(0)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true)

                const response = await api.get<User>(`/users/profile/${userId}`)

                setUser(response.data)
            } catch (error) {
                console.error('Error fetching user:', error)
            } finally {
                setLoading(false)
            }
        }

        if (userId) {
            getUser()
        } else {
            setLoading(false)
        }
    }, [userId])

    if (loading)
        return (
            <Background variant="img">
                {' '}
                <div style={{ color: 'white' }}>Loading...</div>
            </Background>
        )

    if (!user)
        return (
            <Background variant="img">
                {' '}
                <div style={{ color: 'white' }}>User not found</div>
            </Background>
        )

    return (
        <FloatingBackground variant="white">
            <Home />
            <div {...stylex.props(styles.mainBlock)}>
                <div {...stylex.props(styles.infoBlock)}>
                    <img
                        src={user.photoUrl}
                        alt="avatar"
                        {...stylex.props(styles.avatar)}
                    />

                    <div {...stylex.props(styles.nameAndbio)}>
                        <p {...stylex.props(styles.name)}>
                            {user.firstName} {user.lastName}
                        </p>

                        <div
                            style={{
                                display: 'flex',

                                gap: '20px',

                                marginBottom: '20px',
                            }}
                        >
                            <div
                                style={{
                                    display: 'flex',

                                    gap: '8px',

                                    alignItems: 'baseline',
                                }}
                            >
                                <strong style={{ fontSize: '20px' }}>
                                    City:
                                </strong>

                                <div
                                    style={{
                                        fontFamily: 'Momo',

                                        fontSize: '15px',
                                    }}
                                >
                                    {user.city}{' '}
                                    <Icon
                                        variant="yellow"
                                        size="small"
                                        iconName="fa-location-dot"
                                    />
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',

                                    gap: '8px',

                                    alignItems: 'baseline',
                                }}
                            >
                                <strong style={{ fontSize: '20px' }}>
                                    Rating:
                                </strong>

                                <div
                                    style={{
                                        fontFamily: 'Momo',

                                        fontSize: '15px',
                                    }}
                                >
                                    {user.profile?.averageRating}{' '}
                                    <Icon
                                        variant="yellow"
                                        size="small"
                                        iconName="fa-star"
                                    />
                                </div>
                            </div>

                            <div
                                style={{
                                    display: 'flex',

                                    gap: '8px',

                                    alignItems: 'baseline',
                                }}
                            >
                                <strong style={{ fontSize: '20px' }}>
                                    Reviews count:
                                </strong>

                                <div
                                    style={{
                                        fontFamily: 'Momo',

                                        fontSize: '15px',
                                    }}
                                >
                                    {user.profile?.reviewCount || 0}{' '}
                                    <Icon
                                        variant="yellow"
                                        size="small"
                                        iconName="fa-comment"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <strong style={{ fontSize: '20px' }}>
                                About yourself:
                            </strong>

                            <br />

                            <div
                                style={{ fontFamily: 'Momo', fontSize: '13px' }}
                            >
                                {user.bio || 'Not mentioned'}
                            </div>
                        </div>

                        {user.profile?.dream && (
                            <div style={{ marginTop: '20px' }}>
                                <strong style={{ fontSize: '20px' }}>
                                    Dream:
                                </strong>{' '}
                                <br />
                                <div
                                    style={{
                                        fontFamily: 'Momo',

                                        fontSize: '13px',
                                    }}
                                >
                                    {user.profile.dream}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {isOwnProfile ? (
                <div {...stylex.props(styles.editProfile)}>
                    <Button
                        variant="full"
                        onClick={() => {
                            if (currentUser?.sub) {
                                void navigate(
                                    `/profile/edit/${currentUser.sub}`
                                )
                            }
                        }}
                    >
                        <i
                            className="fa-solid fa-user-pen"
                            style={{ marginRight: '8px' }}
                        ></i>
                        Edit Profile
                    </Button>
                </div>
            ) : (
                <form
                    onSubmit={(e) => {
                        const result = handleSubmit(onReviewSubmit)(e)

                        void result
                    }}
                >
                    <div {...stylex.props(styles.reviews)}>
                        <div
                            style={{
                                display: 'flex',

                                flexDirection: 'column',

                                gap: '10px',
                            }}
                        >
                            <div style={{ gap: '10px', marginRight: '5px' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <i
                                        key={star}
                                        className={
                                            star <= (hover || rating)
                                                ? 'fa-solid fa-star'
                                                : 'fa-regular fa-star'
                                        }
                                        style={{
                                            color: colors.primaryYellow,

                                            cursor: 'pointer',

                                            fontSize: '22px',

                                            transition: 'transform 0.2s',
                                        }}
                                        onClick={() => {
                                            setRating(star)

                                            setValue('rating', star)
                                        }}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    />
                                ))}
                            </div>
                        </div>

                        <FormField
                            type="text"
                            name="comment"
                            placeholder="Share your opinion..."
                            register={register}
                            error={errors.comment}
                            size="large"
                            sx={styles.commentField}
                        />

                        <Button variant="full" type="submit">
                            <i
                                className="fa-regular fa-comment"
                                style={{ marginRight: '8px' }}
                            ></i>
                            Add comment
                        </Button>
                    </div>
                </form>
            )}

            <div {...stylex.props(styles.reviewsContainer)}>
                {user.receivedReviews?.length ? (
                    user.receivedReviews.map((review: any) => {
                        const reviewDate = new Date(
                            review.createdAt
                        ).toLocaleDateString('uk-UA', {
                            year: '2-digit',

                            month: '2-digit',

                            day: '2-digit',
                        })

                        return (
                            <div
                                key={review.id}
                                {...stylex.props(styles.reviewCard)}
                            >
                                {' '}
                                <span {...stylex.props(styles.reviewDate)}>
                                    {reviewDate}
                                </span>
                                <img
                                    src={
                                        review.fromUser.photoUrl ||
                                        '/default-avatar.png'
                                    }
                                    alt={review.fromUser.firstName}
                                    {...stylex.props(styles.reviewAvatar)}
                                />
                                <div
                                    {...stylex.props(styles.reviewTextContent)}
                                >
                                    <p {...stylex.props(styles.reviewAuthor)}>
                                        {review.fromUser.firstName}{' '}
                                        {review.fromUser.lastName}
                                    </p>

                                    <p {...stylex.props(styles.reviewMeta)}>
                                        Rate: {review.rating}/5
                                    </p>

                                    <p {...stylex.props(styles.reviewComment)}>
                                        "{review.comment}"
                                    </p>
                                </div>
                            </div>
                        )
                    })
                ) : (
                    <p {...stylex.props(styles.noReviews)}>No rewievs yet</p>
                )}
            </div>
        </FloatingBackground>
    )
}

const styles = stylex.create({
    mainBlock: {
        borderRadius: '41px',

        backgroundColor: colors.secondaryBlue,
        boxShadow: '0 3px 5px 0 rgba(46, 68, 73, 0.6)',
        color: colors.white,

        marginLeft: '300px',
        marginRight: '300px',
        marginTop: '70px',
    },

    reviews: {
        borderRadius: '30px',
        marginInline: 'auto',
        paddingBlock: '20px',
        paddingInline: '40px',
        alignItems: 'center',
        backgroundColor: colors.secondaryBlue,
        boxShadow: '0 3px 5px 0 rgba(46, 68, 73, 0.6)',
        color: colors.white,
        display: 'flex',
        flexDirection: 'row',
        fontSize: '20px',
        justifyContent: 'space-between',
        marginTop: '30px',
        maxWidth: '840px',
    },

    commentField: {
        maxWidth: '420px',
        width: '100%',
    },

    editProfile: {
        borderRadius: '30px',

        alignItems: 'center',

        backgroundColor: colors.secondaryBlue,

        boxShadow: '0 3px 5px 0 rgba(46, 68, 73, 0.6)',

        color: colors.white,

        display: 'flex',
        justifyContent: 'center',
        height: '70px',
        marginLeft: '300px',
        marginRight: '300px',
        marginTop: '20px',
    },
    reviewsContainer: {
        marginInline: 'auto',

        color: colors.white,
        marginTop: '30px',
        maxWidth: '920px',
    },
    reviewCard: {
        borderRadius: '30px',

        gap: '20px',

        paddingBlock: '15px',

        paddingInline: '25px',

        alignItems: 'center',

        backgroundColor: colors.primaryYellow,

        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',

        color: colors.primaryBrown,

        display: 'flex',

        flexDirection: 'row',
        position: 'relative',
        marginBottom: '15px',
    },
    reviewAvatar: {
        borderRadius: '20px', // Менш скруглені, ніж у картки

        flexShrink: 0, // Щоб фото не стискалося

        objectFit: 'cover',
        height: '70px',
        width: '70px',
    },
    reviewTextContent: {
        gap: '2px', // Щільний текст
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1, // Займає весь вільний простір
    },
    reviewAuthor: {
        margin: 0,

        color: colors.secondaryBrown, // Трохи темніший для імені
        fontSize: '18px',
        fontWeight: 'bold',
    },
    reviewDate: {
        color: colors.secondaryBrown,

        fontSize: '12px',

        fontWeight: 'bold',

        opacity: 0.7,
        position: 'absolute',
        right: '25px', // відступ справа
        top: '15px', // відступ зверху
    },
    reviewMeta: {
        margin: 0,
        fontSize: '14px',
        opacity: 0.9,
    },
    reviewComment: {
        margin: 0,
        fontSize: '14px',

        fontStyle: 'italic',
        marginTop: '4px',
    },
    noReviews: {
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: '20px',
    },
    highlight: {
        color: colors.primaryYellow,
        fontSize: '22px',
        marginLeft: '10px',
    },
    infoBlock: {
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: 'row',
    },
    nameAndbio: {
        display: 'flex',

        flexDirection: 'column',

        top: 0,
    },

    avatar: {
        margin: '15px',

        borderColor: colors.white,

        borderRadius: '41px',

        borderStyle: 'solid',

        borderWidth: '13px',

        boxShadow: '0 3px 5px 0 rgba(46, 68, 73, 0.6)',
        flexShrink: 0,
        objectFit: 'cover',
        height: '351px',
        top: 0,
        width: '250px',
    },
    name: {
        color: colors.primaryYellow,
        fontSize: '28px',
        fontWeight: 'bold',
        top: 0,
    },
})
