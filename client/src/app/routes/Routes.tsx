import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../../feartures/home/Home";
import MovieDetails from "../../feartures/home/MovieDetails";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import Theatre from "../../feartures/theatre/Theatre";
import ShowTime from "../../feartures/showtime/ShowTime";
import BookTicket from "../../feartures/bookticket/BookTicket";
import LoginForm from "../../feartures/account/LoginForm";
import App from "../layout/App";
import RegisterForm from "../../feartures/account/RegisterForm";
import InventryPage from "../../feartures/admin/InventryPage";
import RequireAuth from "./RequireAuth";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {element: <RequireAuth />, children: [
                {path: 'inventory', element: <InventryPage />}
            ]},
            
            {path: '/home', element: <Home />},
            {path: '/home/:id', element: <MovieDetails />},
            {path: '/server-error', element: <ServerError />},
            {path: '/not-found', element: <NotFound />},
            {path: '*', element: <Navigate replace to = '/not-found' />},
            {path: '/home/:id/theatre', element: <Theatre />},
            {path: '/home/:id/theatre/:id/showtime', element: <ShowTime />},
            {path: '/home/:id/theatre/:id/showtime/:id/bookticket', element: <BookTicket />},
            {path: '', element: <LoginForm />},
            {path: 'register', element: <RegisterForm />},
            
        ]
    }
])