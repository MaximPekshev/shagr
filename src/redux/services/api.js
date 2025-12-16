import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "https://backend.shagr.annasoft.site/api/v1" }),
    keepUnusedDataFor: 0,
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ page, category, compilation, search }) => {
                let url = `/catalog/good/?page=${page}`;
                if (category) {
                    url += `&category=${category}`;
                }
                if (compilation) {
                    url += `&compilation=${compilation}`;
                }
                if (search) {
                    url += `&search=${search}`;
                }
                return url;
            },
        }),
        getProduct: builder.query({
            query: (slug) => `/catalog/good/${slug}/`,
        }),
        getCategories: builder.query({
            query: () => '/category/',
        }),
        getCategory: builder.query({
            query: (slug) => `/category/${slug}/`,
        }),
        getCompilations: builder.query({
            query: ({ categorySlug }) => {
                let url = '/compilation/';
                if (categorySlug) {
                    url += `?category=${categorySlug}`;
                }
                return url;
            },
        }),
        getPin: builder.mutation({
            query: (data) => ({
                url: '/pin/',
                method: 'POST',
                body: data,
            }),
        }),
        getToken: builder.mutation({
            query: (data) => ({
                url: '/token/',
                method: 'POST',
                body: data,
            }),
        }),
    }),
});

export const { 
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useGetPinMutation,
    useGetTokenMutation,
    useGetCompilationsQuery,
} = api;