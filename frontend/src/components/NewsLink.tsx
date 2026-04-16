import * as stylex from '@stylexjs/stylex'

import { colors } from '../styles/tokens.stylex'

export const NewsLink = () => {
    return (
        <div {...stylex.props(styles.whiteBlock)}>
            <img src="/src/assets/city.png" {...stylex.props(styles.img)} />

            <p {...stylex.props(styles.text)}>Latest Stories</p>
        </div>
    )
}

const styles = stylex.create({
    whiteBlock: {
        borderRadius: '40px',

        overflow: 'hidden',

        transition: 'box-shadow 0.3s ease-in-out, transform 0.3s ease',

        alignItems: 'center',

        backgroundColor: colors.white,

        boxShadow: {
            default: '0px 0px 0px rgba(0, 0, 0, 0)',

            ':hover': '0px 20px 40px rgba(0, 0, 0, 0.4)',
        },

        cursor: 'pointer',

        display: 'flex',

        justifyContent: 'center',

        position: 'relative',

        height: '300px',

        width: '600px',
    },

    img: {
        borderRadius: '25px',

        filter: 'brightness(0.6)',

        objectFit: 'cover',

        position: 'absolute',

        transform: 'translate(-50%, -50%)',

        height: '250px',

        left: '50%',

        top: '50%',

        width: '550px',
    },

    text: {
        color: colors.white,

        fontSize: '60px',

        fontWeight: 'bold',

        position: 'relative',

        textShadow: `

        0 0 10px rgba(0,0,0,0.9),

        -2px -2px 0 #000,

         2px -2px 0 #000,

        -2px  2px 0 #000,

         2px  2px 0 #000,

         0px  3px 0 #000,

         0px -3px 0 #000,

         3px  0px 0 #000,

        -3px  0px 0 #000

    `,

        zIndex: 1,
    },
})
