import { configureStore } from "@reduxjs/toolkit";
import movie from "./Slices/movie";
import auth from "./Slices/auth";
import location from "./Slices/locationSlice";
import banner from "./Slices/bannerSlice";
import cinema from "./Slices/cinemaSlice";
import getSticket from "./Slices/getSticketSlice";
import booking from "./Slices/bookingSlice";
import loading from "./Slices/loadingSlice";

const store = configureStore({
    reducer: {
        movie,
        location,
        banner,
        cinema,
        getSticket,
        auth,
        booking,
        loading,
    },
});

// type cho hàm dispatch
export type AppDispatch = typeof store.dispatch;

// type cho state
export type RootState = ReturnType<typeof store.getState>;

export default store;
