import * as stylex from '@stylexjs/stylex'
import { useForm } from 'react-hook-form'
import { colors } from '../../styles/tokens.stylex'
import { Button } from '../../components/Button'
import { Logo } from '../../components/Logo'
import { Container } from '../../components/Container'
import { Background } from '../../components/Background'
import { UserSchema, type FormData } from './types'
import FormField from '../../components/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../api/axios'
import { useAuthStore } from '../../store/authStore'
import { useNavigate } from 'react-router-dom'

export default function Login() {
    const navigate = useNavigate()
    const setAuth = useAuthStore((state) => state.setAuth)
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
        mode: 'onBlur',
    })

    const onSubmit = async (data: FormData) => {
        const requestData = {
            ...data,
        }

        try {
            const response = await api.post('/auth/login', requestData)

            const { access_token }: { access_token: string } = response.data

            setAuth(access_token)

            const user = useAuthStore.getState().user

            if (user?.role === 'VOLUNTEER') {
                void navigate('/volunteer/dashboard')
            } else if (user?.role === 'USER') {
                void navigate('/user/dashboard')
            }
        } catch (error: any) {
            const errorMessage = error.response?.data?.message

            if (
                errorMessage === 'Invalid credentials' ||
                errorMessage === 'User not found'
            ) {
                setError('password', {
                    type: 'server',
                    message: 'Incorrect email or password',
                })
            } else {
                console.log(error)
            }
        }
    }

    return (
        <Background variant="img">
            <div {...stylex.props(styles.mainContainer)}>
                <Logo size="medium" sx={styles.img} />
                <Container variant="white" sx={styles.loginFormContainer}>
                    <h1 {...stylex.props(styles.h1)}>Login</h1>
                    <form
                        {...stylex.props(styles.form)}
                        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
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
