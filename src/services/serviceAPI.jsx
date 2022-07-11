import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://connections-api.herokuapp.com",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().users.token;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }

    return headers;
  },
});

export const serviceAPI = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["User", "Contact"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) => ({
        url: `/users/signup`,
        method: "POST",
        body: user,
      }),

      invalidatesTags: ["User"],
    }),

    loginUser: builder.mutation({
      query: (user) => ({
        url: `/users/login`,
        method: "POST",
        body: user,
      }),

      invalidatesTags: ["User"],
    }),

    logOutUser: builder.mutation({
      query: (user) => ({
        url: `/users/logout`,
        method: "POST",
        body: user,
      }),

      invalidatesTags: ["User"],
    }),

    getCurrentUser: builder.query({
      query: () => ({
        url: `/users/current`,
        method: "GET",
      }),
      invalidatesTags: ["User"],
    }),

    fetchContacts: builder.query({
      query: () => "/contacts",
      providesTags: ["Contact"],
    }),

    deleteContact: builder.mutation({
      query: (contactId) => ({
        url: `/contacts/${contactId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contact"],
    }),

    addContact: builder.mutation({
      query: (newContact) => ({
        url: "/contacts",
        method: "POST",
        body: newContact,
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetCurrentUserQuery,
  useLogOutUserMutation,
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = serviceAPI;
