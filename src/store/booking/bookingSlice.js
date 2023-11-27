import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as bookingService from 'apis';

// Fetch all booking
export const fetchBooking = createAsyncThunk('booking/fetchBooking', async () => {
    try {
        const response = await bookingService.apiGetAllBooking();
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
});

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch booking
            .addCase(fetchBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchBooking.rejected, (state, action) => {
                state.loading = false;
            })  
    },
});

export default bookingSlice.reducer;