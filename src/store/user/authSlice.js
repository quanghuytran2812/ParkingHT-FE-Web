import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authService from 'apis';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import getTokenInfo from 'ultils/AuthHeader';

//Login
export const login = createAsyncThunk('auth/login', async (credentials) => {
  return await authService.apiLogin(credentials)
})
//Get user by id
export const fetchGetUserById = createAsyncThunk('auth/userbuid', async (userid) => {
  let tokenData = getTokenInfo();
  if (tokenData) {
    return authService.apiGetUserById(tokenData.id);
  }
  return authService.apiGetUserById(userid);
});

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
      // Fetch categories
      .addCase(fetchGetUserById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGetUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload.data;
      })
      .addCase(fetchGetUserById.rejected, (state) => {
        state.isLoading = false;
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


