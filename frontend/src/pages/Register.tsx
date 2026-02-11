import * as stylex from '@stylexjs/stylex'
import { useForm } from 'react-hook-form'
import { colors } from '../styles/tokens.stylex'
import { Button } from '../UIcomponents/Button'
import { Input } from '../UIcomponents/Input'
import { Checkbox } from '../UIcomponents/Checkbox'
import { Logo } from '../UIcomponents/Logo'
import { Container } from '../UIcomponents/Container'
import { Background } from '../UIcomponents/Background'

export default function Register() {
    const { register, handleSubmit, watch } = useForm()

    const isVolunteer = watch('isVolunteer')

    const onSubmit = (data: any) => {
        console.log(data)
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
                        <Input
                            size="large"
                            {...register('firstName')}
                            placeholder="First Name"
                        />
                        <Input
                            size="large"
                            {...register('lastName')}
                            placeholder="Last Name"
                        />
                        <Input
                            size="large"
                            {...register('email')}
                            placeholder="Email"
                        />
                        <Input
                            size="large"
                            {...register('password')}
                            placeholder="Password"
                        />
                        <Input
                            size="large"
                            placeholder="City"
                            sx={(styles.inputField, styles.fullWidthRow)}
                            {...register('city')}
                        />
                        <label
                            {...stylex.props(
                                styles.checkboxContainer,
                                styles.fullWidthRow
                            )}
                        >
                            <Checkbox
                                variant={isVolunteer ? 'checked' : 'base'}
                                {...register('isVolunteer')}
                            />
                            <span {...stylex.props(styles.label)}>
                                I am a volunteer
                            </span>
                        </label>
                        {isVolunteer && (
                            <Input
                                size="large"
                                {...register('dream')}
                                sx={(styles.inputField, styles.fullWidthRow)}
                                placeholder="Tell us about your dream"
                            />
                        )}

                        <Button
                            variant="full"
                            size="medium"
                            type="submit"
                            sx={styles.registerButton}
                        >
                            Register
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
