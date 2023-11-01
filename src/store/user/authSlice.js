import { createSlice } from '@reduxjs/toolkit';
// import * as actions from './asyncActions'

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    token: null,
    user: null,
    isLoading: false
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    },
  },

  // // Code logic xử lý async action
  // extraReducers: (builder) => {
  //   // Bắt đầu thực hiện action login (Promise pending)
  //   builder.addCase(actions.getCurrent.pending, (state) => {
  //     // Bật trạng thái loading
  //     state.isLoading = true;
  //   });

  //   // Khi thực hiện action login thành công (Promise fulfilled)
  //   builder.addCase(actions.getCurrent.fulfilled, (state, action) => {
  //     // Tắt trạng thái loading, lưu thông tin user vào store
  //     state.isLoading = false;
  //     state.user = action.payload;
  //   });

  //   // Khi thực hiện action login thất bại (Promise rejected)
  //   builder.addCase(actions.getCurrent.rejected, (state, action) => {
  //     // Tắt trạng thái loading, lưu thông báo lỗi vào store
  //     state.isLoading = false;
  //     state.user = null;
  //   });
  // },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;