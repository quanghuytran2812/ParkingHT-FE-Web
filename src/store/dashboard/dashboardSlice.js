import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as dashboardService from 'apis';

// Fetch dashboard
export const fetchDashboard = createAsyncThunk('dashboard/fetchDashboard', async () => {
    try {
        const res = await dashboardService.apiDashboard();
        return res;
    } catch (error) {
        throw error.response.data;
    }
});

const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState: {
        listMonthlyPayment: [],
        numberTotalInDay: 0,
        numberTotalRegister: 0,
        loading: false
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch dashboard
            .addCase(fetchDashboard.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchDashboard.fulfilled, (state, action) => {
                state.loading = false;
                state.listMonthlyPayment = action.payload.monthlyPayment;
                state.numberTotalInDay = action.payload.totalInDay;
                state.numberTotalRegister = action.payload.totalRegister;
            })
            .addCase(fetchDashboard.rejected, (state, action) => {
                state.loading = false;
            })
    },
});

export default dashboardSlice.reducer;