import { CinemaGroup, SysCinemaForm } from "Interface/cinema";
import { SysCinema } from "Interface/movie";
import axiosClient from "./axiosClient";

const cinemaAPI = {
    // lấy danh sách hệ thống cụm rạp
    getSystemCinemas: () => {
        return axiosClient.get<SysCinema[]>("QuanLyRap/LayThongTinLichChieuHeThongRap", {
            params: {
                maNhom: "GP05",
            },
        });
    },
    getListCinemaForm: (MaPhim: number) => {
        return axiosClient.get<SysCinemaForm>("QuanLyRap/LayThongTinLichChieuPhim", {
            params: {
                MaPhim: MaPhim || null,
            },
        });
    },
};
export default cinemaAPI;
