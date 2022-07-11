import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: { name: null, email: null },
  token: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    registerUser(state, { payload }) {
      state.user = payload.user.user;
      state.token = payload.user.token;
      state.isLoggedIn = true;
    },

    loginUser(state, action) {
      state.user = action.payload.user.user;
      state.token = action.payload.user.token;
      state.isLoggedIn = true;
    },

    logoutUser(state) {
      state.user.name = null;
      state.user.email = null;
      state.token = null;
      state.isLoggedIn = false;
    },

    refreshToken: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { registerUser, loginUser, logoutUser, refreshToken } =
  authSlice.actions;

export default authSlice.reducer;
