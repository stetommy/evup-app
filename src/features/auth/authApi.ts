import { apiSlice } from 'features/api/apiSlice';
import { setRefreshTokenValidation, userLoggedIn } from './authSlice';

interface LogoutResponse {
  success: boolean;
}
export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: '/auth/signup/email',
        method: 'POST',
        body: data,
      }),
    }),

    signIn: builder.mutation({
      query: (data) => ({
        url: '/auth/login/email',
        method: 'POST',
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(userLoggedIn(result?.data));
          dispatch(setRefreshTokenValidation(true));
        } catch (error) {
          console.error(error);
        }
      },
    }),
    passwordRecover: builder.mutation({
      query: (data) => ({
        url: '/auth/password/recover',
        method: 'POST',
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: '/auth/password/change',
        method: 'POST',
        body: data,
      }),
    }),
    reFreshToken: builder.mutation({
      query: () => ({
        url: '/auth/token/refresh',
        method: 'POST',
      }),
    }),
    logOut: builder.query<LogoutResponse, void>({
      query: () => '/auth/login/logout',
    }),
    changeImage: builder.mutation({
      query: (data) => ({
        url: '/auth/extra/image',
        method: 'POST',
        body: data,
      }),
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
            await dispatch(authApi.endpoints.changeImage.initiate(arg));
          }
        }
      },
    }),
    changeDescription: builder.mutation({
      query: (data) => ({
        url: '/auth/extra/description',
        method: 'POST',
        body: data,
      }),
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
            await dispatch(authApi.endpoints.changeDescription.initiate(arg));
          }
        }
      },
    }),
    getUserInfo: builder.query({
      query: () => '/auth/fetch/user',
    }),
  }),
});

export const {
  useSignInMutation,
  useRegisterMutation,
  usePasswordRecoverMutation,
  useReFreshTokenMutation,
  useResetPasswordMutation,
  useChangeImageMutation,
  useChangeDescriptionMutation,
  useGetUserInfoQuery,
} = authApi;
