import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as feedbackService from 'apis';

// Fetch all feedback
export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async () => {
    const response = await feedbackService.apigetFeedback();
    return response.data;
});

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        list: [],
        loading: false,
        error: null,
        countUnread: 0,
        listUnread: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch report
            .addCase(fetchFeedback.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchFeedback.rejected, (state) => {
                state.loading = false;
            }) 
    },
});

export default feedbackSlice.reducer;