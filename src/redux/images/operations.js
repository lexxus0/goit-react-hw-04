const ACCESS_KEY = import.meta.env.VITE_API_KEY;

import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

axios.defaults.baseURL = "https://api.unsplash.com/";

export const fetchImages = createAsyncThunk(
  "/search/photos",
  async ({ query, page }, thunkAPI) => {
    try {
      const res = await axios.get("/search/photos", {
        params: {
          client_id: ACCESS_KEY,
          query: query,
          page: page,
          per_page: 20,
        },
      });
      return res.data.results;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);
