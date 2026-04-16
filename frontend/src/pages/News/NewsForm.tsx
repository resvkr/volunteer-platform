import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CreateNewsFormSchema } from './types'
import type { CreateNewsFormValues } from './types'
import api from '../../api/axios'
import { useAuthStore } from '../../store/authStore'
import { Background } from '../../components/Background'
import { Container } from '../../components/Container'
import FormField from '../../components/FormField'
import { Button } from '../../components/Button'
import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { colors } from '../../styles/tokens.stylex'
import { Logo } from '../../components/Logo'
import { useNavigate } from 'react-router-dom'

const slideUp = stylex.keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateY(100%)',
    },

    '100%': {
        opacity: 1,
        transform: 'translateY(0)',
    },
})

export default function NewsForm() {
    const { access_token, user } = useAuthStore()

    const [selectedFiles, setSelectedFiles] = useState<File[]>([])

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<CreateNewsFormValues>({
        resolver: zodResolver(CreateNewsFormSchema),
    })

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newFiles = e.target.files ? Array.from(e.target.files) : []

        setSelectedFiles((prev) => {
            const combinedArray = [...prev, ...newFiles].slice(0, 10)

            const dataTransfer = new DataTransfer()
            combinedArray.forEach((file) => dataTransfer.items.add(file))

            setValue('photos', dataTransfer.files, { shouldValidate: true })

            return combinedArray
        })
    }

    const onSubmit = async (data: CreateNewsFormValues) => {
        try {
            if (!access_token || !user) return

            const photoUrls: string[] = []

            if (selectedFiles.length > 0) {
                const uploadPromises = selectedFiles.map(async (file) => {
                    const formData = new FormData()
                    formData.append('file', file)
                    const response = await api.post<{ url: string }>(
                        'http://localhost:3000/storage/upload',
                        formData,
                        { headers: { Authorization: `Bearer ${access_token}` } }
                    )
                    return response.data.url
                })
                const uploadedUrls = await Promise.all(uploadPromises)
                photoUrls.push(...uploadedUrls)
            }

            await api.post(
                'http://localhost:3000/news',
                {
                    caption: data.caption,
                    location: data.location,
                    photos: photoUrls,
                    author_id: Number(user.sub),
                },
                { headers: { Authorization: `Bearer ${access_token}` } }
            )
            void navigate('/news/thanks')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Background variant="img">
            <Logo size="medium" sx={styles.img} />
            <Container>
                <form
                    {...stylex.props(styles.form)}
                    onSubmit={(e) => {
                        e.preventDefault()
                        void handleSubmit(onSubmit, (err) => console.log(err))(
                            e
                        )
                    }}
                >
                    <h1 style={{ color: colors.secondaryBlue }}>
                        Be the first to tell!
                    </h1>
                    <FormField
                        type="text"
                        name="caption"
                        placeholder="Add caption"
                        register={register}
                        error={errors.caption}
                    />

                    <FormField
                        type="text"
                        name="location"
                        placeholder="Location"
                        register={register}
                        error={errors.location}
                    />

                    <div {...stylex.props(styles.container)}>
                        <label
                            htmlFor="photos"
                            {...stylex.props(
                                styles.dropzone,
                                errors.photos
                                    ? styles.dropzoneError
                                    : styles.dropzoneNormal
                            )}
                        >
                            <div style={{ textAlign: 'center' }}>
                                {selectedFiles.length > 0 ? (
                                    <>
                                        <p {...stylex.props(styles.textMain)}>
                                            Files picked: {selectedFiles.length}{' '}
                                            / 10
                                        </p>
                                        <span
                                            {...stylex.props(styles.addMoreBtn)}
                                        >
                                            + Add more photos
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <p {...stylex.props(styles.textMain)}>
                                            Upload photos
                                        </p>
                                        <p {...stylex.props(styles.textSub)}>
                                            Click to browse (max 10)
                                        </p>
                                    </>
                                )}
                            </div>
                            <input
                                id="photos"
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleFileChange}
                                {...stylex.props(styles.hiddenInput)}
                            />
                        </label>
                        {errors.photos && (
                            <p {...stylex.props(styles.errorText)}>
                                {errors.photos.message as string}
                            </p>
                        )}
                    </div>

                    <Button
                        variant="full"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Loading...' : 'Share!'}
                    </Button>
                </form>
            </Container>
        </Background>
    )
}

const styles = stylex.create({
    img: {
        animationDuration: '0.8s',
        animationFillMode: 'forwards',

        animationName: slideUp,

        animationTimingFunction: 'ease-out',
        opacity: 0,
        zIndex: 0,
    },
    form: {
        gap: '8px',

        alignItems: 'center',

        display: 'flex',

        flexDirection: 'column',
        zIndex: 1,
    },
    container: {
        gap: '8px',
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '200px',
        width: '100%',
    },
    dropzone: {
        borderColor: colors.primaryYellow,
        borderRadius: '12px',
        borderStyle: 'dashed',
        borderWidth: '2px',
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        transitionDuration: '0.2s',
        transitionProperty: 'all',
        width: '100%',
    },
    dropzoneNormal: {
        borderColor: '#d1d5db',
        backgroundColor: '#f9fafb',
    },
    dropzoneError: {
        borderColor: '#ef4444',
        backgroundColor: '#fef2f2',
    },
    addMoreBtn: {
        borderRadius: '8px',
        paddingBlock: '6px',

        paddingInline: '12px',
        backgroundColor: colors.primaryYellow,

        color: '#000',

        display: 'inline-block',

        fontSize: '12px',

        fontWeight: 'bold',
        marginBottom: '10px',
        marginTop: '10px',
    },
    hiddenInput: {
        display: 'none',
    },
    textMain: {
        color: '#4b5563',
        fontSize: '14px',
        fontWeight: 600,
    },
    textSub: {
        color: '#9ca3af',
        fontSize: '12px',
    },
    errorText: {
        color: '#ef4444',
        fontSize: '12px',
        marginTop: '4px',
    },
})
