import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as feedbackService from 'apis';

// Fetch all feedback
export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async () => {
    const response = await feedbackService.apigetFeedback();
    return response.data;
});

// Fetch all Feedback Unread
export const fetchFeedbackUnread = createAsyncThunk('feedback/fetchFeedbackUnread', async (feedback, thunkAPI) => {
    try {
        const tokenData = thunkAPI.getState().auth.token;
        const response = await feedbackService.apiListFeedbackUnread(tokenData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

// Fetch count Feedback Unread
export const fetchCountFeedbackUnread = createAsyncThunk('feedback/fetchCountFeedbackUnread', async (feedback, thunkAPI) => {
    try {
        const tokenData = thunkAPI.getState().auth.token;
        const response = await feedbackService.apiCountFeedbackUnread(tokenData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState: {
        list: [],
        loading: false,
        countUnreadF: 0,
        listUnreadF: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch report
            .addCase(fetchFeedback.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchFeedback.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchFeedback.rejected, (state) => {
                state.loading = false;
            })
            //fetch count feedback unread
            .addCase(fetchCountFeedbackUnread.fulfilled, (state, action) => {
                state.loading = false;
                state.countUnreadF = action.payload;
            })
            .addCase(fetchCountFeedbackUnread.rejected, (state) => {
                state.loading = false;
            })
            //fetch feedback unread
            .addCase(fetchFeedbackUnread.fulfilled, (state, action) => {
                state.loading = false;
                state.listUnreadF = action.payload;
            })
            .addCase(fetchFeedbackUnread.rejected, (state) => {
                state.loading = false;
            })
    },
});

export default feedbackSlice.reducer;