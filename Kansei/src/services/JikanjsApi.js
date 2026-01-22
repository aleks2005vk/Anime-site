// src/services/JikanjsApi.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const jikanApi = createApi({
  reducerPath: 'jikanApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.jikan.moe/v4/' }),
  endpoints: (builder) => ({
    // Топовое аниме
    getTopAnime: builder.query({
      query: ({ page = 1 } = {}) => `top/anime?page=${page}`,
    }),

    // Аниме с фильтрацией
    getAnimes: builder.query({
      query: ({ genres, year, order_by, sort = "desc", page = 1, keyword } = {}) => {
        const params = [`page=${page}`];
        if (genres) params.push(`genres=${genres}`);
        if (year) params.push(`year=${year}`);
        if (order_by) params.push(`order_by=${order_by}`);
        if (order_by) params.push(`sort=${sort}`);
        if (keyword) params.push(`q=${encodeURIComponent(keyword)}`);
        return `anime?${params.join("&")}`;
      },
    }),

    // ПОИСК АНИМЕ - ДОБАВЬТЕ ЭТОТ ENDPOINT
    getAnimeSearch: builder.query({
      query: ({ keyword, page = 1 }) => `anime?q=${encodeURIComponent(keyword)}&page=${page}`,
    }),

    // Получение всех жанров аниме
    getGenres: builder.query({
      query: () => `genres/anime`,
    }),

    getAnime: builder.query({
      query: (id) => `anime/${id}`,
    }),
    
    getStaff: builder.query({
      query: (id) => `anime/${id}/staff`,
    }),
  }),
});

// ЭКСПОРТИРУЙТЕ ВСЕ HOOKS, ВКЛЮЧАЯ НОВЫЙ
export const { 
  useGetTopAnimeQuery, 
  useLazyGetAnimesQuery, 
  useGetGenresQuery,
  useGetAnimeQuery,
  useGetStaffQuery,
  useLazyGetAnimeSearchQuery // ДОБАВЬТЕ ЭТОТ ЭКСПОРТ
} = jikanApi;