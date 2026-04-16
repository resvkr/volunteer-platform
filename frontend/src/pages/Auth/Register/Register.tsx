import * as stylex from '@stylexjs/stylex'
import { useForm } from 'react-hook-form'
import { colors } from '../../../styles/tokens.stylex'
import { Button } from '../../../components/Button'
import { Checkbox } from '../../../components/Checkbox'
import { Logo } from '../../../components/Logo'
import { Container } from '../../../components/Container'
import { Background } from '../../../components/Background'
import { UserSchema, type FormData } from './types'
import FormField from '../../../components/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import api from '../../../api/axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function Register() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        setError,
    } = useForm<FormData>({
        resolver: zodResolver(UserSchema),
        mode: 'onBlur',
        defaultValues: {
            isVolunteer: false,
        },
    })

    const isVolunteer = watch('isVolunteer')
    const [loading, setLoading] = useState(false)

    const onSubmit = async (data: FormData) => {
        const requestData = {
            ...data,
            isVolunteer: !!data.isVolunteer,
        }

        try {
            setLoading(true)
            const response = await api.post('/auth/register', requestData)

            const { access_token }: { access_token: string } = response.data

            localStorage.setItem('access_token', access_token)

            void navigate('/auth/login')
        } catch (error: any) {
            const errorMessage = error.response?.data?.message

            if (errorMessage === 'User with this email already exists') {
                setError('email', {
                    type: 'server',
                    message: 'User already exists',
                })
            } else {
                console.log(error)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <Background variant="img">
            <div {...stylex.props(styles.mainContainer)}>
                <Logo size="medium" sx={styles.img} />

                <Container variant="white" sx={styles.registerFormContainer}>
                    <h1 {...stylex.props(styles.h1)}>Register</h1>
                    <form
                        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
                        {...stylex.props(styles.registerForm)}
                    >
                        <FormField
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            register={register}
                            error={errors.firstName}
                        />
                        <FormField
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            register={register}
                            error={errors.lastName}
                        />
                        <FormField
                            type="email"
                            name="email"
                            placeholder="Email"
                            register={register}
                            error={errors.email}
                        />
                        <FormField
                            type="password"
                            name="password"
                            placeholder="Password"
                            register={register}
                            error={errors.password}
                        />
                        <FormField
                            type="text"
                            name="city"
                            placeholder="City"
                            register={register}
                            error={errors.city}
                            sx={styles.fullWidthRow}
                        />
                        <label
                            {...stylex.props(
                                styles.checkboxContainer,
                                styles.fullWidthRow
                            )}
                        >
                            <Checkbox
                                {...register('isVolunteer')}
                                checked={isVolunteer}
                            />

                            <span {...stylex.props(styles.label)}>
                                I am a volunteer
                            </span>
                        </label>
                        {isVolunteer && (
                            <FormField
                                type="text"
                                name="dream"
                                placeholder="Tell us about your dream"
                                register={register}
                                error={errors.dream}
                                sx={styles.fullWidthRow}
                            />
                        )}

                        <Button
                            variant="full"
                            size="medium"
                            type="submit"
                            sx={styles.registerButton}
                        >
                            {loading ? 'Registering...' : 'Register'}
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
    registerFormContainer: {
        padding: '10px',
        zIndex: 2,
        width: '400px',
    },
    registerForm: {
        gap: '10px',
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 200px)',
        justifyContent: 'center',
    },

    inputField: {
        gridColumn: 'span 2',
        justifySelf: 'center',
    },

    fullWidthRow: {
        gridColumn: 'span 2',

        display: 'flex',
        justifyContent: 'center',
        justifySelf: 'center',
        maxWidth: '200px',
        width: '100%',
    },

    checkboxContainer: {
        gap: '10px',
        marginBlock: '10px',
        transition: 'transform 0.2s ease',
        alignItems: 'center',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'row',
    },

    label: {
        color: colors.primaryBrown,
        fontSize: '15px',
        userSelect: 'none',
    },

    registerButton: {
        gridColumn: 'span 2',
        justifySelf: 'center',
    },
})
