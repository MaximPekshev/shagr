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
            providesTags: ['Orders']
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
            providesTags: ['Orders']
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
            providesTags: ['Orders']
        }),
        getOrderStatuses: builder.query({
            query: ({ header }) => {
                let request = {
                    url: '/orders/available-statuses/',
                    method: 'GET',
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                };
                return request;
            },
            providesTags: ['OrderStatuses']
        }),
        setOrderStatus: builder.mutation({
            query: ({ header, order_id, status_id }) => {
                console.log('Setting order status with:', { header, order_id, status_id });
                let request = {
                    url: '/orders/set-status/',
                    method: 'POST',
                    body: {
                        order_id: order_id,
                        status_id: status_id,
                    },
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Orders', 'OrderStatuses']
        }),
    }),
});

export const {
    useCreateOrderMutation,
    useGetOrdersQuery,
    useGetActiveOrdersQuery,
    useGetClosedOrdersQuery,
    useGetOrderStatusesQuery,
    useSetOrderStatusMutation,
} = orderApi;