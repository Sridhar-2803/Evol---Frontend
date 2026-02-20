import { configureStore } from "@reduxjs/toolkit";
import { homeApi } from "../../feartures/home/homeApi";
import { useDispatch, useSelector } from "react-redux";
import { uiSlice } from "../layout/uiSlice";
import { errorApi } from "../api/errorApi";
import { bookticketApi } from "../../feartures/bookticket/bookticketApi";
import { accountApi } from "../../feartures/account/accountApi";
import { adminApi } from "../../feartures/admin/adminApi";

export const store = configureStore({
    reducer: {
        [homeApi.reducerPath]: homeApi.reducer,
        [errorApi.reducerPath]: errorApi.reducer,
        [bookticketApi.reducerPath] : bookticketApi.reducer,
        [accountApi.reducerPath] : accountApi.reducer,
        [adminApi.reducerPath] : adminApi.reducer,
        
        ui: uiSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(
             homeApi.middleware,
             errorApi.middleware, 
             bookticketApi.middleware,
             accountApi.middleware,
             adminApi.middleware 

            )
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>() 