import { LockOutline } from "@mui/icons-material";
import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import { loginSchema, type LoginSchema } from "../../library/schemas/loginSchema";
import {zodResolver} from "@hookform/resolvers/zod";
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
        await login(data);
        await fetchUserInfo();
        navigate(location.state?.from || '/home');
    }

  return (
    <Container component={Paper} maxWidth='sm' sx={{borderRadius: 3}}  >
        <Box display='flex' flexDirection='column' alignItems='center' marginTop='8' justifyContent="center" >
           <LockOutline />
           <Typography variant="h5">
                Sign in
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
              
              <Button disabled={isLoading} variant="contained" type="submit">
                  Sign
              </Button>
              <Typography sx={{textAlign: 'center'}}>
                  Don't have an account?
                  <Typography component={Link} to='/register' color='primary'>
                      Sign up
                  </Typography>
              </Typography>
            </Box>
        </Box>
    </Container>
  )
}