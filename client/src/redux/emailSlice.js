import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchEmails = createAsyncThunk(
  "emails/fetchEmails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://mailmaster.onrender.com/info/emails", {
        withCredentials: true,
      });
      return response.data.emails;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch emails"
      );
    }
  }
);

const emailSlice = createSlice({
  name: "emails",
  initialState: {
    emails: null,
    isLoading: false,
    error: null,
  },
  reducers: {
    setEmails: (state, action) => {
      state.emails = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEmails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.emails = action.payload;
      })
      .addCase(fetchEmails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setEmails } = emailSlice.actions;
export default emailSlice.reducer;
