import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseapi";
import type { User } from "../../app/model/user";
import type { LoginSchema } from "../../library/schemas/loginSchema";
import { router } from "../../app/routes/Routes";
import { toast } from "react-toastify";

export const accountApi = createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints: (builder) => ({
        login: builder.mutation<void, LoginSchema>({
            query: (creds) => {
                return {
                    url: 'login?useCookies=true',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(['UserInfo']))
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        register: builder.mutation<void, object>({
            query: (creds) => {
                return{
                    url: 'account/register',
                    method: 'POST',
                    body: creds
                }
            },
            async onQueryStarted(_, {queryFulfilled}) {
                try {
                    await queryFulfilled;
                    toast.success('Registration successful')
                    router.navigate('/');
                } catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }),
        userInfo: builder.query<User, void>({
            query: () => 'account/user-info',
            providesTags: ['UserInfo']
        }),

        me: builder.query<{ id: string; email: string }, void>({
            query: () => 'account/me',
        }),

        logout: builder.mutation({
            query: () => ({
                url: 'account/logout',
                method: 'POST'
            }),
            async onQueryStarted(_, {dispatch, queryFulfilled}) {
                await queryFulfilled;
                dispatch(accountApi.util.invalidateTags(['UserInfo']));
                router.navigate('/');
            }
        })
       
    })
});

export const {useLoginMutation, useLogoutMutation, useRegisterMutation, useUserInfoQuery, useLazyUserInfoQuery, useMeQuery} = accountApi