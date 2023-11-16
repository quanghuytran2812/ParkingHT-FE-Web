import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as vehicleService from 'apis';

// Fetch all vehicle
export const fetchVehicle = createAsyncThunk('vehicle/fetchVehicle', async () => {
    const response = await vehicleService.apiVehicle();
    return response.data;
});

// Delete a vehicle
export const deleteVehicle = createAsyncThunk('category/deleteVehicle', async (vehicleId) => {
    const response =  await vehicleService.apiDeleteVehicle(vehicleId);
    return response.data;
});

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch vehicle
            .addCase(fetchVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchVehicle.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchVehicle.rejected, (state) => {
                state.loading = false;
            })
            // Delete vehicle
            .addCase(deleteVehicle.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteVehicle.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteVehicle.rejected, (state) => {
                state.loading = false;
            })
    },
});

export default vehicleSlice.reducer;