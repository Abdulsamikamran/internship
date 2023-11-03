import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: null,
  isPending: false,
  success: false,
  error: false,
  filters: {
    price: {
      upperLimit: 10000,
      lowerLimit: 0,
    },
    category_id: null,
    title: "",
  },
};

export const productsFetch = createAsyncThunk(
  //action creator
  "products/productsFetch",
  async (filterCriteria, { rejectWithValue }) => {
    try {
      if (filterCriteria?.upperLimit) {
        let price = {
          upperLimit: filterCriteria.upperLimit,
          lowerLimit: filterCriteria.lowerLimit,
        };
        filterCriteria = {
          ...filterCriteria,
          price,
        };
        delete filterCriteria.lowerLimit;
        delete filterCriteria.upperLimit;
      }
      let response = await axios.post(
        "http://localhost:3002/api/product/view",
        filterCriteria
      );
      return response;
    } catch (error) {
      if (error.response.data.message && error.message) {
        return rejectWithValue(error.response.error.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    updatePriceRange: (state, action) => {
      state.filters.priceRange = action.payload;
    },
    updateCategory: (state, action) => {
      state.filters.category = action.payload;
    },
  }, // generate action creaters and handle the state for those actions creaters
  extraReducers: {
    //onli handle action types
    [productsFetch.pending]: (state, action) => {
      state.isPending = true;
    },

    [productsFetch.fulfilled]: (state, action) => {
      state.success = "success";
      state.items = action.payload.data;
      state.isPending = false;
    },

    [productsFetch.rejected]: (state, action) => {
      state.error = true;
    },
  },
});
export default productSlice.reducer;
