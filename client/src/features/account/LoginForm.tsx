import { LockOutline } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { loginSchema, type LoginSchema } from "../../library/schemas/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLazyUserInfoQuery, useLoginMutation, useMeQuery } from "./accountApi";
import { useEffect } from "react";

export default function LoginForm() {
  const [login, {isLoading}] = useLoginMutation();
  const [fetchUserInfo] = useLazyUserInfoQuery();
  const { data: user, isLoading: checkingAuth } = useMeQuery();
  const location = useLocation();
  const {register, handleSubmit, formState: {errors}} = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema)
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!checkingAuth && user) {
      navigate("/home");
    }
  }, [user, checkingAuth, navigate]);

  const onSubmit = async (data: LoginSchema) => {
    try {
      await login(data).unwrap();
      await fetchUserInfo();
      navigate(location.state?.from || '/home');
    } catch {
      // error is handled by baseQueryWithErrorHandling
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
          Sign In
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
            disabled={isLoading}
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
            Sign In
          </Button>
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Typography
              component={Link}
              to='/register'
              sx={{
                color: 'primary.light',
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  )
}
