import { configureStore} from '@reduxjs/toolkit';
import { api } from './services/api';
import { cartApi } from './services/cart';
import { wishApi } from './services/wishlist';
import { authApi } from './services/auth';
import { orderApi } from './services/order';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [wishApi.reducerPath]: wishApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(api.middleware)
      .concat(cartApi.middleware)
      .concat(wishApi.middleware)
      .concat(authApi.middleware)
      .concat(orderApi.middleware),
});