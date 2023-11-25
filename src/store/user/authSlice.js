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
  isLoading: false
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

            if (userInfo.role === "Admin" || userInfo.role === "Manager") {
              state.isAuthenticated = true;
              state.token = action.payload.data.token;
              toast.success(`Đăng nhập thành công! Chào mừng bạn đến với ParkingHT.`);
            } else {
              toast.error('Bạn không được phép truy cập trang này!');
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
      .addCase(login.rejected, (state) => {
        state.isLoading = false
        state.token = null
        state.isAuthenticated = false
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


