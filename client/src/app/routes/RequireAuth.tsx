import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../features/account/accountApi"
import { Box, CircularProgress } from "@mui/material";

export default function RequireAuth() {
    const {data: user, isLoading} = useUserInfoQuery();
    const location = useLocation();

    if (isLoading) return (
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
            <CircularProgress sx={{ color: 'primary.light' }} />
        </Box>
    )

    if(!user) {
        return <Navigate to='/' state={{from: location}} />
    }

    const adminRoutes = [
        '/inventory',
        '/admin-dashboard'
    ]

    if (adminRoutes.includes(location.pathname) && !user.roles.includes('Admin')) {
        return <Navigate to='/home' replace />
    }
  return (
    <Outlet />
  )
}