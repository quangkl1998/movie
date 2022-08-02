import { createSlice } from "@reduxjs/toolkit";
import { Location } from "Interface/location";

const initialState: Location = {
    location: "Hồ Chí Minh",
    listLocation: [
        "Hồ Chí Minh",
        "Hà Nội",
        "Đà Nẵng",
        "Hải Phòng",
        "Biên Hòa",
        "Nha Trang",
        "Bình Dương",
        "Phan Thiết",
        "Hạ Long",
        "Cần Thơ",
        "Vũng Tàu",
    ],
};

const locationSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        setLocation: (state, { payload }) => {
            state.location = payload;
        },
    },
});

// action
export const { setLocation } = locationSlice.actions;

// reducer
export default locationSlice.reducer;
