import { fetchBaseQuery, type BaseQueryApi, type FetchArgs } from "@reduxjs/toolkit/query";
import {  startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";
import { apiRateLimiter } from "./rateLimiter";

const customBaseQuery = fetchBaseQuery({
    baseUrl: 'https://localhost:5000/api',
    credentials: "include"
});

type ErrorResponse = | string | {title: string} | {errors: string[]};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_RETRIES = 3;
const INITIAL_BACKOFF_MS = 1000;

export const baseQueryWithErrorHandling = async (args: string | FetchArgs, api: BaseQueryApi,
    extraOptions: object) => {
        // Client-side rate limiting
        if (!apiRateLimiter.canProceed()) {
            const retryAfter = apiRateLimiter.getRetryAfterMs();
            toast.warning(`Too many requests. Please wait ${Math.ceil(retryAfter / 1000)}s.`);
            return {
                error: {
                    status: 429,
                    data: { title: 'Too many requests. Please slow down.' },
                },
            };
        }

        api.dispatch(startLoading());

        // Retry with exponential backoff for server errors
        let result = await customBaseQuery(args, api, extraOptions);
        let retries = 0;

        while (
            result.error &&
            typeof result.error.status === 'number' &&
            result.error.status >= 500 &&
            retries < MAX_RETRIES
        ) {
            retries++;
            const backoff = INITIAL_BACKOFF_MS * Math.pow(2, retries - 1);
            await sleep(backoff);
            result = await customBaseQuery(args, api, extraOptions);
        }

        api.dispatch(stopLoading())
        if(result.error) {
            const originalStatus = result.error.status == 'PARSING_ERROR' && result.error.originalStatus
                ? result.error.originalStatus
                :result.error.status

            const responseData = result.error.data as ErrorResponse;

            switch (originalStatus) {
                case 400:
                    if (typeof responseData == 'string') toast.error(responseData);
                    else if ('errors' in responseData){
                        throw Object.values(responseData.errors).flat().join(',')
                    }
                    else toast.error(responseData.title);                    
                    break;
                case 401:
                    if (responseData && typeof responseData == 'object' && 'title' in responseData)
                    toast.error(responseData.title);
                    break;
                case 403:
                    if (responseData && typeof responseData == 'object')
                    toast.error('403 Forbidden');
                    break;
                case 404:
                    if (typeof responseData == 'object' && 'title' in responseData)
                        router.navigate('/not-found')
                    break;
                case 500:
                    if (typeof responseData == 'object')
                        router.navigate('/server-error', {state: {error: responseData}})
                    break;
                default:
                    break;
            }
        }

        return result;
    }