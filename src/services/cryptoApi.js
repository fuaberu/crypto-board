// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const createRequest = (url) => ({
	url,
	headers: {
		'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
		'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
	},
});

// Define a service using a base URL and expected endpoints
export const cryptosApi = createApi({
	reducerPath: 'cryptosApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://coinranking1.p.rapidapi.com/' }),
	endpoints: (builder) => ({
		getCryptosStats: builder.query({
			query: () => createRequest('stats'),
		}),
		getCryptosCoins: builder.query({
			query: (count) => createRequest(`coins?limit=${count}`),
		}),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCryptosStatsQuery } = cryptosApi;
export const { useGetCryptosCoinsQuery } = cryptosApi;
