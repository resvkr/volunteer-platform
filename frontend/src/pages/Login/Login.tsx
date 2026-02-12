import * as stylex from '@stylexjs/stylex'
import { useForm } from 'react-hook-form'
import { colors } from '../../styles/tokens.stylex'
import { Button } from '../../UIcomponents/Button'
import { Logo } from '../../UIcomponents/Logo'
import { Container } from '../../UIcomponents/Container'
import { Background } from '../../UIcomponents/Background'
import { UserSchema, type FormData } from './types'
import FormField from '../../UIcomponents/FormField'
import { zodResolver } from '@hookform/resolvers/zod'

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
        mode: 'onBlur',
    })

    return (
        <Background variant="img">
            <div {...stylex.props(styles.mainContainer)}>
                <Logo size="medium" sx={styles.img} />
                <Container variant="white" sx={styles.loginFormContainer}>
                    <h1 {...stylex.props(styles.h1)}>Login</h1>
                    <form
                        {...stylex.props(styles.form)}
                        onSubmit={(e) => {
                            e.preventDefault()
                            void handleSubmit((data) => {
                                console.log(data)
                            })(e)
                        }}
                    >
                        <FormField
                            type="email"
                            name="email"
                            placeholder="Email"
                            register={register}
                            error={errors.email}
                        />
                        <FormField
                            sx={styles.inputField}
                            type="password"
                            name="password"
                            placeholder="Password"
                            register={register}
                            error={errors.password}
                        />
                        <Button variant="full" size="medium" type="submit">
                            Login
                        </Button>
                    </form>
                </Container>
            </div>
        </Background>
    )
}

const styles = stylex.create({
    h1: {
        color: colors.secondaryBlue,
    },

    mainContainer: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },

    img: {
        zIndex: 1,
    },

    loginFormContainer: {
        zIndex: 2,
    },

    inputField: {
        margin: '10px',
    },

    form: {
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
    },
})
