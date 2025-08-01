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
    }),
    getAllUsers: builder.query({
      query: () => "users/",
      method: "GET",
      extraOptions: {
        requiresAuth: true,
      },
    }),
  }),
});

export const { useLoginMutation, useGetCurrentUserQuery, useGetAllUsersQuery } =
  authApiSlice;
