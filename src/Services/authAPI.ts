import { LoginValues, RegisterValues } from "Interface/login";
import { UserLogin } from "Interface/user";
import axiosClient from "./axiosClient";

const authAPI = {
    login: (userLogin: LoginValues) => {
        return axiosClient.post<any, UserLogin>("QuanLyNguoiDung/DangNhap", userLogin);
    },
    getInfoBooked: () => {
        return axiosClient.post("QuanLyNguoiDung/ThongTinTaiKhoan");
    },
    register: (userRegisger: RegisterValues) => {
        return axiosClient.post("QuanLyNguoiDung/DangKy", userRegisger);
    },
};

export default authAPI;
