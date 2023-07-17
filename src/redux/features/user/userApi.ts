import api from "../../api/apiSlice";

const userApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (id: string) => `/api/v1/users/${id}`,
		}),
		updateUser: builder.mutation({
			query: ({ id, data }) => ({
				url: `/api/v1/users/${id as string}`,
				method: "PATCH",
				body: data,
			}),
		}),
		updateUserWishlist: builder.mutation({
			query: ({ id, data }) => ({
				url: `/api/v1/users/${id as string}/wishlist`,
				method: "PATCH",
				body: data,
			}),
		}),
		signUpUser: builder.mutation({
			query: (data) => ({
				url: `/api/v1/auth/signup`,
				method: "POST",
				body: data,
			}),
		}),
		signInUser: builder.mutation({
			query: (data) => ({
				url: `/api/v1/auth/login`,
				method: "POST",
				body: data,
			}),
		}),
		getMe: builder.query({
			query: (token) => ({
				url: "/api/v1/auth/getLoggedInUser",
				headers: {
					authorization: token,
				},
			}),
		}),
		wishlist: builder.query({
			query: (id: string) => `/api/v1/users/${id}/wishlist`,
		}),
	}),
});

export const {
	useGetUserQuery,
	useUpdateUserMutation,
	useUpdateUserWishlistMutation,
	useSignUpUserMutation,
	useSignInUserMutation,
	useGetMeQuery,
	useWishlistQuery,
} = userApi;
