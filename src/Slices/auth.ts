import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginValues, RegisterValues } from "Interface/login";
import { UserLogin } from "Interface/user";
import authAPI from "Services/authAPI";
import Swal from "sweetalert2";

interface State {
    user: UserLogin | null;
    isLoading: boolean;
    error?: string;
}

const initialState: State = {
    user: JSON.parse(localStorage.getItem("userLogin") as string) || null,
    isLoading: false,
    error: undefined,
};

// viết actions login và register
export const getLogin = createAsyncThunk("auth/getLogin", async (userLogin: LoginValues) => {
    try {
        const data = await authAPI.login(userLogin);

        if (data.taiKhoan) {
            // Lưu thông tin user xuống localStorage
            localStorage.setItem("userLogin", JSON.stringify(data));
            localStorage.setItem("accessToken", data.accessToken);
            localStorage.setItem("typeUser", JSON.stringify(data.maLoaiNguoiDung));
            return data;
        } else {
            Swal.fire({
                icon: "error",
                title: "Tài khoản hoặc mật khẩu không đúng",
            });
            return null;
        }
    } catch (error) {
        throw error;
    }
});

export const registerUser = createAsyncThunk("auth/registerUser", async (userRegister: RegisterValues, action) => {
    try {
        const results = await authAPI.register(userRegister);

        return results;
    } catch (error) {
        throw error;
    }
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        removeUser: (state, { payload }) => {
            state.user = payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getLogin.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getLogin.fulfilled, (state, { payload }) => {
            if (payload) {
                state.user = payload;
            }
        });
        builder.addCase(getLogin.rejected, (state, { error }) => {
            state.error = error.message;
        });
    },
});

export const { removeUser } = authSlice.actions;

export default authSlice.reducer;
