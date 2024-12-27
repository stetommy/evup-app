import { apiSlice } from 'features/api/apiSlice';
import { authApi } from 'features/auth/authApi';
import { setSelectedLesson } from './courseSlice';
import { setRefreshTokenValidation } from 'features/auth/authSlice';

// const { push } = useRouter();

export const courseApi: any = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: '/course/create',
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
            await dispatch(courseApi.endpoints.createCourse.initiate(arg));
          }
        }
      },
      invalidatesTags: ['Courses'],
    }),

    allCourses: builder.query({
      query: () => '/course/myCourses',

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
            await dispatch(courseApi.endpoints.allCourses.initiate(null));
          }
        }
      },
      providesTags: ['Courses'],
    }),

    singleCourse: builder.query({
      query: (slug) => `/course/readCourse/${slug}`,
      async onQueryStarted(arg, { queryFulfilled, dispatch, getState }: any) {
        try {
          const result = await queryFulfilled;

          const initialLesson = result?.data?.lessons[0];
          const selectLesson: any = getState()?.course?.selectedLesson;

          if (!selectLesson) {
            dispatch(setSelectedLesson(initialLesson));
          }
        } catch (err) {
          console.error('Error in singleCourse query:', err);

          if (err?.error?.status === 401) {
            const res: any = await dispatch(
              authApi.endpoints.reFreshToken.initiate(null)
            );

            if (res?.error?.status === 401) {
              dispatch(setRefreshTokenValidation(false));
              return;
            }
            await dispatch(courseApi.endpoints.singleCourse.initiate(arg));
          }
        }
      },
    }),

    getCourseLessonInfo: builder.query({
      query: (queryString) => `/course/loadLesson/${queryString}`,
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
              courseApi.endpoints.getCourseLessonInfo.initiate(arg)
            );
          }
        }
      },
    }),

    getpublishedCourses: builder.query({
      query: () => '/course/publishedCourses',
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
              courseApi.endpoints.getpublishedCourses.initiate(null)
            );
          }
        }
      },

      providesTags: ['PublishedCourses'],
    }),

    makeCoursePublished: builder.mutation({
      query: (slug) => ({
        url: `course/publishCourse/${slug}`,
        method: 'PUT',
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
              courseApi.endpoints.makeCoursePublished.initiate(arg)
            );
          }
        }
      },
      invalidatesTags: ['Courses', 'PublishedCourses'],
    }),

    makeCourseUnpublished: builder.mutation({
      query: (slug) => ({
        url: `course/unPublishCourse/${slug}`,
        method: 'PUT',
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
              courseApi.endpoints.makeCourseUnpublished.initiate(arg)
            );
          }
        }
      },
      invalidatesTags: ['Courses', 'PublishedCourses'],
    }),
    removeCourse: builder.mutation({
      query: (slug) => ({
        url: `/course/remove/${slug}`,
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
            await dispatch(courseApi.endpoints.removeCourse.initiate(arg));
          }
        }
      },
      invalidatesTags: ['Courses', 'PublishedCourses'],
    }),
    editCourse: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/course/updateCourse/${slug}`,
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
            await dispatch(courseApi.endpoints.editCourse.initiate(arg));
          }
        }
      },
      invalidatesTags: ['Courses'],
    }),

    addLesson: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/course/addLesson/${slug}`,
        method: 'POST',
        body: data,
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          
          /* console.log(`Upload Progress: ${percentage}%`); */
        },
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
            await dispatch(courseApi.endpoints.addLesson.initiate(arg));
          }
        }
      },
    }),
    getLessonData: builder.query({
      query: (queryString) => `/course/loadLesson/${queryString}`,
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
            await dispatch(courseApi.endpoints.getLessonData.initiate(arg));
          }
        }
      },
    }),
    deleteLesson: builder.mutation({
      query: (queryString) => ({
        url: `/course/removeLesson/${queryString}`,
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
            await dispatch(courseApi.endpoints.deleteLesson.initiate(arg));
          }
        }
      },
    }),
    editingLesson: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/course/updateLesson/${slug}`,
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
            await dispatch(courseApi.endpoints.editingLesson.initiate(arg));
          }
        }
      },
      invalidatesTags: ['Lessons'],
    }),

    putRating: builder.mutation({
      query: ({ slug, data }) => ({
        url: `/course/rate/${slug}`,
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
            await dispatch(courseApi.endpoints.putRating.initiate(arg));
          }
        }
      },
    }),
    
  }),
});

export const {
  useAllCoursesQuery,
  useCreateCourseMutation,
  useGetpublishedCoursesQuery,
  useSingleCourseQuery,
  useGetCourseLessonInfoQuery,
  useMakeCoursePublishedMutation,
  useMakeCourseUnpublishedMutation,
  useRemoveCourseMutation,
  useEditCourseMutation,
  useAddLessonMutation,
  useGetLessonDataQuery,
  useDeleteLessonMutation,
  useEditingLessonMutation,
  usePutRatingMutation,
} = courseApi;
