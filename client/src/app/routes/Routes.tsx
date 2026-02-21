import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../layout/App";
import RequireAuth from "./RequireAuth";
import { Box, CircularProgress } from "@mui/material";

const Home = lazy(() => import("../../features/home/Home"));
const MovieDetails = lazy(() => import("../../features/home/MovieDetails"));
const Theatre = lazy(() => import("../../features/theatre/Theatre"));
const ShowTime = lazy(() => import("../../features/showtime/ShowTime"));
const BookTicket = lazy(() => import("../../features/bookticket/BookTicket"));
const LoginForm = lazy(() => import("../../features/account/LoginForm"));
const RegisterForm = lazy(() => import("../../features/account/RegisterForm"));
const InventryPage = lazy(() => import("../../features/admin/InventryPage"));
const ServerError = lazy(() => import("../errors/ServerError"));
const MyBookings = lazy(() => import("../../features/bookticket/MyBookings"));
const NotFound = lazy(() => import("../errors/NotFound"));

function SuspenseLayout({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
                <CircularProgress sx={{ color: 'primary.light' }} />
            </Box>
        }>
            {children}
        </Suspense>
    );
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'inventory', element: <SuspenseLayout><InventryPage /></SuspenseLayout>},
                {path: '/home/:id/theatre', element: <SuspenseLayout><Theatre /></SuspenseLayout>},
                {path: '/home/:id/theatre/:id/showtime', element: <SuspenseLayout><ShowTime /></SuspenseLayout>},
                {path: '/home/:id/theatre/:id/showtime/:id/bookticket', element: <SuspenseLayout><BookTicket /></SuspenseLayout>},
                {path: 'bookings', element: <SuspenseLayout><MyBookings /></SuspenseLayout>},
            ]},

            {path: '/home', element: <SuspenseLayout><Home /></SuspenseLayout>},
            {path: '/home/:id', element: <SuspenseLayout><MovieDetails /></SuspenseLayout>},
            {path: '/server-error', element: <SuspenseLayout><ServerError /></SuspenseLayout>},
            {path: '/not-found', element: <SuspenseLayout><NotFound /></SuspenseLayout>},
            {path: '*', element: <Navigate replace to = '/not-found' />},
            {path: '', element: <SuspenseLayout><LoginForm /></SuspenseLayout>},
            {path: 'register', element: <SuspenseLayout><RegisterForm /></SuspenseLayout>},
        ]
    }
])
