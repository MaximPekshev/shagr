import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_BASE_URL } from "../../constants/config";

export const api = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
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
            query: () => '/catalog/category/',
        }),
        getCategory: builder.query({
            query: (slug) => `/catalog/category/${slug}/`,
        }),
        getCompilations: builder.query({
            query: ({ categorySlug }) => {
                let url = '/compilation/';
                if (categorySlug) {
                    url += `?category=${categorySlug}`;
                }
                return url;
            },
        })
    }),
});

export const { 
    useGetProductsQuery,
    useGetProductQuery,
    useGetCategoriesQuery,
    useGetCategoryQuery,
    useGetCompilationsQuery,
} = api;