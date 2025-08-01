import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "token/",
        method: "POST",
        body: credentials,
      }),
      extraOptions: {
        requiresAuth: false,
      },
    }),
    getCurrentUser: builder.query({
      query: () => "me/",
      method: "GET",
      extraOptions: {
        requiresAuth: true,
      },
      keepUnusedDataFor: 0, // Prevent caching
    }),
    getAllUsers: builder.query({
      query: () => "users/",
      method: "GET",
      extraOptions: {
        requiresAuth: true,
      },
      keepUnusedDataFor: 0, // Prevent caching
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery, useGetAllUsersQuery } =
  authApiSlice;
