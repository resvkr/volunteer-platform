import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../../api/axios'
import FloatingBackground from '../../components/FloatingBackground'
import { Home } from '../../components/Home'
import { Icon } from '../../components/Icon'
import { colors } from '../../styles/tokens.stylex'
import * as stylex from '@stylexjs/stylex'
import { Button } from '../../components/Button'

interface RequestDetails {
    id: number
    title: string
    description: string
    image_url: string
    location: string
    additional_info: string
    event_date: string
    event_time: string
    contact: string
    author: {
        firstName: string
        lastName: string
        photoUrl?: string
    }
    category?: {
        name: string
    }
}

export default function Request() {
    const { requestId } = useParams()
    const [request, setRequest] = useState<RequestDetails | null>(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchRequest = async () => {
            try {
                setLoading(true)
                const response = await api.get<RequestDetails>(
                    `/posts/details/${requestId}`
                )
                setRequest(response.data)
            } catch (error) {
                console.error('Error fetching request:', error)
            } finally {
                setLoading(false)
            }
        }
        if (requestId) fetchRequest()
    }, [requestId])

    const handleAccept = async (requestId: number) => {
        try {
            await api.post(`/posts/${requestId}/mark-as-in_progress`)
        } catch (error) {
            console.error('Error accepting request:', error)
        } finally {
            await navigate('/requests/accept/success')
        }
    }

    if (loading)
        return (
            <FloatingBackground variant="white">
                <div
                    style={{
                        color: colors.primaryBlue,
                        textAlign: 'center',
                        marginTop: '100px',
                    }}
                >
                    Loading details...
                </div>
            </FloatingBackground>
        )

    if (!request)
        return (
            <FloatingBackground variant="white">
                <div
                    style={{
                        color: colors.primaryBlue,
                        textAlign: 'center',
                        marginTop: '100px',
                    }}
                >
                    Request not found
                </div>
            </FloatingBackground>
        )

    return (
        <FloatingBackground variant="white">
            <Home />
            <div {...stylex.props(styles.mainBlock)}>
                <div {...stylex.props(styles.infoBlock)}>
                    <div {...stylex.props(styles.imageSection)}>
                        <img
                            src={
                                request.image_url || '/default-placeholder.png'
                            }
                            alt="request"
                            {...stylex.props(styles.mainImage)}
                        />
                        <Button
                            size="large"
                            sx={styles.button}
                            onClick={() => void handleAccept(request.id)}
                        >
                            Accept request
                        </Button>
                    </div>

                    <div {...stylex.props(styles.detailsContent)}>
                        <h1 {...stylex.props(styles.title)}>{request.title}</h1>

                        <div {...stylex.props(styles.metaRow)}>
                            {/* Категорія */}
                            <div {...stylex.props(styles.metaItem)}>
                                <strong {...stylex.props(styles.strong)}>
                                    Category:
                                </strong>
                                <div {...stylex.props(styles.metaValue)}>
                                    {request.category?.name || 'General'}
                                    <Icon
                                        variant="yellow"
                                        size="small"
                                        iconName="fa-solid fa-tag"
                                        sx={styles.smallIcon}
                                    />
                                </div>
                            </div>

                            {/* Локація */}
                            <div {...stylex.props(styles.metaItem)}>
                                <strong {...stylex.props(styles.strong)}>
                                    Location:
                                </strong>
                                <div {...stylex.props(styles.metaValue)}>
                                    {request.location}
                                    <Icon
                                        variant="yellow"
                                        size="small"
                                        iconName="fa-location-dot"
                                        sx={styles.smallIcon}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Час та Дата */}
                        <div {...stylex.props(styles.metaRow)}>
                            <div {...stylex.props(styles.metaItem)}>
                                <strong {...stylex.props(styles.strong)}>
                                    When:
                                </strong>
                                <div {...stylex.props(styles.metaValue)}>
                                    {request.event_date} at {request.event_time}
                                    <Icon
                                        variant="yellow"
                                        size="small"
                                        iconName="fa-regular fa-calendar"
                                        sx={styles.smallIcon}
                                    />
                                </div>
                            </div>

                            <div {...stylex.props(styles.metaItem)}>
                                <strong {...stylex.props(styles.strong)}>
                                    Author:
                                </strong>
                                <div {...stylex.props(styles.metaValue)}>
                                    {request.author.firstName}{' '}
                                    {request.author.lastName}
                                    <Icon
                                        variant="yellow"
                                        size="small"
                                        iconName="fa-regular fa-user"
                                        sx={styles.smallIcon}
                                    />
                                </div>
                            </div>
                        </div>
                        <div {...stylex.props(styles.descriptionSection)}>
                            <strong {...stylex.props(styles.strong)}>
                                Description:
                            </strong>
                            <div {...stylex.props(styles.momoText)}>
                                {request.description}
                            </div>
                        </div>

                        {/* Контакти */}
                        <div {...stylex.props(styles.descriptionSection)}>
                            <strong {...stylex.props(styles.strong)}>
                                Contact Info:
                            </strong>
                            <div {...stylex.props(styles.momoText)}>
                                {request.contact}
                            </div>
                        </div>

                        {request.additional_info && (
                            <div {...stylex.props(styles.descriptionSection)}>
                                <strong {...stylex.props(styles.strong)}>
                                    Additional Info:
                                </strong>
                                <div {...stylex.props(styles.momoText)}>
                                    {request.additional_info}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </FloatingBackground>
    )
}

const styles = stylex.create({
    mainBlock: {
        borderRadius: '41px',

        overflow: 'hidden',
        backgroundColor: colors.secondaryBlue,
        boxShadow: '0 3px 10px 0 rgba(46, 68, 73, 0.4)',
        color: colors.white,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '70px',
        maxWidth: '1000px',
        width: '90%',
    },
    infoBlock: {
        alignItems: 'stretch',
        display: 'flex',
        flexDirection: {
            default: 'row',
            '@media (max-width: 800px)': 'column',
        },
    },
    imageSection: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '30px',
    },
    button: {
        width: '300px',
    },
    mainImage: {
        margin: '20px',
        borderColor: colors.white,
        borderRadius: '41px',
        borderStyle: 'solid',
        borderWidth: '13px',
        boxShadow: '0 3px 5px 0 rgba(46, 68, 73, 0.6)',
        flexShrink: 0,
        objectFit: 'cover',
        height: '400px',
        width: '300px',
    },
    detailsContent: {
        padding: '30px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
    },
    title: {
        margin: 0,
        color: colors.primaryYellow,
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    metaRow: {
        gap: '30px',
        display: 'flex',

        flexWrap: 'wrap',
        marginBottom: '15px',
    },
    metaItem: {
        gap: '8px',

        alignItems: 'baseline',
        display: 'flex',
    },
    strong: {
        fontSize: '20px',
        whiteSpace: 'nowrap',
    },
    metaValue: {
        gap: '5px',

        alignItems: 'center',
        display: 'flex',
        fontFamily: 'Momo',
        fontSize: '16px',
    },
    descriptionSection: {
        marginTop: '15px',
    },
    momoText: {
        padding: '10px',

        borderRadius: '12px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        fontFamily: 'Momo',
        fontSize: '14px',
        marginTop: '5px',
    },
    smallIcon: {
        marginLeft: '5px',
    },
})
