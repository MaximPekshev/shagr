import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const wishApi = createApi({
    reducerPath: "wishApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://backend.shagr.annasoft.site/api/v1" }),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        deleteWishlistItem: builder.mutation({
            query: ({ header, item }) => {
                let request = {
                    url: `/wish/delete/`,
                    method: 'POST',
                    body: item,
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Wishlist']
        }),
        addWishlistItem: builder.mutation({
            query: ({ header, item }) => {
                let request = {
                    url: '/wish/set/',
                    method: 'POST',
                    body: item,
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Wishlist']
        }),
        setWishlistItem: builder.mutation({
            query: ({ header, item }) => {
                let request = {
                    url: '/wish/set/',
                    method: 'POST',
                    body: item,
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Wishlist']
        }),
        getWishlist: builder.query({
            query: ({ header }) => {
                let request = {
                    url: '/wish/',
                    method: 'GET',
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                };
                return request;
            },
            providesTags: ['Wishlist']
        }),
        clearWishlist: builder.mutation({
            query: ({ header }) => {
                let request = {
                    url: '/wish/clear/',
                    method: 'GET',
                };
                if (header && header.token) {
                    request.headers = { 'Authorization': `${header.token}` };
                }
                return request;
            },
            invalidatesTags: ['Wishlist']
        }),
    }),
});
    
export const { 
    useGetWishlistQuery, 
    useAddWishlistItemMutation, 
    useDeleteWishlistItemMutation, 
    useSetWishlistItemMutation,
    useClearWishlistMutation
} = wishApi;