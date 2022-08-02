import { Banner } from "Interface/banner";
import axiosClient from "./axiosClient";

const bannerAPI = {
    getBanner: () => {
        return axiosClient.get<Banner[]>("QuanLyPhim/LayDanhSachBanner");
    },
};

export default bannerAPI;
