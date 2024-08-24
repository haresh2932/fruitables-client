import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../utils/utilis";
const initialState = {
  isLoading: false,
  salespeoples: [],
  error: null,
};

export const getSalespeople = createAsyncThunk("salespeople/get", async () => {
  const response = await axios.get(BASE_URL + "salespeople/get-salespeople");
  const data = response.data.data;
  console.log(data);
  return data;
});

export const addSalespeople = createAsyncThunk(
  "salespeople/add",
  async (data) => {
    const response = await axios.post(
      BASE_URL + "salespeople/add-salespeople",
      data
    );
    const AddData = response.data.data;
    return AddData;
  }
);

export const deleteSalespeople = createAsyncThunk(
  "salespeople/delete",
  async (snum) => {
    await axios.delete(BASE_URL + "salespeople/delete-salespeople/" + snum);
    return snum;
  }
);

export const updateSalespeople = createAsyncThunk(
  "salespeople/update",
  async (data) => {
    console.log("data", data);
    const response = await axios.put(
      BASE_URL + "salespeople/update-salespeople/" + data.snum,
      data
    );
    console.log(response);
    const dataUpdate = response.data.data;
    console.log(dataUpdate);
    return dataUpdate;
  }
);

const salespeopleSlice = createSlice({
  name: "salespeople",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSalespeople.fulfilled, (state, action) => {
        state.salespeoples = action.payload;
      })
      .addCase(addSalespeople.fulfilled, (state, action) => {
        state.salespeoples = state.salespeoples.concat(action.payload);
      })
      .addCase(deleteSalespeople.fulfilled, (state, action) => {
        state.salespeoples = state.salespeoples.filter(
          (salespeople) => salespeople.snum !== action.payload
        );
      })
      .addCase(updateSalespeople.fulfilled, (state, action) => {
        console.log(state, action);
        state.salespeoples = state.salespeoples.map((salespeople) => {
          if (salespeople.snum === action.payload.snum) {
            return action.payload;
          }
          return salespeople;
        });
      });
  },
});

export default salespeopleSlice.reducer;