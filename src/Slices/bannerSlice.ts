import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Banner } from "Interface/banner";
import bannerAPI from "Services/bannerAPI";

interface State {
    banners: Banner[];
    isLoading: boolean;
    error?: string;
}

const initialState: State = {
    banners: [],
    isLoading: false,
    error: undefined,
};

// dispatch action thunk
export const getBanner = createAsyncThunk("banner/getBanner", async () => {
    // call api
    try {
        const banners = await bannerAPI.getBanner();
        return banners;
    } catch (error) {
        console.log(error);
        throw error;
    }
});

const bannerSlice = createSlice({
    name: "banner",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getBanner.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getBanner.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.banners = payload;
        });
        builder.addCase(getBanner.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
        });
    },
});

export default bannerSlice.reducer;
