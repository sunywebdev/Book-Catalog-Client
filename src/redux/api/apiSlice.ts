import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://book-catalog-server-production.up.railway.app",
	}),
	endpoints: () => ({}),
	tagTypes: ["books", "comment"],
});

export default api;
