import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/utilis"

const initialState = {
    isLoading: false,
    subcategories: [],
    error: null
}

export const getsubData = createAsyncThunk(
    'subcategory/get',
    async () => {
        const response = await axios.get(BASE_URL + "subcategories/list-subcategories")
        const data = response.data.data
        return data
    }
)

export const handleAdd = createAsyncThunk(
    'subcategory/add',
    async (data) => {
        const response = await axios.post(BASE_URL + "subcategories/add-subcategory", data)
        const dataAdd = response.data.data
        return dataAdd
    }
)

export const handleUpdateData = createAsyncThunk(
    'subcategory/edit',
    async (data) => {
        const response = await axios.put(BASE_URL + "subcategories/update-subcategory/" + data._id, data)

        return data
    }
)

export const handleRemove = createAsyncThunk(
    'subcategory/delete',
    async (id) => {
        await axios.delete(BASE_URL + "subcategories/delete-subcategory/" + id)
        return id
    }
)


const subcategoriesSlice = createSlice({
    name: 'subcategory',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getsubData.fulfilled, (state, action) => {
            console.log(state, action);
            state.subcategories = action.payload
            })
            .addCase(handleAdd.fulfilled, (state, action) => {
                console.log(state, action);
                state.subcategories = state.subcategories.concat(action.payload)
            })
            .addCase(handleUpdateData.fulfilled, (state, action) => {
                state.subcategories = state.subcategories.map((v) => {
                    if (v._id === action.payload._id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            })
            .addCase(handleRemove.fulfilled, (state, action) => {
                console.log(state, action);
                state.subcategories = state.subcategories.filter((v) => v._id !== action.payload)
            })
    }
})

export default subcategoriesSlice.reducer