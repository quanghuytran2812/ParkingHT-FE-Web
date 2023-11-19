import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as userService from 'apis';

// Change password user
export const changepassUser = createAsyncThunk('user/changepassUser', async (id,data) => {
    return await userService.apiChangePassUser(id,data);
});

const userSlice = createSlice({
    name: 'user',
    initialState: {
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder   
            // change pass user
            .addCase(changepassUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(changepassUser.fulfilled, (state,action) => {
                console.log("1")
                console.log(action)
                state.loading = false;

            })
            .addCase(changepassUser.rejected, (state,action) => {
                console.log("2")
                console.log(action)
                state.loading = false;
            })    
    },
});

export default userSlice.reducer;