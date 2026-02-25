import * as stylex from '@stylexjs/stylex'
import { useState } from 'react'

interface SliderProps<T> {
    items: T[]
    renderItem: (item: T) => React.ReactNode
    itemsPerPage?: number
}

export function Slider<T>({
    items,
    renderItem,
    itemsPerPage = 4,
}: SliderProps<T>) {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        if (currentIndex < items.length - itemsPerPage) {
            setCurrentIndex((prev) => prev + 1)
        }
    }

    const prevSlide = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1)
        }
    }

    const step = 100 / itemsPerPage
    const translateX = currentIndex * step

    return (
        <div {...stylex.props(styles.sliderContainer)}>
            <div {...stylex.props(styles.sliderWindow)}>
                <div
                    {...stylex.props(styles.postListTrack)}
                    style={{ transform: `translateX(-${translateX}%)` }}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            {...stylex.props(styles.slideItem(itemsPerPage))}
                        >
                            {renderItem(item)}
                        </div>
                    ))}
                </div>
            </div>

            <div {...stylex.props(styles.controlsWrapper)}>
                <img
                    src="/src/assets/ArmNorm.png"
                    onClick={prevSlide}
                    alt="Previous"
                    {...stylex.props(
                        styles.arms,
                        styles.leftArm,
                        currentIndex === 0 && styles.disabledArm
                    )}
                />

                <img
                    src="/src/assets/ArmNorm2.png"
                    onClick={nextSlide}
                    alt="Next"
                    {...stylex.props(
                        styles.arms,
                        styles.rightArm,
                        currentIndex >= items.length - itemsPerPage &&
                            styles.disabledArm
                    )}
                />
            </div>
        </div>
    )
}

const styles = stylex.create({
    sliderContainer: {
        paddingInline: '60px',
        backgroundColor: '#EBEEF6',

        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: '100%',
    },
    sliderWindow: {
        overflow: 'hidden',
        paddingBottom: '20px',
        paddingTop: '40px',
        width: '100%',
    },
    postListTrack: {
        transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    slideItem: (itemsPerPage: number) => ({
        flex: `0 0 ${100 / itemsPerPage}%`,

        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
    }),
    controlsWrapper: {
        gap: '70px',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '10px',
    },
    arms: {
        transition: {
            default: 'all 0.3s ease',
            ':hover': 'transform 0.3s ease, filter 0.3s ease',
        },
        cursor: 'pointer',
        userSelect: 'none',
        width: '100px',
    },
    leftArm: {
        transform: {
            default: 'rotate(62deg)',
            ':hover': 'rotate(50deg) scale(1.1)',
        },
    },
    rightArm: {
        transform: {
            default: 'rotate(-62deg)',
            ':hover': 'rotate(-50deg) scale(1.1)',
        },
    },
    disabledArm: {
        cursor: 'default',

        filter: 'grayscale(1)',
        opacity: 0.2,
        pointerEvents: 'none',
    },
})
