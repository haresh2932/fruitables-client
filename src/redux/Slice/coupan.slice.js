import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { BASE_URL } from "../../utils/utilis"

const initialState = {
    isLoading: false,
    coupan: [],
    error: null
}

export const getCoupan = createAsyncThunk(
    'coupan/get',

    async () => {
        try {
            const response = await axios.get(BASE_URL + 'coupan')
            return (response.data);
        } catch (error) {
            return error.message
        }
    }

)

export const addCoupan = createAsyncThunk(
    'coupan/add',
    async (data) => {
        console.log(data);
        try {
            const response = await axios.post(BASE_URL + 'coupan', data)
            return response.data
        } catch (error) {
            return error.message
        }
    }

)

export const deleteCoupan = createAsyncThunk(
    'coupan/delete',
    async (id) => {
        try {
            await axios.delete(BASE_URL + 'coupan/' + id)
            return id;
        } catch (error) {
            return error.message
        }
    }
)

export const editCoupan = createAsyncThunk(
    'coupan/edit',
    async (data) => {
        console.log(data);
        try {
            const response = await axios.put(BASE_URL + 'coupan/' + data.id, data)
            console.log(response.data);
            return response.data
        } catch (error) {
            return error.message
        }

    }
)

const coupanSlice = createSlice({
    name: "coupan",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(addCoupan.fulfilled, (state, action) => {
            console.log(state, action);
            state.coupan = state.coupan.concat(action.payload)
        })
        builder.addCase(getCoupan.fulfilled, (state, action) => {
            state.coupan = action.payload;
        })
        builder.addCase(deleteCoupan.fulfilled, (state, action) => {
            state.coupan = state.coupan.filter((v) => v.id !== action.payload);
        })
        builder.addCase(editCoupan.fulfilled, (state, action) => {
            state.coupan = state.coupan.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                   return v
                }
            })
        })
    }

})

export default coupanSlice.reducer