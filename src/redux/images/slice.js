import { createSlice } from "@reduxjs/toolkit";
import { fetchImages } from "./operations";

const imagesSlice = createSlice({
  name: "images",
  initialState: { images: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        const uniqueImages = action.payload.filter(
          (newImage) => !state.images.some((image) => image.id === newImage.id)
        );

        state.images = state.images.concat(uniqueImages);
      })
      .addCase(fetchImages.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const imagesReducer = imagesSlice.reducer;
