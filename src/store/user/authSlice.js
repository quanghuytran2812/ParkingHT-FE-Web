import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authService from 'apis';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

//Login
export const login = createAsyncThunk('auth/login', async (credentials) => {
  return await authService.apiLogin(credentials)
})

const initialState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
  current: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        try {
          if (action.payload?.statusCode === 200) {
            const userInfo = jwtDecode(action.payload.data.token);

            if (userInfo.role === "ROLE_ADMIN" || userInfo.role === "ROLE_MANAGER") {
              state.isAuthenticated = true;
              state.token = action.payload.data.token;
              state.current = userInfo
              toast.success(`${action.payload.message}`);
            } else {
              toast.error('You are not authorized to access this dashboard.');
            }
          } else {
            toast.error(`${action.payload.message}`);
          }
        } catch (err) {
          if (!err?.response) {
            toast.error('No Server Response');
          } else {
            toast.error(err);
          }
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.token = null
        state.isAuthenticated = false
        state.current = null
      })
  }
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


