import { apiSlice } from "../../app/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getKudosSummary: builder.query({
      query: () => "kudos/summary/",
      method: "GET",
      extraOptions: {
        requiresAuth: true,
      },
      providesTags: ["Kudos"],
      keepUnusedDataFor: 0,
    }),

    getRemainingKudos: builder.query({
      query: () => "kudos/remaining/",
      method: "GET",
      extraOptions: {
        requiresAuth: true,
      },
      providesTags: ["Kudos"],
      keepUnusedDataFor: 0,
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
  useGetRemainingKudosQuery,
  useLazyGetRemainingKudosQuery,
  useGetKudosSummaryQuery,
} = authApiSlice;
