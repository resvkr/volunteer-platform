import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'
import { colors } from '../../styles/tokens.stylex'
import * as stylex from '@stylexjs/stylex'
import { Button } from '../../components/Button'
import { useAuthStore } from '../../store/authStore'
import FloatingBackground from '../../components/FloatingBackground'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormField from '../../components/FormField'
import { Background } from '../../components/Background'
import { useRef } from 'react'

const EditProfileSchema = z.object({
    firstName: z.string().min(2, 'Too short'),
    lastName: z.string().min(2, 'Too short'),
    city: z.string().min(2, 'Enter city'),
    bio: z.string().nullable().or(z.string()),
    dream: z.string().optional().or(z.string()),
    photoUrl: z.string().url('Invalid URL').or(z.string().length(0)),
})

type EditFormData = z.infer<typeof EditProfileSchema>

export default function EditProfile() {
    const navigate = useNavigate()
    const currentUser = useAuthStore((state) => state.user)
    const [loading, setLoading] = useState(true)
    const isVolunteer = (currentUser as any)?.role === 'VOLUNTEER'
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [uploading, setUploading] = useState(false)
    const {
        register,
        handleSubmit,
        reset,
        watch,
        setValue,
        formState: { errors },
    } = useForm<EditFormData>({
        resolver: zodResolver(EditProfileSchema),
    })
    const [updating, setUpdating] = useState(false)
    const photoUrlValue = watch('photoUrl')
    useEffect(() => {
        const loadUserData = async () => {
            if (!currentUser?.sub) return
            try {
                const response = await api.get(
                    `/users/profile/${currentUser.sub}`
                )
                const userData = response.data
                console.log('Full user data from server:', userData)
                reset({
                    firstName: userData.firstName || '',
                    lastName: userData.lastName || '',
                    city: userData.city || '',
                    bio: userData.bio || '',
                    dream: userData.profile?.dream || '',
                    photoUrl: userData.photoUrl || '',
                })
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }
        void loadUserData()
    }, [currentUser, reset])

    const onUpdateSubmit = async (data: EditFormData) => {
        try {
            setUpdating(true)
            await api.patch(`/users/update`, data)
            void navigate(`/profile/${currentUser?.sub}`)
        } catch (error) {
            console.error('Update failed:', error)
        } finally {
            setUpdating(false)
        }
    }
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        if (!file) return

        const formData = new FormData()
        formData.append('file', file)
        try {
            setUploading(true)
            const responce = await api.post('/storage/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            const imageUrl = responce.data.url
            setValue('photoUrl', imageUrl)
        } catch (error) {
            console.error('File upload failed:', error)
        } finally {
            setUploading(false)
        }
    }

    if (loading)
        return (
            <Background variant="img">
                <div style={{ color: 'white' }}>Loading...</div>
            </Background>
        )
    console.log(errors)
    return (
        <FloatingBackground variant="white">
            <form
                onSubmit={(e) => void handleSubmit(onUpdateSubmit)(e)}
                {...stylex.props(styles.mainBlock)}
            >
                <div {...stylex.props(styles.infoBlock)}>
                    {/* Ліва частина: Аватар */}
                    <div {...stylex.props(styles.avatarColumn)}>
                        <div style={{ position: 'relative' }}>
                            <img
                                src={
                                    photoUrlValue ||
                                    (currentUser as any)?.photoUrl
                                }
                                alt="avatar"
                                {...stylex.props(styles.avatar)}
                                style={{
                                    opacity: uploading ? 0.5 : 1,
                                    transition: 'opacity 0.3s ease',
                                }}
                            />
                            {uploading && (
                                <div {...stylex.props(styles.loaderText)}>
                                    Loading...
                                </div>
                            )}
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                        >
                            {uploading ? 'Processing...' : 'Change avatar'}
                        </Button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={(e) => void handleFileChange(e)}
                        />
                    </div>

                    {/* Права частина: Грід для вирівнювання написів та полів */}
                    <div {...stylex.props(styles.gridContainer)}>
                        <label {...stylex.props(styles.label)}>Name:</label>
                        <FormField
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            register={register}
                            error={errors.firstName}
                            sx={styles.wideField}
                        />

                        <label {...stylex.props(styles.label)}>Surname:</label>
                        <FormField
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            register={register}
                            error={errors.lastName}
                            sx={styles.wideField}
                        />

                        <label {...stylex.props(styles.label)}>City:</label>
                        <FormField
                            type="text"
                            name="city"
                            placeholder="Your city"
                            register={register}
                            error={errors.city}
                            sx={styles.wideField}
                        />

                        {isVolunteer && (
                            <>
                                <label {...stylex.props(styles.label)}>
                                    Dream:
                                </label>
                                <FormField
                                    type="text"
                                    name="dream"
                                    placeholder="What is your dream?"
                                    register={register}
                                    error={errors.dream}
                                    sx={styles.wideField}
                                />
                            </>
                        )}

                        <label {...stylex.props(styles.label)}>About:</label>
                        <FormField
                            type="text"
                            name="bio"
                            placeholder="Describe yourself..."
                            register={register}
                            error={errors.bio}
                            sx={styles.wideField}
                        />
                    </div>
                </div>

                <div {...stylex.props(styles.buttonContainer)}>
                    <Button variant="full" type="submit">
                        {updating ? 'Updating...' : 'Update Profile'}
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => void navigate(-1)}
                        sx={styles.cancelButton}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
        </FloatingBackground>
    )
}

const styles = stylex.create({
    mainBlock: {
        padding: '40px',

        borderRadius: '41px',
        marginBlock: '70px',
        marginInline: 'auto',
        backgroundColor: colors.secondaryBlue,
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
        maxWidth: '600px',
    },
    infoBlock: {
        gap: '40px',

        alignItems: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
    },
    avatarColumn: {
        gap: '15px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
    },
    gridContainer: {
        alignItems: 'center', // Вирівнює напис по центру інпуту по вертикалі
        columnGap: '20px',
        display: 'grid',

        flexGrow: 1,
        gridTemplateColumns: 'auto 1fr', // Перша колонка за контентом, друга на весь залишок
        rowGap: '20px',
    },
    label: {
        color: 'white',
        fontSize: '18px',
        //fontWeight: '500',
        whiteSpace: 'nowrap',
    },
    avatar: {
        borderColor: colors.white,
        borderRadius: '30px',
        borderStyle: 'solid',
        borderWidth: '8px', // Трохи зменшив, щоб виглядало акуратніше
        objectFit: 'cover',
        height: '260px',
        width: '200px',
    },
    loaderText: {
        color: 'white',

        fontWeight: 'bold',
        position: 'absolute',

        transform: 'translate(-50%, -50%)',
        left: '50%',
        top: '50%',
    },
    wideField: {
        width: '100%',
    },
    buttonContainer: {
        gap: '15px',

        display: 'flex',

        justifyContent: 'center',
        borderTopColor: 'rgba(255,255,255,0.1)',
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        marginTop: '40px',
        paddingTop: '20px',
    },
    cancelButton: {
        borderColor: colors.white,
        backgroundColor: {
            default: 'transparent',
            ':hover': '#f62323',
        },
        color: {
            default: colors.white,
            ':hover': 'white',
        },
    },
})
