import { useEffect, useState } from 'react'
import api from '../../api/axios'
import { useAuthStore } from '../../store/authStore'
import FloatingBackground from '../../components/FloatingBackground'
import { Home } from '../../components/Home'
import * as stylex from '@stylexjs/stylex'
import { Icon } from '../../components/Icon'
import { colors } from '../../styles/tokens.stylex'
import { Button } from '../../components/Button'

const heartBeat = stylex.keyframes({
    '0%': { transform: 'scale(1)' },
    '14%': { transform: 'scale(1.2)' },
    '28%': { transform: 'scale(1)' },
    '42%': { transform: 'scale(1.2)' },
    '70%': { transform: 'scale(1)' },
})

interface Request {
    id: number
    author_id: number
    title: string
    location: string
    image_url?: string
    created_at: string
    status: 'created' | 'in_progress' | 'done'
}

export default function MyRequests() {
    const [requests, setRequests] = useState<Request[]>([])
    const userId = useAuthStore((state) => state.user?.sub)
    const [processingId, setProcessingId] = useState<number | null>(null)

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await api.get(`/posts/${userId}`)
                setRequests(response.data)
            } catch (error) {
                console.error(error)
            }
        }
        if (userId) {
            void fetchRequests()
        }
    }, [userId])

    const handleMarkAsDone = async (requestId: number) => {
        try {
            setProcessingId(requestId)
            await api.post(`/posts/${requestId}/mark-as-done`)
            setRequests((prev) =>
                prev.map((req) =>
                    req.id === requestId ? { ...req, status: 'done' } : req
                )
            )
        } catch (error) {
            console.error(error)
        } finally {
            setProcessingId(null)
        }
    }

    return (
        <FloatingBackground variant="blue" sx={styles.background}>
            <Home />
            <div {...stylex.props(styles.contentLayer)}>
                <header style={{ textAlign: 'center', marginBottom: '20px' }}>
                    <h1 {...stylex.props(styles.h1)}>
                        <span {...stylex.props(styles.heartIcon)}>
                            <Icon
                                variant="red"
                                size="small"
                                iconName="fa-solid fa-heart"
                            />
                        </span>
                        My Requests
                        <span {...stylex.props(styles.heartIcon)}>
                            <Icon
                                variant="red"
                                size="small"
                                iconName="fa-solid fa-heart"
                            />
                        </span>
                    </h1>
                </header>

                <div {...stylex.props(styles.requestsContainer)}>
                    {requests.length === 0 ? (
                        <p {...stylex.props(styles.noRequests)}>
                            You have no requests yet.
                        </p>
                    ) : (
                        requests.map((request) => {
                            return (
                                <div
                                    key={request.id}
                                    {...stylex.props(styles.requestCard)}
                                >
                                    <img
                                        src={
                                            request.image_url ||
                                            '/default-placeholder.png'
                                        }
                                        alt={request.title}
                                        {...stylex.props(styles.requestImage)}
                                    />
                                    <div
                                        {...stylex.props(
                                            styles.requestTextContent
                                        )}
                                    >
                                        <p
                                            {...stylex.props(
                                                styles.requestTitle
                                            )}
                                        >
                                            {request.title}
                                        </p>

                                        <p
                                            {...stylex.props(
                                                styles.requestMeta
                                            )}
                                        >
                                            <Icon
                                                iconName="fa-location-dot"
                                                size="small"
                                                variant="blue"
                                            />
                                            <span style={{ marginLeft: '5px' }}>
                                                {request.location}
                                            </span>
                                        </p>

                                        <p
                                            {...stylex.props(
                                                styles.requestStatus
                                            )}
                                        >
                                            <span
                                                style={{
                                                    color: colors.secondaryBrown,
                                                }}
                                            >
                                                Status:{' '}
                                            </span>
                                            {request.status === 'done'
                                                ? 'Done'
                                                : request.status ===
                                                    'in_progress'
                                                  ? 'In Progress'
                                                  : 'Created'}
                                        </p>
                                    </div>
                                    {request.status !== 'done' && (
                                        <Button
                                            variant="fullBlue"
                                            onClick={() =>
                                                void handleMarkAsDone(
                                                    request.id
                                                )
                                            }
                                            disabled={
                                                processingId === request.id
                                            }
                                        >
                                            {processingId === request.id
                                                ? 'Processing...'
                                                : 'Mark as Done'}
                                        </Button>
                                    )}
                                    {request.status === 'done' && (
                                        <div>
                                            Done{' '}
                                            <Icon
                                                iconName="fa-heart"
                                                size="small"
                                                variant="blue"
                                            />
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </FloatingBackground>
    )
}

const styles = stylex.create({
    background: {
        padding: '30px',

        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
    },
    h1: {
        gap: '15px',
        alignItems: 'center',

        color: colors.primaryBrown,
        display: 'flex',
        fontFamily: 'Momo',
        fontSize: '35px',
        justifyContent: 'center',
    },
    heartIcon: {
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationName: heartBeat,
        display: 'inline-block',
    },
    contentLayer: {
        padding: '40px',
        borderRadius: '40px',
        backgroundColor: colors.white,
        boxShadow: '0 20px 50px rgba(126, 140, 196, 0.3)',
        display: 'flex',
        flexDirection: 'column',

        maxWidth: '900px',
        width: '100%',
    },
    requestsContainer: {
        gap: '20px',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    requestCard: {
        borderRadius: '30px',
        gap: '20px',
        paddingBlock: '15px',
        paddingInline: '25px',
        transition: 'transform 0.2s ease',
        alignItems: 'center',
        backgroundColor: colors.primaryYellow,
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        color: colors.primaryBrown,
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
    },
    requestImage: {
        borderRadius: '20px',
        flexShrink: 0,
        objectFit: 'cover',
        height: '80px',
        width: '80px',
    },
    requestTextContent: {
        gap: '4px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    requestTitle: {
        margin: 0,

        color: colors.secondaryBrown,
        fontSize: '20px',
        fontWeight: 'bold',
    },

    requestMeta: {
        margin: 0,

        alignItems: 'center',
        display: 'flex',
        fontSize: '14px',
    },
    requestStatus: {
        margin: 0,

        gap: '5px',
        display: 'flex',
        fontSize: '13px',
        fontWeight: 'bold',
        marginTop: '5px',
    },
    noRequests: {
        color: colors.primaryBrown,
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: '20px',
    },
    actionWrapper: {
        position: 'absolute',
        bottom: '15px',
        right: '25px',
    },
})
