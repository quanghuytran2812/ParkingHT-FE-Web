import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as parkingslotService from 'apis';
import { toast } from 'react-toastify';

// Fetch all parkingslot
export const fetchParkingslot = createAsyncThunk('parkingslot/fetchParkingslot', async () => {
    const response = await parkingslotService.apiParkingSlot();
    return response.data;
});

// Delete a parkingslot
export const deleteParkingslot = createAsyncThunk('parkingslot/deleteParkingslot', async (categoryId) => {
    const response = await parkingslotService.apiDeleteParkingSlot(categoryId);
    return response.data;
});

// Update a parkingslot
export const updateParkingslot = createAsyncThunk('parkingslot/updateParkingslot', async (data) => {
    const response = await parkingslotService.apiEditParkingSlot(data);
    return response.data;
});

// Create a parkingslot
export const createParkingslot = createAsyncThunk('parkingslot/createParkingslot', async (category) => {
    const res = await parkingslotService.apiAddParkingSlot(category);
    return res.data;
});

const parkingslotSlice = createSlice({
    name: 'parkingslot',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch parkingslot
            .addCase(fetchParkingslot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchParkingslot.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchParkingslot.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload.message;
            })
            // Delete parkingslot
            .addCase(deleteParkingslot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteParkingslot.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteParkingslot.rejected, (state) => {
                state.loading = false;
            })
            // Update parkingslot
            .addCase(updateParkingslot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateParkingslot.fulfilled, (state, action) => {
                state.loading = false;
                const updatedParkingSlot = action.payload;
                state.list = state.list.map((parkingslot) =>
                    parkingslot.parkingSlotId === updatedParkingSlot.parkingSlotId
                        ? updatedParkingSlot
                        : parkingslot
                );
            })
            .addCase(updateParkingslot.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            //Create parkingslot
            .addCase(createParkingslot.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createParkingslot.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    toast.success("Parking Slot created successfully");
                }

            })
            .addCase(createParkingslot.rejected, (state) => {
                state.loading = false;
            })
    },
});

export default parkingslotSlice.reducer;