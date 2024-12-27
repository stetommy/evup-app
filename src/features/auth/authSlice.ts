import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: undefined,
  isRefreshTokenValid: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    userLoggedIn: (state, action) => {
      state.user = action.payload;
    },
    setRefreshTokenValidation: (state, action) => {
      state.isRefreshTokenValid = action.payload;
    },
  },
});

export const { userLoggedIn, setRefreshTokenValidation } = authSlice.actions;
export default authSlice.reducer;
