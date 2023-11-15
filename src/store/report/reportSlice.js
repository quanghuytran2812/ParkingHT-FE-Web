import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as reportService from 'apis';

// Fetch all report
export const fetchReport = createAsyncThunk('report/fetchReport', async () => {
    const response = await reportService.apigetallReport();
    return response.data;
});

// Fetch all report
export const fetchReportUnread = createAsyncThunk('report/fetchReportUnread', async () => {
    const response = await reportService.apiListReportUnread();
    return response.data;
});

// Fetch all report
export const fetchCountReportUnread = createAsyncThunk('report/fetchCountReportUnread', async () => {
    const response = await reportService.apiCountReportUnread();
    return response.data;
});

// Update a report
export const updateReport = createAsyncThunk('report/updateReport', async (data) => {
    const response = await reportService.apiUpdateReport(data);
    return response.data;
});

const reportSlice = createSlice({
    name: 'report',
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
            .addCase(fetchReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReport.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })      
            // Update report
            .addCase(updateReport.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateReport.fulfilled, (state, action) => {
                state.loading = false;
                const updatedReport = action.payload;
                state.list = state.list.map((report) =>
                    report.reportId === updatedReport.reportId
                        ? updatedReport
                        : report
                );
            })
            .addCase(updateReport.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })    
            //fetch count report unread
            .addCase(fetchCountReportUnread.fulfilled, (state, action) => {
                state.loading = false;
                state.countUnread = action.payload;
            })
            .addCase(fetchCountReportUnread.rejected, (state) => {
                state.loading = false;
            }) 
            //fetch report unread
            .addCase(fetchReportUnread.fulfilled, (state, action) => {
                state.loading = false;
                state.listUnread = action.payload;
            })
            .addCase(fetchReportUnread.rejected, (state) => {
                state.loading = false;
            }) 
    },
});

export default reportSlice.reducer;