import { useForm } from "react-hook-form";
import { useRegisterMutation } from "./accountApi"
import { registerSchema, type RegisterSchema } from "../../library/schemas/registerScheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockOutline } from "@mui/icons-material";
import { Container, Paper, Box, Typography, TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function RegisterForm() {
  const [registerUser] = useRegisterMutation();
  const {register, handleSubmit, setError, formState: {errors, isValid, isLoading}} = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema)
  })

  const onSubmit = async (data: RegisterSchema) => {
    try {
      await registerUser(data).unwrap();
    } catch (error) {
      const apiError = error as {message: string};
      if (apiError.message && typeof apiError.message === 'string') {
        const errorArray = apiError.message.split(',');
        errorArray.forEach(e => {
          if (e.includes('Password')) {
            setError('password', {message: e})
          } else if (e.includes('Email')) {
            setError('email', {message: e})
          }
        })
      }
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth='sm'
      sx={{
        borderRadius: 4,
        p: 4,
        position: 'relative',
        overflow: 'hidden',
        animation: 'fadeInUp 0.5s ease-out',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #7B2FBE, #DC2626, #F59E0B)',
        },
      }}
    >
      <Box display='flex' flexDirection='column' alignItems='center' justifyContent="center">
        <Box sx={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
          mb: 2,
          mt: 2,
          boxShadow: '0 8px 24px rgba(123, 47, 190, 0.3)',
        }}>
          <LockOutline sx={{ color: '#fff', fontSize: 28 }} />
        </Box>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
          Register
        </Typography>
        <Box
          component='form'
          onSubmit={handleSubmit(onSubmit)}
          width='100%'
          display='flex'
          flexDirection='column'
          gap={3}
          marginY={3}
        >
          <TextField
            fullWidth
            label='Email'
            autoFocus
            {...register('email', {required: 'Email is required'})}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            fullWidth
            label='Password'
            type="password"
            {...register('password', {required: 'Password is required'})}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            disabled={isLoading || !isValid}
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              py: 1.5,
              background: 'linear-gradient(135deg, #7B2FBE, #A855F7)',
              fontWeight: 700,
              fontSize: '1rem',
              '&:hover': {
                background: 'linear-gradient(135deg, #581C87, #7B2FBE)',
              },
            }}
          >
            Register
          </Button>
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Already have an account?{' '}
            <Typography
              component={Link}
              to='/'
              sx={{
                color: 'primary.light',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign in here
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
