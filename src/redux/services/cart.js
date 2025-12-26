import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/config";

export const cartApi = createApi({
    reducerPath: "cartApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        deleteCartItem: builder.mutation({
            query: ({ header, item }) => {
                let request = {
                    url: `/cart/delete/`,
                    method: 'POST',
                    body: item,
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Cart']
        }),
        addCartItem: builder.mutation({
            query: ({ header, item }) => {
                let request = {
                    url: '/cart/add/',
                    method: 'POST',
                    body: item,
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Cart']
        }),
        setCartItem: builder.mutation({
            query: ({ header, item }) => {
                let request = {
                    url: '/cart/set/',
                    method: 'POST',
                    body: item,
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Cart']
        }),
        getCart: builder.query({
            query: ({ header }) => {
                let request = {
                    url: '/cart/',
                    method: 'GET',
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                };
                return request;
            },
            providesTags: ['Cart']
        }),
        clearCart: builder.mutation({
            query: ({ header }) => {
                let request = {
                    url: '/cart/clear/',
                    method: 'GET',
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Cart']
        }),
    }),
});

export const { 
    useGetCartQuery, 
    useAddCartItemMutation, 
    useDeleteCartItemMutation, 
    useSetCartItemMutation,
    useClearCartMutation,
} = cartApi;