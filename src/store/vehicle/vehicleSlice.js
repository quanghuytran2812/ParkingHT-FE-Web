import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as vehicleService from 'apis';
import { toast } from 'react-toastify';

// Fetch all vehicle
export const fetchVehicle = createAsyncThunk('vehicle/fetchVehicle', async () => {
    const response = await vehicleService.apiVehicle();
    return response.data;
});

// Delete a vehicle
export const deleteVehicle = createAsyncThunk('category/deleteVehicle', async (vehicleId) => {
    return await vehicleService.apiDeleteVehicle(vehicleId);
});

const vehicleSlice = createSlice({
    name: 'vehicle',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch vehicle
            .addCase(fetchVehicle.pending, (state) => {
                state.loading = true;
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
            })
            .addCase(deleteVehicle.fulfilled, (state,action) => {
                state.loading = false;
            })
            .addCase(deleteVehicle.rejected, (state,action) => {
                state.loading = false;
                toast.error("Không tìm thấy xe này!")
            })
    },
});

export default vehicleSlice.reducer;