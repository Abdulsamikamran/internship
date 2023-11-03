// userSlice.js
import { useNavigate } from "react-router-dom";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import axios from "axios";
const initialState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage?.getItem("userInfo"))
    : null, // You can store user data here
  tokenInfo: localStorage.getItem("tokenInfo")
    ? JSON.parse(localStorage?.getItem("tokenInfo"))
    : null, // Retrieve token from local storage
};

export const userSignIn = createAsyncThunk(
  //action creator
  "userInfo",
  async (arg, { rejectWithValue }) => {
    // const navigate = useNavigate();
    try {
      let response = await axios.post(
        "http://localhost:3002/api/client/login",
        arg.body
      );
      localStorage.setItem(
        "tokenInfo",
        JSON.stringify(response.data.result.tokenInfo)
      );
      localStorage.setItem(
        "userInfo",
        JSON.stringify(response.data.result.clientInfo)
      );
      arg?.navigate("/home");
      return response.data.result;
    } catch (error) {
      if (error.response.data.message && error.message) {
        return rejectWithValue(error.response.error.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.userInfo = null;
      state.tokenInfo = null;
      localStorage.removeItem("tokenInfo"); // Remove token from local storage
    },
  },
  extraReducers: {
    [userSignIn.pending]: (state, action) => {
      state.isPending = true;
    },

    [userSignIn.fulfilled]: (state, action) => {
      state.success = "success";
      state.userInfo = action.payload.userInfo;
      state.tokenInfo = action.payload.tokenInfo;
      state.isPending = false;
    },

    [userSignIn.rejected]: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
