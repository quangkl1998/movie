import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Booking, Seat } from "Interface/booking";
import { useNavigate } from "react-router-dom";
import authAPI from "Services/authAPI";
import bookingAPI from "Services/bookingAPI";
import Swal from "sweetalert2";
import { hideLoading, showLoading } from "./loadingSlice";

interface State {
    bookingSticket: Booking | null;
    listSeatBooked: Seat[];
    isLoading: boolean;
    error?: string;

    tabActive: string;

    infoBooked: any;
}

const initialState: State = {
    bookingSticket: null,
    listSeatBooked: [],
    isLoading: false,
    error: undefined,

    tabActive: "1",

    infoBooked: null,
};

export const getBookingSticket = createAsyncThunk("booking/getBookingSticket", async (MaLichChieu: number) => {
    try {
        const bookingSticket = await bookingAPI.getBookingSticket(MaLichChieu);
        return bookingSticket;
    } catch (error) {
        throw error;
    }
});

export const getSticketAction = createAsyncThunk("booking/getSticketAction", async (data: any, { dispatch }) => {
    try {
        dispatch(showLoading());

        const result = await bookingAPI.getSticketAction(data);

        // đặt vé thành công call api load lại danh sách phòng vé
        await dispatch(getBookingSticket(data.maLichChieu));

        await dispatch(removeListSeatBooked());

        dispatch(changeTab("2"));

        dispatch(hideLoading());

        return result;
    } catch (error) {
        dispatch(hideLoading());
        throw error;
    }
});

export const getInfoBooked = createAsyncThunk("auth/getInfoBooked", async () => {
    try {
        const infoBooked = await authAPI.getInfoBooked();
        console.log(infoBooked);
        return infoBooked;
    } catch (error) {}
});

const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        bookTicket: (state, { payload }) => {
            let idx = state.listSeatBooked.findIndex((seatBooked) => seatBooked.maGhe === payload?.maGhe);
            if (idx != -1) {
                console.log(123444);
                state.listSeatBooked = state.listSeatBooked.filter((seat) => seat.maGhe !== payload?.maGhe);
            } else {
                state.listSeatBooked.push(payload);
            }
        },
        removeListSeatBooked: (state) => {
            state.listSeatBooked = [];
            console.log(123123);
        },
        changeTab: (state, { payload }) => {
            state.tabActive = payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(getBookingSticket.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getBookingSticket.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.bookingSticket = payload;
        });
        builder.addCase(getBookingSticket.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
        });
        builder.addCase(getSticketAction.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSticketAction.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            Swal.fire({
                title: "Notification",
                text: "Đặt vé thành công! Kiểm tra vé trong email!",
                icon: "success",
                confirmButtonColor: "#44c020",
            });
        });
        builder.addCase(getSticketAction.rejected, (state, { error }) => {
            state.isLoading = false;
            state.error = error.message;
            Swal.fire({
                title: "Đặt Vé Thất Bại!",
                text: error.message,
                icon: "error",
            });
        });
        builder.addCase(getInfoBooked.pending, (state) => {});
        builder.addCase(getInfoBooked.fulfilled, (state, { payload }) => {
            state.infoBooked = payload;
        });
        builder.addCase(getInfoBooked.rejected, (state, { error }) => {
            state.error = error.message;
        });
    },
});

// action
export const { bookTicket, removeListSeatBooked, changeTab } = bookingSlice.actions;

export default bookingSlice.reducer;
