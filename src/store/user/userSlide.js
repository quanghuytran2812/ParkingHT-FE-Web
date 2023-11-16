import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from 'apis';

// Change password user
export const changepassUser = createAsyncThunk('user/changepassUser', async (id,data) => {
    const response = await userService.apiChangePassUser(id,data);
    return response.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder   
            // change pass user
            .addCase(changepassUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(changepassUser.fulfilled, (state,action) => {
                console.log(action)
                state.loading = false;

            })
            .addCase(changepassUser.rejected, (state) => {
                state.loading = false;
            })    
    },
});

export default userSlice.reducer;