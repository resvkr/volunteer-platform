import * as stylex from '@stylexjs/stylex'
import { Icon } from './Icon'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { colors } from '../styles/tokens.stylex'

const ICONS = [
    'fa-truck',
    'fa-box',
    'fa-paw',
    'fa-utensils',
    'fa-hands-holding',
    'fa-stethoscope',
    'fa-brain',
    'fa-house-user',
    'fa-leaf',
    'fa-biohazard',
    'fa-laptop-code',
    'fa-car',
    'fa-book-open',
    'fa-users',
    'fa-shapes',
]

const EXTENDED_ICONS = [...ICONS, ...ICONS, ...ICONS]

interface BackgroundProps {
    children?: ReactNode
    variant?: 'blue' | 'white'
    sx?: stylex.StyleXStyles
}

export default function FloatingBackground({
    children,
    variant = 'blue',
    sx,
}: BackgroundProps) {
    const bubbleData = useMemo(() => {
        return EXTENDED_ICONS.map((icon) => ({
            icon,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            delay: `${Math.random() * 5}s`,
            duration: `${10 + Math.random() * 10}s`,
            scale: 0.4 + Math.random() * 0.6,
        }))
    }, [])

    const isWhite = variant === 'white'

    return (
        <>
            <div
                {...stylex.props(styles.bgContainer, isWhite && styles.bgWhite)}
            >
                {bubbleData.map((data, index) => (
                    <div
                        key={index}
                        {...stylex.props(
                            styles.bubble,
                            isWhite && styles.noBubble
                        )}
                        style={{
                            top: data.top,
                            left: data.left,
                            animationDelay: data.delay,
                            animationDuration: data.duration,
                            transform: `scale(${data.scale})`,
                        }}
                    >
                        <Icon
                            iconName={`fa-solid ${data.icon}`}
                            size="medium"
                        />
                    </div>
                ))}
            </div>

            <main {...stylex.props(styles.contentLayer, sx)}>{children}</main>
        </>
    )
}

const float = stylex.keyframes({
    '0%': { transform: 'translateY(0px) rotate(0deg)' },
    '50%': { transform: 'translateY(-30px) rotate(10deg)' },
    '100%': { transform: 'translateY(0px) rotate(0deg)' },
})

const styles = stylex.create({
    bgContainer: {
        overflow: 'hidden',
        backgroundColor: colors.secondaryBlue,
        pointerEvents: 'none',
        position: 'fixed',
        zIndex: 0,
        height: '100vh',
        left: 0,
        top: 0,
        width: '100vw',
    },
    bgWhite: {
        backgroundColor: colors.white, // Або просто '#ffffff'
    },
    bubble: {
        borderColor: 'rgba(255, 255, 255, 0.4)',
        borderRadius: '50%',
        borderStyle: 'solid',
        borderWidth: '5px',
        alignItems: 'center',
        animationIterationCount: 'infinite',
        animationName: float,
        animationTimingFunction: 'ease-in-out',
        backdropFilter: 'blur(5px)',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.03)',
        display: 'flex',
        justifyContent: 'center',
        position: 'absolute',
        height: '70px',
        width: '70px',
    },
    noBubble: {
        borderColor: 'transparent',

        borderWidth: 0,

        backdropFilter: 'none',
        backgroundColor: 'transparent',
        boxShadow: 'none',
    },
    contentLayer: {
        position: 'relative',
        zIndex: 1,
        minHeight: '100vh',
        width: '100%',
    },
})
