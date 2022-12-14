import { dataMovies } from "Interface/dataMovie";
import { Movie } from "Interface/movie";
import axiosClient from "./axiosClient";

const movieAPI = {
    getMovieShowing: (currentPage: number) => {
        return axiosClient.get<any, dataMovies>("QuanLyPhim/LayDanhSachPhimPhanTrang", {
            params: {
                maNhom: "GP09",
                soPhanTuTrenTrang: 8,
                soTrang: currentPage,
            },
        });
    },
    getListFilmForm: () => {
        return axiosClient.get<any, Movie[]>("QuanLyPhim/LayDanhSachPhim", {
            params: {
                maNhom: "GP09",
            },
        });
    },
    getMovieDetail: (maPhim: string) => {
        return axiosClient.get<Movie>("QuanLyPhim/LayThongTinPhim", {
            params: {
                MaPhim: maPhim,
            },
        });
    },
};

export default movieAPI;
