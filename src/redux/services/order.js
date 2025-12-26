import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/config";

export const orderApi = createApi({
    reducerPath: "orderApi",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        createOrder: builder.mutation({
            query: ({ header, items }) => {
                let request = {
                    url: '/orders/',
                    method: 'POST',
                    body: {
                        items: items,
                    },
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Order']
        }),
        getActiveOrders: builder.query({
            query: ({ header }) => {
                let request = {
                    url: '/orders/active/',
                    method: 'GET',
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                };
                return request;
            },
        }),
        getClosedOrders: builder.query({
            query: ({ header }) => {
                let request = {
                    url: '/orders/closed/',
                    method: 'GET',
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                };
                return request;
            },
        }),
        getOrders: builder.query({
            query: ({ header }) => {
                let request = {
                    url: '/orders/',
                    method: 'GET',
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                };
                return request;
            },
        })
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetActiveOrdersQuery,
    useGetClosedOrdersQuery
} = orderApi;