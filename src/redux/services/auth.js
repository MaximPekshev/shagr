import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../../constants/config';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  endpoints: (builder) => ({
    // 1. Запрос для генерации одноразового пароля (PIN)
    requestPin: builder.mutation({
      query: (email) => ({
        url: '/auth/pin/',
        method: 'POST',
        body: { email },
      }),
    }),
    // 2. Запрос для получения токена
    getToken: builder.mutation({
      query: ({ email, pin }) => ({
        url: '/auth/token/',
        method: 'POST',
        body: { email, pin },
      }),
      // Сохраняем токен в LocalStorage
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem('shagr_token', data.token);
        } catch (error) {
          console.error('Ошибка при получении токена:', error);
        }
      },
    }),
    // 3. Получение данных пользователя (корзина, wishlist и т. д.)
    getUserData: builder.query({
      query: () => ({
        url: '/user-data/',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('shagr_token')}`,
        },
      }),
    }),
  }),
});

export const {
  useRequestPinMutation,
  useGetTokenMutation,
  useGetUserDataQuery,
} = authApi;
