import { createAsyncThunk } from "@reduxjs/toolkit";
import * as apis from '../../apis'

export const getCurrent = createAsyncThunk('user/current', async (data, {rejecWithValue}) => {
    const response = await apis.apiGetUser();
    console.log("123: "+response);
    if(!response) return rejecWithValue(response)
    return response;
})