import { createSlice } from "@reduxjs/toolkit"

const initialState={
    color:'',
    message:''
}

const alertSlice=createSlice({
    name:'alert',
    initialState,
    reducers:{
        setAlert:(state,action)=>{
            state.color=action.payload.color;
            state.message=action.payload.message;
        },
        resetAlert:(state,action)=>{
            state.color='';
            state.message=''
        }

    }
})

export const {setAlert,resetAlert}=alertSlice.actions
export default alertSlice.reducer