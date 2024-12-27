import { apiSlice } from 'features/api/apiSlice';
import { authApi } from 'features/auth/authApi';
import { setRefreshTokenValidation } from 'features/auth/authSlice';

export const enrollmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEnrolledCourse: builder.query({
      query: () => '/enrollment/enrolledCourses',
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
            await dispatch(
              enrollmentApi.endpoints.getEnrolledCourse.initiate(null)
            );
          }
        }
      },
      providesTags: ['EnrolledCourses'],
    }),
    enrollCourse: builder.mutation({
      query: (slug) => ({
        url: `/enrollment/enroll/${slug}`,
        method: 'POST',
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
            await dispatch(enrollmentApi.endpoints.enrollCourse.initiate(arg));
          }
        }
      },
      invalidatesTags: ['EnrolledCourses', 'Courses'],
    }),

    unenrollCourse: builder.mutation({
      query: (slug) => ({
        url: `/enrollment/unEnroll/${slug}`,
        method: 'DELETE',
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
            await dispatch(
              enrollmentApi.endpoints.unenrollCourse.initiate(arg)
            );
          }
        }
      },
      invalidatesTags: ['EnrolledCourses', 'Courses'],
    }),

    updateCourseProgress: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/enrollment/updateProgress/${slug}`,
        method: 'PUT',
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
            await dispatch(
              enrollmentApi.endpoints.updateCourseProgress.initiate(arg)
            );
          }
        }
      },
    }),
  }),
});

export const {
  useGetEnrolledCourseQuery,
  useEnrollCourseMutation,
  useUnenrollCourseMutation,
  useUpdateCourseProgressMutation,
} = enrollmentApi;
