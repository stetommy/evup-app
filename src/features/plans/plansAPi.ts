import { apiSlice } from 'features/api/apiSlice';
import { authApi } from 'features/auth/authApi';

export const plansApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPlan: builder.mutation({
      query: (data) => ({
        url: '/plan/create',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          if (err?.error?.status === 401) {
            await dispatch(authApi.endpoints.reFreshToken.initiate(null));
            await dispatch(plansApi.endpoints.createPlan.initiate(arg));
          }
        }
      },
    }),

    getPlans: builder.query({
      query: () => '/plan/read',
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          if (err?.error?.status === 401) {
            await dispatch(authApi.endpoints.reFreshToken.initiate(null));
            await dispatch(plansApi.endpoints.getPlans.initiate(null));
          }
        }
      },
    }),

    removePlans: builder.mutation({
      query: (slug) => ({
        url: `/plan/remove/${slug}`,
        method: 'DELETE',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          if (err?.error?.status === 401) {
            await dispatch(authApi.endpoints.reFreshToken.initiate(null));
            await dispatch(plansApi.endpoints.removePlans.initiate(null));
          }
        }
      },
    }),

    buyPlans: builder.mutation({
      query: (queryString) => ({
        url: `/plan/buy/${queryString}`,
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          if (err?.error?.status === 401) {
            await dispatch(authApi.endpoints.reFreshToken.initiate(null));
            await dispatch(plansApi.endpoints.buyPlans.initiate(arg));
          }
        }
      },
    }),

    paySuccess: builder.query({
      query: (userEmail) => `/plan/stripe/success/${userEmail}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
        } catch (err) {
          if (err?.error?.status === 401) {
            await dispatch(authApi.endpoints.reFreshToken.initiate(null));
            await dispatch(plansApi.endpoints.paySuccess.initiate(arg));
          }
        }
      },
    }),
  }),
});

export const {
  useCreatePlanMutation,
  useGetPlansQuery,
  useRemovePlansMutation,
  useBuyPlansMutation,
  usePaySuccessQuery,
} = plansApi;
