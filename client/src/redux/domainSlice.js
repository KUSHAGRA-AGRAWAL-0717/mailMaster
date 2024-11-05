// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";

// const fetchDomains = createAsyncThunk(
//   "domains/fetchDomains",
//   async (_, { rejectWithValue }) => {
//     try {
//       const response = await axios.get("http://localhost:5000/info/domains", {
//         withCredentials: true,
//       });
//       return response.data.domains;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to fetch domains"
//       );
//     }
//   }
// );

// const addDomain = createAsyncThunk(
//   "domains/addDomain",
//   async (domainName, { rejectWithValue }) => {
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/info/add-domain",
//         { domainName },
//         { withCredentials: true }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(
//         error.response?.data?.message || "Failed to add domain"
//       );
//     }
//   }
// );

// const domainSlice = createSlice({
//   name: "domains",
//   initialState: {
//     domains: [],
//     isLoading: false,
//     error: null,
//   },
//   reducers: {
//     setDomains: (state, action) => {
//       state.domains = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchDomains.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchDomains.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.domains = action.payload;
//       })
//       .addCase(fetchDomains.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       })
//       .addCase(addDomain.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(addDomain.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.domains = [...state.domains, action.payload];
//       })
//       .addCase(addDomain.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const { setDomains } = domainSlice.actions;
// export { fetchDomains, addDomain };
// export default domainSlice.reducer;




////////////////////////////////////////////////////
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch domains from the server
export const fetchDomains = createAsyncThunk(
  "domains/fetchDomains",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://mailmaster.onrender.com/info/domains", {
        withCredentials: true,
      });
      return response.data.domains;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch domains"
      );
    }
  }
);

// Add a new domain
export const addDomain = createAsyncThunk(
  "domains/addDomain",
  async (domainName, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "https://mailmaster.onrender.com/info/add-domain",
        { domainName },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      );
      return response.data.domain;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add domain"
      );
    }
  }
);

const domainSlice = createSlice({
  name: "domains",
  initialState: {
    domains: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setDomains: (state, action) => {
      state.domains = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetch domains
      .addCase(fetchDomains.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchDomains.fulfilled, (state, action) => {
        state.isLoading = false;
        state.domains = action.payload;
      })
      .addCase(fetchDomains.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Handle add domain
      .addCase(addDomain.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addDomain.fulfilled, (state, action) => {
        state.isLoading = false;
        state.domains = [...state.domains, action.payload]; 
      })
      .addCase(addDomain.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setDomains } = domainSlice.actions;
export default domainSlice.reducer;
