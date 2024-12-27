import { apiSlice } from 'features/api/apiSlice';
import { authApi } from 'features/auth/authApi';
import { setRefreshTokenValidation } from 'features/auth/authSlice';

export const tagsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTags: builder.query({
      query: () => '/tag/read',
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
            await dispatch(tagsApi.endpoints.getAllTags.initiate(null));
          }
        }
      },
      providesTags: ['Tags'],
    }),
    addCourseToTag: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/tag/addCourse/${slug}`,
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
            await dispatch(tagsApi.endpoints.addCourseToTag.initiate(arg));
          }
        }
      },
      invalidatesTags: ['CourseTag'],
    }),
    removeCourseFromTag: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/tag/removeCourse/${slug}`,
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
            await dispatch(tagsApi.endpoints.removeCourseFromTag.initiate(arg));
          }
        }
      },
      invalidatesTags: ['CourseTag'],
    }),
    getCourseTags: builder.query({
      query: (slug) => `/tag/readTags/${slug}`,
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
            await dispatch(tagsApi.endpoints.getCourseTags.initiate(arg));
          }
        }
      },
      providesTags: ['CourseTag'],
    }),
  }),
});

export const {
  useGetAllTagsQuery,
  useAddCourseToTagMutation,
  useRemoveCourseFromTagMutation,
  useGetCourseTagsQuery,
} = tagsApi;
