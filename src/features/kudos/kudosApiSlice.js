import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getReceivedKudos: builder.query({
      query: () => "kudos/received/",
      method: "GET",
      extraOptions: {
        requiresAuth: true,
      },
      providesTags: ["Kudos"],
    }),
    getGivenKudos: builder.query({
      query: () => "kudos/given/",
      method: "GET",
      extraOptions: {
        requiresAuth: true,
      },
      providesTags: ["Kudos"],
    }),
    getRemainingKudos: builder.query({
      query: () => "kudos/remaining/",
      method: "GET",
      extraOptions: {
        requiresAuth: true,
      },
      providesTags: ["Kudos"],
    }),

    createGiveKudo: builder.mutation({
      query: (payload) => ({
        url: "kudos/give/",
        method: "POST",
        body: payload,
        extraOptions: {
          requiresAuth: true,
        },
      }),
      invalidatesTags: ["Kudos"],
    }),
  }),
});

export const {
  useCreateGiveKudoMutation,
  useGetGivenKudosQuery,
  useGetReceivedKudosQuery,
  useGetRemainingKudosQuery,
  useLazyGetRemainingKudosQuery,
} = authApiSlice;
