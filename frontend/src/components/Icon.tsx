import * as stylex from '@stylexjs/stylex'
import { colors } from '../styles/tokens.stylex'

interface IconProps {
    variant?: 'yellow' | 'blue'
    size?: 'large' | 'medium' | 'small'
    sx?: stylex.StyleXStyles
    iconName: string
}

export const Icon = ({
    variant = 'blue',
    size = 'medium',
    iconName,
}: IconProps) => {
    const getStyles = () => {
        const s: React.CSSProperties = {
            transition: 'color 0.2s ease',
            cursor: 'pointer',
            display: 'inline-block',
        }

        if (variant === 'yellow') s.color = colors.primaryYellow
        else if (variant === 'blue') s.color = colors.secondaryBlue
        else s.color = '#ffffff'

        if (size === 'large') s.fontSize = '60px'
        else if (size === 'medium') s.fontSize = '35px'
        else if (size === 'small') s.fontSize = '20px'

        return s
    }

    return <i className={`fa-solid ${iconName}`} style={getStyles()}></i>
}
