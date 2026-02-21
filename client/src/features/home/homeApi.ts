import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseapi";
import type { Movie } from "../../app/model/movie";
import type { Theatre } from "../../app/model/theatre";
import type { ShowTime } from "../../app/model/showtime";
import type { BookTicket } from "../../app/model/bookticket";

export const homeApi = createApi({
    reducerPath: 'homeApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        fetchMovies: builder.query<Movie[], void>({
            query: () => ({url: 'Movie'})
        }),
        fetchMovieDetails: builder.query<Movie, number>({
            query: (MovieId) => `Movie/${MovieId}`
        }),
        fetchTheatres : builder.query<Theatre[], void>({
            query: () =>({url: 'theatre'})
        }),
        fetchTheatresId : builder.query<Theatre, number>({
            query: (MovieId) => `Movie/${MovieId}/theatre`
        }),
        fetchShowTimes : builder.query<ShowTime[], void>({
            query: () => ({url: '/showtime'})
        }),
        fetchShowTimeId : builder.query<ShowTime, {MovieId: number, TheatreId: number}>({
            query: ({MovieId,TheatreId}) => `Movie/${MovieId}/theatre/${TheatreId}/showtime`
        }),
       
        fetchBookTicketId : builder.query<BookTicket, {MovieId: number, TheatreId: number, ShowTimeId: number}>({
            query: ({MovieId,TheatreId,ShowTimeId}) => `Movie/${MovieId}/theatre/${TheatreId}/showtime/${ShowTimeId}/bookticket`
        }),
    })
});

export const {useFetchMoviesQuery, useFetchMovieDetailsQuery, useFetchTheatresQuery, 
              useFetchShowTimesQuery, useFetchTheatresIdQuery, useFetchShowTimeIdQuery, 
               useFetchBookTicketIdQuery} = homeApi;