import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseapi";
import type { UserBooking } from "../../app/model/bookticket";

export const bookticketApi = createApi({
    reducerPath: 'bookticketApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['BookedSeats', 'UserBookings'],
    endpoints: (builder) => ({
        fetchBookedSeats: builder.query<{ showTimeId: number; bookedSeats: string[] }, number>({
            query: (showTimeId) => `/bookticket/${showTimeId}`,
            providesTags: ['BookedSeats'],
        }),
        bookTicket: builder.mutation<{ message: string }, { showtimeId: number; seats: string[] }>({
            query: (body) => ({
                url: "/bookticket",
                method: "POST",
                body,
            }),
            invalidatesTags: ['BookedSeats', 'UserBookings'],
        }),
        fetchUserBookings: builder.query<UserBooking[], void>({
            query: () => '/bookticket/user',
            providesTags: ['UserBookings'],
        }),
    }),
});

export const { useBookTicketMutation, useFetchBookedSeatsQuery, useFetchUserBookingsQuery } = bookticketApi;
