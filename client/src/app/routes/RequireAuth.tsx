import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUserInfoQuery } from "../../feartures/account/accountApi"

export default function RequireAuth() {
    const {data: user, isLoading} = useUserInfoQuery();
    const location = useLocation();

    if (isLoading) return <div>Loading...</div>

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