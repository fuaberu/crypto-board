import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
 
const createRequest = (url) => ({
  url,
  headers: {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY,
  },
});
 
export const newsApi = createApi({
	reducerPath: 'newsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://bing-news-search1.p.rapidapi.com/news/' }),
	endpoints: (builder) => ({
		getNews: builder.query({
			query: ({category,count}) => createRequest(`search?q=${category}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}&mkt=en-us`),
		}),
	}),
});
 
export const { useGetNewsQuery } = newsApi;
