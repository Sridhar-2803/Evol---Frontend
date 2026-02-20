import { baseQueryWithErrorHandling } from "../../app/api/baseapi";
import type { Movie } from "../../app/model/movie";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
    reducerPath: 'adminApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        createMovie: builder.mutation<Movie, FormData>({
            query: (data: FormData) => {
                return {
                    url: 'movie',
                    method: 'POST',
                    body: data
                }
            }
        }),
        updateMovie: builder.mutation<void, {id: number, data: FormData}>({
            query: ({id, data}) => {
                data.append('id', id.toString())

                return {
                    url:  'movie',
                    method: 'PUT',
                    body: data 
                }
            }
        }),
        deleteMovie: builder.mutation<void, number>({
            query: (id: number) => {
                return{
                    url: `movie/${id}`,
                    method: 'DELETE'
                }
            }
        })
    })
});

export const {useCreateMovieMutation, useUpdateMovieMutation, useDeleteMovieMutation} = adminApi;