import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const api = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({
		baseUrl: "http://localhost:5000",
	}),
	endpoints: () => ({}),
	tagTypes: ["books", "comment"],
});

export default api;
