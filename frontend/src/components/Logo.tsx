import * as stylex from '@stylexjs/stylex'

const styles = stylex.create({
    large: {
        height: '200px',
    },
    medium: {
        height: '150px',
    },
    small: {
        height: '100px',
    },
})

interface LogoProps {
    size?: 'small' | 'medium' | 'large'
    sx?: stylex.StyleXStyles
}

export const Logo = ({ size = 'medium', sx }: LogoProps) => {
    return (
        <img
            src="/src/assets/logo.png"
            alt="Logo"
            {...stylex.props(styles[size], sx)}
        />
    )
}
