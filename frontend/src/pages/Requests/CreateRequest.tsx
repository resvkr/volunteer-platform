import FloatingBackground from '../../components/FloatingBackground'
import * as stylex from '@stylexjs/stylex'
import { colors } from '../../styles/tokens.stylex'
import { Icon } from '../../components/Icon'
import FormField from '../../components/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import type { CreateRequestFormValues } from './types'
import { CreateRequestSchema } from './types'
import { useForm, Controller } from 'react-hook-form'
import TimePicker from 'react-time-picker'
import DatePicker from 'react-date-picker'
import { useState } from 'react'
import api from '../../api/axios'
import { useAuthStore } from '../../store/authStore'
import { Button } from '../../components/Button'
import { useNavigate } from 'react-router-dom'

import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import './TimePickerOverrides.css'
import { Home } from '../../components/Home'

const CATEGORIES = [
    'Delivery',
    'Humanitarian Aid',
    'Animal Care',
    'Catering',
    'Elderly Care',
    'Medical Support',
    'Psychological Help',
    'Shelter Assistance',
    'Eco Volunteering',
    'Disaster Relief',
    'IT Support',
    'Transportation',
    'Education',
    'Community Events',
    'Other',
]

const heartBeat = stylex.keyframes({
    '0%': { transform: 'scale(1)' },
    '14%': { transform: 'scale(1.2)' },
    '28%': { transform: 'scale(1)' },
    '42%': { transform: 'scale(1.2)' },
    '70%': { transform: 'scale(1)' },
})

export default function CreateRequest() {
    const { access_token, user } = useAuthStore()
    const [preview, setPreview] = useState<string | null>(null)
    const [imageUrl, setImageUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const formatDate = (date: Date | null) => {
        if (!date) return ''
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const {
        register,
        control,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateRequestFormValues>({
        resolver: zodResolver(CreateRequestSchema),
        defaultValues: {
            event_time: '10:00:00',
            event_date: formatDate(new Date()),
        },
    })

    const selectedCategory = watch('category_name')

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null
        if (!file) return
        setPreview(URL.createObjectURL(file))
        const formData = new FormData()
        formData.append('file', file)
        try {
            const response = await api.post('/storage/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            const uploadedUrl = response.data.url
            setImageUrl(uploadedUrl)
        } catch (error) {
            console.error('File upload failed:', error)
        }
    }

    const onSubmit = async (data: CreateRequestFormValues) => {
        try {
            setLoading(true)
            if (!access_token || !user) return
            if (preview && !imageUrl) {
                alert('Please wait until the image is uploaded')
                return
            }
            await api.post(`/posts/create`, {
                ...data,
                image_url: imageUrl,
                author_id: Number(user.sub),
            })
            await navigate('/requests/success')
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <FloatingBackground variant="white">
            <Home />
            <form
                {...stylex.props(styles.mainBlock)}
                onSubmit={(e) => {
                    void handleSubmit(onSubmit)(e)
                }}
            >
                <header
                    style={{
                        textAlign: 'center',
                        marginBottom: '10px',
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <h1 {...stylex.props(styles.h1)}>
                        <span {...stylex.props(styles.heartIcon)}>
                            <Icon
                                variant="yellow"
                                size="small"
                                iconName="fa-regular fa-heart"
                            />
                        </span>
                        Create a New Request
                        <span {...stylex.props(styles.heartIcon)}>
                            <Icon
                                variant="yellow"
                                size="small"
                                iconName="fa-regular fa-heart"
                            />
                        </span>
                    </h1>
                </header>

                {/* ЖОРСТКА СІТКА ПО ЦЕНТРУ */}
                <div {...stylex.props(styles.twoColumnGrid)}>
                    <div {...stylex.props(styles.fieldGroup)}>
                        <label {...stylex.props(styles.label)}>
                            Topic Title
                        </label>
                        <FormField
                            type="text"
                            name="title"
                            placeholder="What happened?"
                            register={register}
                            error={errors.title}
                        />
                    </div>

                    <div {...stylex.props(styles.fieldGroup)}>
                        <label {...stylex.props(styles.label)}>Category</label>
                        <select
                            {...register('category_name')}
                            {...stylex.props(
                                styles.selectField,
                                !selectedCategory && styles.selectPlaceholder,
                                errors.category_name && styles.selectError
                            )}
                        >
                            <option value="" disabled>
                                Select a category
                            </option>
                            {CATEGORIES.map((cat) => (
                                <option
                                    key={cat}
                                    value={cat}
                                    style={{ color: '#312705' }}
                                >
                                    {cat}
                                </option>
                            ))}
                        </select>
                        {errors.category_name && (
                            <span {...stylex.props(styles.errorMessage)}>
                                {errors.category_name.message}
                            </span>
                        )}
                    </div>

                    <div {...stylex.props(styles.fieldGroup)}>
                        <label {...stylex.props(styles.label)}>
                            Detailed Description
                        </label>
                        <FormField
                            type="text"
                            name="description"
                            placeholder="Provide details..."
                            register={register}
                            error={errors.description}
                        />
                    </div>

                    <div {...stylex.props(styles.fieldGroup)}>
                        <label {...stylex.props(styles.label)}>Location</label>
                        <FormField
                            type="text"
                            name="location"
                            placeholder="City, Street..."
                            register={register}
                            error={errors.location}
                        />
                    </div>

                    <div {...stylex.props(styles.fieldGroup)}>
                        <label {...stylex.props(styles.label)}>
                            Contact Info
                        </label>
                        <FormField
                            type="text"
                            name="contact"
                            placeholder="Phone or Telegram..."
                            register={register}
                            error={errors.contact}
                        />
                    </div>

                    <div {...stylex.props(styles.fieldGroup)}>
                        <label {...stylex.props(styles.label)}>
                            Something else
                        </label>
                        <FormField
                            type="text"
                            name="additional_info"
                            placeholder="Extra info..."
                            register={register}
                            error={errors.additional_info}
                        />
                    </div>

                    <div {...stylex.props(styles.fieldGroup)}>
                        <label {...stylex.props(styles.label)}>Pick Time</label>
                        <Controller
                            control={control}
                            name="event_time"
                            render={({ field: { onChange, value } }) => (
                                <TimePicker
                                    onChange={(val) =>
                                        onChange(
                                            val && val.length === 5
                                                ? `${val}:00`
                                                : val
                                        )
                                    }
                                    value={value}
                                    format="HH:mm:ss"
                                    disableClock={true}
                                />
                            )}
                        />
                    </div>

                    <div {...stylex.props(styles.fieldGroup)}>
                        <label {...stylex.props(styles.label)}>Pick Date</label>
                        <Controller
                            control={control}
                            name="event_date"
                            render={({ field }) => (
                                <DatePicker
                                    onChange={(val: any) =>
                                        !Array.isArray(val) &&
                                        field.onChange(formatDate(val))
                                    }
                                    value={
                                        field.value
                                            ? new Date(field.value)
                                            : null
                                    }
                                    format="yyyy-MM-dd"
                                    clearIcon={null}
                                    calendarIcon={null}
                                />
                            )}
                        />
                    </div>
                </div>

                <div {...stylex.props(styles.photoSection)}>
                    <label {...stylex.props(styles.label)}>
                        Visual Attachment
                    </label>
                    <label htmlFor="photo" {...stylex.props(styles.dropzone)}>
                        {preview ? (
                            <div
                                style={{
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <img
                                    src={preview}
                                    alt="Preview"
                                    {...stylex.props(
                                        // Якщо imageUrl ще немає, додаємо прозорість та пульсацію
                                        !imageUrl
                                            ? [
                                                  styles.imageLoading,
                                                  styles.pulse,
                                              ]
                                            : styles.imageReady
                                    )}
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '140px',
                                        borderRadius: '8px',
                                        objectFit: 'contain',
                                    }}
                                />

                                {/* Міняємо текст overlay, щоб було зрозуміло, що йде процес */}
                                <div {...stylex.props(styles.changeOverlay)}>
                                    {!imageUrl
                                        ? 'Uploading...'
                                        : 'Change Photo'}
                                </div>
                            </div>
                        ) : (
                            <>
                                <Icon
                                    iconName="fa-solid fa-cloud-arrow-up"
                                    variant="yellow"
                                    size="small"
                                />
                                <p {...stylex.props(styles.textMain)}>
                                    Upload photo
                                </p>
                            </>
                        )}
                        <input
                            id="photo"
                            type="file"
                            accept="image/*"
                            disabled={!!(preview && !imageUrl)}
                            onChange={(e) => void handleFileChange(e)}
                            {...stylex.props(styles.hiddenInput)}
                        />
                    </label>
                </div>
                {/* КНОПКА ПО ЦЕНТРУ */}
                <div
                    style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Button variant="full" type="submit" sx={styles.submitBtn}>
                        {loading ? 'Processing...' : 'Create Request'}
                    </Button>
                </div>
            </form>
        </FloatingBackground>
    )
}

const styles = stylex.create({
    mainBlock: {
        padding: '40px',
        borderRadius: '32px',
        gap: '24px',

        alignItems: 'center', // Центрує шапку, сітку та фото-секцію
        backgroundColor: colors.primaryBlue,
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '50px',
        maxWidth: '850px',
        width: '95%',
    },
    h1: {
        gap: '15px',
        alignItems: 'center',
        color: colors.white,
        display: 'flex',
        fontSize: '35px',
        justifyContent: 'center',
    },
    heartIcon: {
        animationDuration: '2s',
        animationIterationCount: 'infinite',
        animationName: heartBeat,
    },
    twoColumnGrid: {
        columnGap: '40px', // Відступ між колонками
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 200px)', // Робимо 2 колонки рівно по 200px

        justifyContent: 'center', // Центрує всю сітку всередині форми
        rowGap: '20px',
        width: '100%',
    },
    fieldGroup: {
        gap: '8px',
        display: 'flex',
        flexDirection: 'column',
        width: '200px', // Фіксуємо ширину групи
    },
    label: {
        color: colors.white,
        fontSize: '14px',
        marginLeft: '4px',
    },
    selectField: {
        borderColor: colors.primaryYellow,
        borderRadius: '12px',
        borderStyle: 'solid',
        borderWidth: '4px',
        outline: 'none',
        paddingInline: '14px',
        backgroundColor: colors.white,
        boxSizing: 'border-box',
        color: colors.primaryBrown,
        cursor: 'pointer',
        fontSize: '15px',
        height: '48px',
        width: '200px',
    },
    selectPlaceholder: { color: 'rgba(49, 39, 5, 0.5)' },
    selectError: { borderColor: '#ff4d4d' },
    errorMessage: { color: '#ff4d4d', fontSize: '11px' },
    photoSection: {
        gap: '10px',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
    },
    dropzone: {
        borderColor: colors.primaryYellow,
        borderRadius: '16px',
        borderStyle: 'dashed',
        borderWidth: '2px',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        maxWidth: '400px',
        minHeight: '140px',
        width: '100%',
    },
    changeOverlay: {
        borderRadius: '10px',
        paddingBlock: '2px',
        paddingInline: '10px',
        backgroundColor: 'rgba(0,0,0,0.5)',
        color: 'white',
        fontSize: '10px',
        position: 'absolute',
        bottom: '5px',
    },
    textMain: {
        color: colors.white,
        fontSize: '15px',
        marginTop: '8px',
    },
    submitBtn: {
        fontSize: '18px',
        height: '54px',
        marginTop: '10px',
        width: '300px', // Додав ширину кнопці, щоб вона виглядала солідно по центру
    },
    hiddenInput: { display: 'none' },
    imageLoading: {
        transition: 'all 0.3s ease',
        filter: 'grayscale(0.8)', // Можна ще додати сірий фільтр для наочності
        opacity: 0.5,
    },
    imageReady: {
        transition: 'all 0.3s ease',
        filter: 'grayscale(0)',
        opacity: 1,
    },
    // Додамо просту пульсацію для картинки, поки вона завантажується
    pulse: {
        animationName: stylex.keyframes({
            '0%': { opacity: 0.4 },

            '100%': { opacity: 0.4 },
            '50%': { opacity: 0.7 },
        }),
        animationDuration: '1.5s',
        animationIterationCount: 'infinite',
    },
})
