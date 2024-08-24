import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/utilis"

const initialState = {
    isLoading: false,
    variants: [],
    error: null
}

export const getVariantData = createAsyncThunk(
    'variant/get',
    async () => {
        const response = await axios.get(BASE_URL + "variants/list-variants")
        console.log(response);
        const data = response.data.data
        console.log(data);        
        return data
    }
)

export const handleAdd = createAsyncThunk(
    'variants/add',
    async (data) => {
        console.log(data);
        const response = await axios.post(BASE_URL + "variants/add-variants", data,{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(response);
        const dataAdd = response.data.data
        console.log(dataAdd);
        return dataAdd
    }
)

export const handleUpdateData = createAsyncThunk(
    'variants/edit',
    async (data) => {
        const response = await axios.put(BASE_URL + "variants/update-variant/" + data._id, data)

        return data
    }
)

export const handleRemove = createAsyncThunk(
    'variants/delete',
    async (id) => {
        await axios.delete(BASE_URL + "variants/delete-variant/" + id)
        return id
    }
)


const variantsSlice = createSlice({
    name: 'variant',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getVariantData.fulfilled, (state, action) => {
            console.log(state, action);
            state.variants = action.payload
            })
            .addCase(handleAdd.fulfilled, (state, action) => {
                console.log(state, action);
                state.variants = state.variants.concat(action.payload)
            })
            .addCase(handleUpdateData.fulfilled, (state, action) => {
                state.variants = state.variants.map((v) => {
                    if (v._id === action.payload._id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            })
            .addCase(handleRemove.fulfilled, (state, action) => {
                console.log(state, action);
                state.variants = state.variants.filter((v) => v._id !== action.payload)
            })
    }
})

export default variantsSlice.reducer