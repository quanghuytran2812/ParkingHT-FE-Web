import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as authService from 'apis';
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

//Login
export const login = createAsyncThunk('auth/login', async (credentials) => {
  return await authService.apiLogin(credentials)
})
//Get user by id
export const fetchGetUserById = createAsyncThunk('auth/userbuid', async (userid,thunkAPI) => {
  const tokenData = thunkAPI.getState().auth.token;
  if (tokenData) {
    const userInfo = jwtDecode(tokenData);
    return await authService.apiGetUserById(userInfo.id);
  } else {
    throw new Error('Token not found');
  }
});

const initialState = {
  isAuthenticated: false,
  token: null,
  isLoading: false,
  current: null,
  mess: ''
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    clearMessage: (state) => {
      state.mess = ''
    }
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
      // Fetch user
      .addCase(fetchGetUserById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.current = action.payload.data;
      })
      .addCase(fetchGetUserById.rejected, (state) => {
        state.isLoading = false;
        // state.current = null;
        // state.isAuthenticated =null;
        // state.token = null;
        // state.mess = 'Phiên d'
      })
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;


