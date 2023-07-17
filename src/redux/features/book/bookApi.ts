import api from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: (query) => `/api/v1/books?${query as string}`,
    }),
    getBook: builder.query({
      query: (id) => `/api/v1/books/${id as string}`,
    }),
    createBook: builder.mutation({
      query: (data) => ({
        url: "/api/v1/books",
        method: "POST",
        body: data,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, data }) => ({
        url: `/api/v1/books/${id as string}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/api/v1/books/${id as string}`,
        method: "DELETE",
      }),
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: "/api/v1/comments",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["comment"],
    }),
    getComment: builder.query({
      query: (id) => `/api/v1/comments/${id as string}/product`,
      providesTags: ["comment"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useCreateCommentMutation,
  useGetCommentQuery,
} = bookApi;
