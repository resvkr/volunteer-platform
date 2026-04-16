import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'
import { colors } from '../styles/tokens.stylex'
import type { Article } from '../types/news'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import api from '../api/axios'
import type { InfiniteData } from '@tanstack/react-query'
import { motion, AnimatePresence } from 'framer-motion'

export default function NewsItem({ item }: { item: Article }) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const photos = item.photos || []

    const hasMultiplePhotos = photos.length > 1

    const queryClient = useQueryClient()

    const nextPhoto = () => {
        setCurrentIndex((prev) => (prev + 1) % photos.length)
    }

    const prevPhoto = () => {
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }

    const isLiked = item.likes && item.likes.length > 0

    const { mutate: handleLike, isPending } = useMutation({
        mutationFn: async () => {
            await api.post(
                `${import.meta.env.VITE_API_URL}/news/${item.id}/like`
            )
        },

        onSuccess: () => {
            queryClient.setQueryData<InfiniteData<Article[]>>(
                ['news'],
                (oldData) => {
                    if (!oldData) return undefined

                    return {
                        ...oldData,
                        pages: oldData.pages.map((page) =>
                            page.map((article) =>
                                article.id === item.id
                                    ? {
                                          ...article,
                                          likes_count: isLiked
                                              ? (article.likes_count ?? 1) - 1
                                              : (article.likes_count ?? 0) + 1,
                                          likes: isLiked
                                              ? []
                                              : [
                                                    {
                                                        id: Math.random(),
                                                        user_id: 0,
                                                    },
                                                ],
                                      }
                                    : article
                            )
                        ),
                    }
                }
            )
        },
    })

    return (
        <div {...stylex.props(styles.newsBlock)}>
            <div>
                <div
                    {...stylex.props(styles.imageContainer)}
                    style={{ position: 'relative' }}
                >
                    <AnimatePresence mode="wait">
                        {photos.length > 0 ? (
                            <motion.img
                                key={photos[currentIndex].photo_url} // Ключ важливий для спрацювання анімації
                                src={photos[currentIndex].photo_url}
                                alt="news"
                                initial={{ opacity: 0, x: 10 }} // Початковий стан (трохи збоку і прозоре)
                                animate={{ opacity: 1, x: 0 }} // Стан появи
                                exit={{ opacity: 0, x: -10 }} // Стан при зникненні
                                transition={{ duration: 0.3 }} // Швидкість анімації
                                {...stylex.props(styles.mainImage)}
                                style={{ position: 'absolute' }} // Щоб картинки не "стрибали" під час зміни
                            />
                        ) : (
                            <div
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    background: '#f0f0f0',
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>

                {hasMultiplePhotos && (
                    <div {...stylex.props(styles.controlsRow)}>
                        <button
                            onClick={prevPhoto}
                            {...stylex.props(styles.smallNavBtn)}
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>

                        <div {...stylex.props(styles.dotsWrapper)}>
                            {photos.map((_, index) => (
                                <div
                                    key={index}
                                    {...stylex.props(
                                        styles.dot,

                                        index === currentIndex &&
                                            styles.activeDot
                                    )}
                                />
                            ))}
                        </div>

                        <button
                            onClick={nextPhoto}
                            {...stylex.props(styles.smallNavBtn)}
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                )}

                <div style={{ marginTop: '16px' }}>
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            gap: '4px',
                            fontSize: '18px',
                            zIndex: 2,
                        }}
                    >
                        <div>
                            <button
                                onClick={() => handleLike()}
                                disabled={isPending}
                                {...stylex.props(styles.resetButton)}
                            >
                                <div
                                    {...stylex.props(
                                        styles.heartIcon,
                                        isPending && styles.pulsing
                                    )}
                                >
                                    <i
                                        className={
                                            isLiked
                                                ? 'fa-solid fa-heart'
                                                : 'fa-regular fa-heart'
                                        }
                                    />
                                </div>
                            </button>

                            <span {...stylex.props(styles.likesCount)}>
                                {item.likes_count}
                            </span>
                        </div>
                        <div>
                            <i className="fa-solid fa-location-dot" />
                            <span>{item.location}</span>
                        </div>
                    </div>
                    <div
                        style={{
                            margin: 0,
                            fontFamily: 'Momo',
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <p style={{ fontSize: '18px', fontStyle: 'bold' }}>
                            {item.caption}
                        </p>
                        <p
                            style={{
                                marginTop: 'auto',
                                textAlign: 'right',
                            }}
                        >
                            {' '}
                            {item.author.firstName}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const pulse = stylex.keyframes({
    '0%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.2)' },
    '100%': { transform: 'scale(1)' },
})

const styles = stylex.create({
    newsBlock: {
        borderColor: '#333',

        borderRadius: '2% 6% 5% 4% / 1% 1% 2% 4%',

        borderStyle: 'solid',
        borderWidth: '3px',
        marginBlock: '30px',
        marginInline: 'auto',

        backgroundColor: '#fff',

        display: 'flex',

        flexDirection: 'column',
        position: 'relative', // Важливо для позиціонування внутрішньої рамки

        // Додаємо легкий нахил всьому посту
        transform: 'rotate(-1deg)',

        maxWidth: '450px',
        paddingBottom: '50px',

        paddingLeft: '20px', // Товстий низ для підпису
        paddingRight: '20px',
        paddingTop: '20px',
        width: '100%',
    },

    sketchyOverlay: {
        borderColor: '#353535',

        borderRadius: '1% 1% 2% 4% / 2% 6% 5% 4%',
        borderStyle: 'solid',
        borderWidth: '2px',
        content: '',
        display: 'block',
        pointerEvents: 'none',
        position: 'absolute',

        transform: 'translate(-50%, -50%) scale(1.01) rotate(0.8deg)',

        zIndex: 1,
        height: '102%',

        left: '50%',

        top: '50%',
        width: '102%',
    },

    resetButton: {
        // 2. Робота зі шрифтом та текстом
        font: 'inherit',
        margin: 0,

        padding: 0,
        borderStyle: 'none',

        // 4. Скидання контуру (Focus)
        outline: {
            default: 'none',
            ':focus-visible': '2px solid blue', // Залишаємо для навігації клавіатурою
        },
        // 1. Повне скидання вигляду
        appearance: 'none',
        backgroundColor: 'transparent',
        color: 'inherit',
        // 3. Інтерактивність
        cursor: 'pointer',
        textAlign: 'inherit',
        userSelect: 'none', // Забороняє виділення тексту при швидких кліках (важливо для лайків!)
    },
    heartIcon: {
        transition: 'all 0.3s ease',

        color: '#ff3a4e',

        fontSize: '23px',
        paddingLeft: '3px',
    },
    pulsing: {
        animationDuration: '0.8s',

        animationIterationCount: 'infinite',
        animationName: pulse,
        animationTimingFunction: 'ease-in-out',
    },
    likesCount: {
        color: '#333',

        marginLeft: '8px',
    },

    text: {
        margin: 0,

        color: colors.secondaryBrown,

        fontSize: '18px',
    },

    imageContainer: {
        borderColor: '#333',

        borderRadius: '2% 6% 5% 4% / 1% 1% 2% 4%',

        borderStyle: 'solid',

        borderWidth: '3px',
        overflow: 'hidden',
        backgroundColor: '#000',

        height: '500px',

        width: '100%',
    },

    mainImage: {
        objectFit: 'cover',

        height: '100%',

        width: '100%',
    },

    controlsRow: {
        gap: '20px',

        alignItems: 'center',

        display: 'flex',

        justifyContent: 'center',

        marginTop: '15px',
    },

    smallNavBtn: {
        borderColor: {
            default: colors.primaryYellow,

            ':hover': 'white',
        },

        borderRadius: '12px',

        borderStyle: 'solid',

        transition: 'all 0.4s ease',

        alignItems: 'center',

        backgroundColor: {
            default: 'white',

            ':hover': colors.primaryYellow,
        },

        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',

        color: {
            default: colors.primaryYellow,

            ':hover': 'white',
        },

        cursor: 'pointer',

        display: 'flex',

        justifyContent: 'center',

        height: '36px',

        width: '36px',
    },

    dotsWrapper: {
        gap: '8px',

        alignItems: 'center',

        display: 'flex',
    },

    dot: {
        borderRadius: '50%',
        transition: 'all 0.3s ease',
        backgroundColor: colors.secondaryYellow,
        height: '6px',
        width: '6px',
    },
    activeDot: {
        backgroundColor: colors.primaryYellow,
        transform: 'scale(1.4)',
    },
})
