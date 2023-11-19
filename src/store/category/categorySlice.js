import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as categoryService from 'apis';
import { toast } from 'react-toastify';

// Fetch all category
export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    const res = await categoryService.apiCategoryVehicle();
    return res.data;
});

// Delete a category
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (categoryId) => {
    return await categoryService.apiDeleteCategoryVehicle(categoryId);
});

// Update a category
export const updateCategory = createAsyncThunk('category/updateCategory', async (data) => {
    return await categoryService.apiUpdateCategoryVehicle(data);
});

// Create a category
export const createCategory = createAsyncThunk('category/createCategory', async (category) => {
    return await categoryService.apiCreateCategoryVehicle(category);
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        list: [],
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
            })
            // Delete category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
            })
            // Update category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                toast.success("Loại xe được cập nhật thành công!");
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                toast.error("Loại xe này đã có!")
            })
            //Create category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(createCategory.fulfilled, (state) => {       
                state.loading = false;
                toast.success("Loại xe được tạo mới thành công!");            
            })
            .addCase(createCategory.rejected, (state) => {
                state.loading = false;
                toast.error("Loại xe này đã có!")
            })
    },
});

export default categorySlice.reducer;