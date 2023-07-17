import { createSlice } from "@reduxjs/toolkit";

type iUserState = {
  data: {
    _id: string;
    name: string;
    email: string;
  } | null;
};

const initialState: iUserState = {
  data: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    logout: (state) => {
      state.data = null;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
