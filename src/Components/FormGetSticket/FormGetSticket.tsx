import { AppDispatch, RootState } from "configStore";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import {
    getCinema,
    getFilm,
    getListCinemaForm,
    getListFilmForm,
    getShowTimeWatch,
    getShowTime,
    getShowTimes,
} from "Slices/getSticketSlice";
import Swal from "sweetalert2";
import { USERLOGIN } from "Utill/setting";

const FormGetSticket = () => {
    const { isLoading, error, film, listFilm, cinema, listCinema, showTime, listShowTimes, showTimeWatch } =
        useSelector((state: RootState) => state.getSticket);

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(getListFilmForm());
        if (film.idFilm) {
            dispatch(getListCinemaForm(film.idFilm));
        }
        // if (listCinema.maHeThongRap !== null) {
        //     dispatch(getMovieShowtimesAndCinemas(listCinema.maHeThongRap));
        // }
    }, [film.idFilm]);

    const renderFilm = () => {
        return listFilm.map((film, index) => {
            return (
                <a
                    className="dropdown-item"
                    key={film.maPhim}
                    onClick={() => {
                        dispatch(getFilm({ idFilm: film.maPhim, nameFilm: film.tenPhim }));
                    }}
                >
                    <img className="mr-1" style={{ borderRadius: "50px" }} width={50} height={50} src={film.hinhAnh} />{" "}
                    {film.tenPhim}
                </a>
            );
        });
    };

    const renderCinema = () => {
        return listCinema.map((sysCinema, index) => {
            return sysCinema.cumRapChieu.map((cinema, idx) => {
                return (
                    <a
                        className="dropdown-item"
                        key={cinema.maCumRap}
                        onClick={() => {
                            dispatch(
                                getCinema({
                                    idCinema: cinema.maCumRap,
                                    nameCinema: cinema.tenCumRap,
                                    logo: cinema.hinhAnh,
                                }),
                            );
                            dispatch(getShowTimes(cinema.lichChieuPhim));
                        }}
                    >
                        <img className="mr-1" src={sysCinema.logo} width={50} height={50} />
                        {cinema.tenCumRap}
                    </a>
                );
            });
        });
    };

    const renderShowTimes = () => {
        // mảng tăng dần
        let time = "";
        return listShowTimes.map((showTime, idx) => {
            if (time === moment(showTime.ngayChieuGioChieu).format("DD-MM-YYYY")) {
                return;
            }
            time = moment(showTime.ngayChieuGioChieu).format("DD-MM-YYYY");
            return (
                <a
                    className="dropdown-item"
                    key={showTime.maLichChieu}
                    onClick={() => {
                        dispatch(getShowTime(showTime.ngayChieuGioChieu));
                    }}
                >
                    {moment(showTime.ngayChieuGioChieu).format("DD-MM-YYYY")}
                </a>
            );
        });
    };

    const renderShowHour = () => {
        return listShowTimes.map((time, idx) => {
            if (showTime === time.ngayChieuGioChieu) {
                return (
                    <a
                        className="dropdown-item"
                        key={time.maLichChieu}
                        onClick={() => {
                            dispatch(
                                getShowTimeWatch({
                                    maLichChieu: time.maLichChieu,
                                    maRap: time.maRap,
                                    ngayChieuGioChieu: `${moment(time.ngayChieuGioChieu).format("h:mm A")} - ${
                                        time.tenRap
                                    }`,
                                }),
                            );
                        }}
                    >
                        {moment(time.ngayChieuGioChieu).format("h:mm A")} - {time.tenRap}
                    </a>
                );
            }
        });
    };
    let navigate = useNavigate();

    const getSticket = () => {
        Swal.fire({
            icon: "warning",
            text: "Bạn chưa đăng nhập! Hãy đăng nhập để tiếp tục",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Đồng Ý!",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login", { replace: true });
            }
        });
    };

    return (
        <div>
            <div className="container formGetTicket" id="formGetSticket">
                <div className="row" style={{ alignItems: "center" }}>
                    <div className="col-4 selecFilm p-0">
                        <div className="dropdown">
                            <div
                                className="selectMenu"
                                style={{ backgroundImage: "url('./images/dropdown-icon.png')" }}
                            ></div>
                            <div
                                className="dropdown-title pl-4 pr-2 py-2"
                                id="dropdownMenuFilm"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {film.idFilm ? film.nameFilm : "Phim"}
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuFilm">
                                {renderFilm()}
                            </div>
                        </div>
                    </div>

                    <div className="col-2 selectCinema p-0">
                        <div className="dropdown ">
                            <div
                                className="selectMenu"
                                style={{ backgroundImage: "url('./images/dropdown-icon.png')" }}
                            ></div>
                            <div
                                className="dropdown-title p-2"
                                id="dropdownMenuCinema"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {cinema.idCinema ? cinema.nameCinema : "Rạp Chiếu"}
                            </div>
                            <div
                                className="dropdown-menu"
                                style={{ zIndex: "22" }}
                                aria-labelledby="dropdownMenuCinema"
                            >
                                {film.nameFilm === "" ? (
                                    <a className="dropdown-item">Vui lòng chọn phim!</a>
                                ) : (
                                    renderCinema()
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-2 selectDate p-0">
                        <div className="dropdown ">
                            <div
                                className="selectMenu"
                                style={{ backgroundImage: "url('./images/dropdown-icon.png')" }}
                            ></div>
                            <div
                                className="dropdown-title p-2"
                                id="dropdownMenuDate"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {showTime !== "" ? moment(showTime).format("DD-MM-YYYY") : "Ngày Xem"}
                            </div>
                            <div
                                className="dropdown-menu"
                                style={{ zIndex: "22" }}
                                aria-labelledby="dropdownMenuCinema"
                            >
                                {film.nameFilm === "" ? (
                                    cinema.nameCinema === "" ? (
                                        <a className="dropdown-item">Vui lòng chọn phim và rạp!</a>
                                    ) : (
                                        <a className="dropdown-item">Vui lòng chọn rạp!</a>
                                    )
                                ) : (
                                    renderShowTimes()
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-2 selectMovieScreening p-0">
                        <div className="dropdown ">
                            <div
                                className="selectMenu"
                                style={{ backgroundImage: "url('./images/dropdown-icon.png')" }}
                            ></div>
                            <div
                                className="dropdown-title p-2"
                                id="dropdownMenuScreening"
                                data-toggle="dropdown"
                                aria-expanded="false"
                            >
                                {showTimeWatch.ngayChieuGioChieu !== ""
                                    ? showTimeWatch.ngayChieuGioChieu
                                    : "Xuất Chiếu"}
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuScreening">
                                {film.nameFilm === "" ? (
                                    cinema.nameCinema === "" ? (
                                        showTime === "" ? (
                                            <a className="dropdown-item">Vui lòng chọn phim, rạp và ngày xem!</a>
                                        ) : (
                                            <a className="dropdown-item">Vui lòng chọn phim và rạp!</a>
                                        )
                                    ) : (
                                        <a className="dropdown-item">Vui lòng chọn phim!</a>
                                    )
                                ) : (
                                    renderShowHour()
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="col-2">
                        {showTimeWatch.ngayChieuGioChieu === "" ? (
                            <button id="#btnBuy" className="btn">
                                MUA VÉ NGAY
                            </button>
                        ) : localStorage.getItem(USERLOGIN) ? (
                            <a target="_blank" href={`/datve/${showTimeWatch.maLichChieu}`}>
                                <button id="#btnBuyActive" className="btn">
                                    MUA VÉ NGAY
                                </button>
                            </a>
                        ) : (
                            <a onClick={() => getSticket()} target="_blank">
                                <button id="#btnBuyActive" className="btn">
                                    MUA VÉ NGAY
                                </button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormGetSticket;
