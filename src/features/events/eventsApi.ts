import { apiSlice } from 'features/api/apiSlice';
import { authApi } from 'features/auth/authApi';
import { setRefreshTokenValidation } from 'features/auth/authSlice';

export const eventsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPublishedEvents: builder.query({
        query: () => '/events/get',
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
          } catch (err) {
            if (err?.error?.status === 401) {
              const res: any = await dispatch(
                authApi.endpoints.reFreshToken.initiate(null)
              );
  
              if (res?.error?.status === 401) {
                dispatch(setRefreshTokenValidation(false));
                return;
              }
              await dispatch(eventsApi.endpoints.getPublishedEvents.initiate(null));
            }
          }
        },
        providesTags: ['Events'],
      }),
    getEventBySlug: builder.query({
        query: (eventSlug) => `/events/getby/slug/${eventSlug}`,
        async onQueryStarted(arg, { queryFulfilled, dispatch }) {
          try {
            const result = await queryFulfilled;
          } catch (err) {
            if (err?.error?.status === 401) {
              const res: any = await dispatch(
                authApi.endpoints.reFreshToken.initiate(null)
              );
  
              if (res?.error?.status === 401) {
                dispatch(setRefreshTokenValidation(false));
                return;
              }
              await dispatch(eventsApi.endpoints.getEventBySlug.initiate(arg));
            }
          }
        },
        providesTags: (result, error, arg) => [{ type: 'Events', id: arg }],
      }),
    }),
});

export const {
    useGetPublishedEventsQuery,
    useGetEventBySlugQuery,
} = eventsApi;
