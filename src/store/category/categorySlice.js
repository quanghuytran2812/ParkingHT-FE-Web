import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as categoryService from 'apis';
import { toast } from 'react-toastify';

// Fetch all category
export const fetchCategories = createAsyncThunk('category/fetchCategories', async () => {
    const response = await categoryService.apiCategoryVehicle();
    return response.data;
});

// Delete a category
export const deleteCategory = createAsyncThunk('category/deleteCategory', async (categoryId) => {
    const response =  await categoryService.apiDeleteCategoryVehicle(categoryId);
    return response.data;
});

// Update a category
export const updateCategory = createAsyncThunk('category/updateCategory', async (data) => {
    const response = await categoryService.apiUpdateCategoryVehicle(data);
    return response.data;
});

// Create a category
export const createCategory = createAsyncThunk('category/createCategory', async (category) => {
    const res = await categoryService.apiCreateCategoryVehicle(category);
    return res.data;
});

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        list: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch categories
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.loading = false;
                state.list = action.payload;
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.loading = false;
                // state.error = action.payload.message;
            })
            // Delete category
            .addCase(deleteCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(deleteCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            // Update category
            .addCase(updateCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCategory.fulfilled, (state, action) => {
                state.loading = false;
                const updatedCategory = action.payload;
                state.list = state.list.map((category) =>
                    category.vehicleCategoryId === updatedCategory.vehicleCategoryId
                        ? updatedCategory
                        : category
                );
            })
            .addCase(updateCategory.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
            })
            //Create category
            .addCase(createCategory.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCategory.fulfilled, (state,action) => {           
                state.loading = false;
                if(action.payload){
                    toast.success("Category created successfully");
                }
                
            })
            .addCase(createCategory.rejected, (state,action) => {
                console.log(action)
                state.loading = false;
                state.error = action.payload.message;
            })
    },
});

export default categorySlice.reducer;