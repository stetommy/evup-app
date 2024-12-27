import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.BACKEND_ENDPOINT,
    credentials: 'include',
  }),

  tagTypes: [
    'Courses',
    'PublishedCourses',
    'EnrolledCourses',
    'Lessons',
    'Tags',
    'CourseTag',
    'Events',
  ],

  endpoints: (builder) => ({}),
});
