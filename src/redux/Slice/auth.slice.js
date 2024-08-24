import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { setAlert } from "./alert.slice";
// import Alert from "../../user/component/Alert/Alert";


const initialState = {
    isAuthenticated: false,
    isLogout: true,
    isLoading: false,
    user: null,
    error: null,
};

export const register = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
    try {
        const response = await axiosInstance.post("users/register", data);
        if (response.status === 201) {
            return response.data
        }
    } catch (error) {
        console.log(error);

        return rejectWithValue("Registration Error" + error.response.data.message)
    }

});

export const login = createAsyncThunk(
    'auth/login',
    async (data, {dispatch,rejectWithValue }) => {
        try {
            console.log(data);
            const response = await axiosInstance.post('users/login', data);
            console.log(response);

            if (response.status === 200) {
                localStorage.setItem("_id",response.data.data._id)
                dispatch(setAlert({color:'success',message:response.data.message}))
                return response.data
            }
        } catch (error) {
            // console.log(error);
            return rejectWithValue('registration erorr.' + error.response.data.message)
        }

    }

)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, { dispatch,rejectWithValue }) => {
        try {

            const id=localStorage.getItem("_id")            
            const response = await axiosInstance.post('users/logout', { id });
            console.log(response);

            if (response.status === 200) {
                dispatch(setAlert({color:'success',message:response.data.message}))
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue('registration erorr.' + error.response.data.message)
        }
    }

)

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {


        try {
            const response = await axiosInstance.get("users/checkAuth");

            console.log(response);


            if (response.status === 200) {
                return response.data;
            }


        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response.data.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.isAuthenticated = true;
            state.isLogout = true;
            state.isLoading = false;
            state.user = action.payload;
            state.error = null
        })
            .addCase(register.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.isLogout = true;
                state.isLoading = false;
                state.user = null;
                state.error = action.payload
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true
                state.isLoading = false
                state.isLogout = false
                state.user = action.payload.data
                state.error = null
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false
                state.isLoading = false
                state.isLogout = true
                state.user = null
                state.error = action.payload
            })
            .addCase(logout.fulfilled, (state, action) => {
                state.isAuthenticated = false
                state.isLoading = false
                state.isLogout = true
                state.user = action.payload
                state.error = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.isAuthenticated = false
                state.isLoading = false
                state.isLogout = true
                state.error = action.payload
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.isLogout = false;
                state.user = action.payload.data;
                state.isLoading = false;
                state.error = null;
                console.log(action.payload.data);

            })
            .addCase(checkAuth.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.isLogout = true;
                state.isLoading = false;
                state.error = action.payload;
            })    

    },
});

export default authSlice.reducer