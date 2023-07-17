import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type iUserState = {
	data: {
		_id: string;
		name: string;
		email: string;
	} | null;
	isLoading: boolean; 
};

const initialState: iUserState = {
	data: null,
	isLoading: false, 
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<iUserState["data"]>) => {
			state.data = action.payload;
			state.isLoading = false; 
		},
		logout: (state) => {
			state.data = null;
			state.isLoading = false;
			localStorage.removeItem("token");
		},
	},
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
