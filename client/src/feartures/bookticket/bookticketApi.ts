import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseapi";

export const bookticketApi = createApi({
    reducerPath: 'bookticketApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
    bookTicket: builder.mutation<{message: string}, {showtimeId: number; seats: string[]}>({
        query: (body) => ({
            url: "/bookticket",
            method: "POST",
            body,
        }),
    }),
    }),
});

export const {useBookTicketMutation} = bookticketApi;