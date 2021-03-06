import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { cryptosApi } from '../services/cryptoApi';
import { newsApi } from '../services/newsApi';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
	reducer: {
		// Add the generated reducer as a specific top-level slice
		[cryptosApi.reducerPath]: cryptosApi.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
		theme: themeReducer,
	},
	// Adding the api middleware enables caching, invalidation, polling,
	// and other useful features of `rtk-query`.
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(cryptosApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
