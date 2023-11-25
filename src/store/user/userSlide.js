import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from 'apis';
import { jwtDecode } from 'jwt-decode';

// Change password user
export const changepassUser = createAsyncThunk('user/changepassUser', async (id, data) => {
    return await userService.apiChangePassUser(id, data);
});
//Get user by id
export const fetchGetUserById = createAsyncThunk('auth/userbuid', async (userid, thunkAPI) => {
    try {
        const tokenData = thunkAPI.getState().auth.token;
        const userInfo = jwtDecode(tokenData);
        const res = await userService.apiGetUserById(userInfo.id, tokenData)
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        current: null,
        mess: ''
    },
    reducers: {
        clearMessage: (state) => {
            state.mess = ''
        }
    },
    extraReducers: (builder) => {
        builder
            // fetch user
            .addCase(fetchGetUserById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchGetUserById.fulfilled, (state, action) => {
                state.loading = false;
                state.current = action.payload
            })
            .addCase(fetchGetUserById.rejected, (state, action) => {
                state.loading = false;
                state.current = null
                state.mess = 'Phiên đăng nhập đã hết hạn. Hãy đăng nhập lại!'
            })
    },
});
export const { clearMessage } = userSlice.actions
export default userSlice.reducer;