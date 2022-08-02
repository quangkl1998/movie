import { AppDispatch, RootState } from "configStore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { setLocation } from "Slices/locationSlice";

import logo from "./../../Assets/images/logo.png";
import locationImg from "./../../Assets/images/location-header.png";
import avatar from "./../../Assets/images/avatar.png";
import button from "./../../Assets/images/icons/menu-options.png";
import next from "./../../Assets/images/icons/next-session.png";
import { STICKETINFO, TOKEN, TYPE_USER, USERLOGIN } from "Utill/setting";

const Header = () => {
    const { location, listLocation } = useSelector((state: RootState) => state.location);
    const { user } = useSelector((state: RootState) => state.auth);

    const [hidden, setHidden] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    console.log(123);
    const renderLocation = () => {
        return listLocation.map((value, index) => {
            return (
                <a
                    href="#"
                    className="dropdown-item"
                    key={index}
                    onClick={() => {
                        dispatch(setLocation(value));
                    }}
                >
                    {value}
                </a>
            );
        });
    };

    useEffect(() => {
        window.onclick = function () {
            let scroll = window.scrollY;
            if (scroll! < 245) {
                document.querySelector(".header")!.classList.remove("sticky-menu");
            } else {
                document.querySelector(".header")!.classList.add("sticky-menu");
            }
        };
        return () => {
            window.onclick = null;
        };
    }, []);

    return (
        <>
            <div
                className="container-fluid"
                style={{
                    padding: "0",
                    position: "fixed",
                    zIndex: "10001",
                    top: "-1px",
                }}
            >
                <nav className="header">
                    <div className="header__logo">
                        <NavLink to="/">
                            <img src={logo} />
                        </NavLink>
                    </div>
                    <div className="header__nav">
                        <ul>
                            <li>
                                <a href="#film-header">Lịch Chiếu</a>{" "}
                            </li>
                            <li>
                                <a href="#listCinema">Cụm Rạp</a>
                            </li>
                            <li>
                                <a href="#article">Tin Tức</a>
                            </li>
                            <li>
                                <a href="#introduce">Ứng Dụng</a>
                            </li>
                        </ul>
                    </div>
                    <div className="header__detail">
                        <div className="header__detail__login">
                            {localStorage.getItem("userLogin") ? (
                                <span style={{ display: "flex" }}>
                                    <img src={avatar} />
                                    <div className="dropdown">
                                        <div
                                            className=" dropdown-toggle"
                                            id="dropdownMenuButton"
                                            data-toggle="dropdown"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                        >
                                            {user?.hoTen}
                                        </div>
                                        <div className="dropdown-menu user" aria-labelledby="dropdownMenuButton">
                                            {/* {localStorage.getItem(TYPE_USER) == '"QuanTri"' ? (
                                                <NavLink className="dropdown-item" to="/admin">
                                                    Dashboard
                                                </NavLink>
                                            ) : (
                                                ""
                                            )} */}
                                            <NavLink className="dropdown-item" to="">
                                                Danh Sách Vé
                                            </NavLink>
                                            <a
                                                className="dropdown-item"
                                                onClick={() => {
                                                    localStorage.removeItem(USERLOGIN);
                                                    localStorage.removeItem(TYPE_USER);
                                                    localStorage.removeItem(TOKEN);
                                                    localStorage.removeItem(STICKETINFO);
                                                    window.location.reload();
                                                }}
                                            >
                                                Đăng Xuất
                                            </a>
                                        </div>
                                    </div>
                                </span>
                            ) : (
                                <NavLink to="/login">
                                    <img src={avatar}></img>
                                    <span>Đăng Nhập</span>
                                </NavLink>
                            )}
                        </div>
                        <div className="header__detail__pos dropdown ml-2" id="dropdown_click">
                            <div className="header__pos__icon"></div>
                            <div
                                className="header__choose__pos"
                                id="dropdownMenuLocation"
                                data-toggle="dropdown"
                                aria-expanded="true"
                            >
                                <img className="mr-1" src={locationImg} />
                                <span>{location}</span>
                            </div>
                            <div className="dropdown-menu" aria-labelledby="dropdownMenuLocation">
                                {renderLocation()}
                            </div>
                        </div>
                    </div>
                    <div
                        onClick={() => {
                            setHidden(true);
                        }}
                        className="header__button"
                    >
                        <img src={button} />
                    </div>
                </nav>
            </div>
            <div
                onClick={() => {
                    setHidden(false);
                }}
                className={hidden ? "header__dropdown active" : "header__dropdown"}
            >
                <div className={hidden ? "dropdown__content active" : "dropdown__content"}>
                    <div className="mobile__user ">
                        <img src={avatar} />
                        {localStorage.getItem(USERLOGIN) ? (
                            <span>{user?.hoTen}</span>
                        ) : (
                            <NavLink to="/login">Đăng Nhập</NavLink>
                        )}
                        <span
                            onClick={() => {
                                setHidden(false);
                            }}
                            className="button__close"
                        >
                            <img src={next} />
                        </span>
                    </div>
                    <div className="mobile__nav">
                        <a href="#">Lịch Chiếu</a>
                    </div>
                    <div className="mobile__nav">
                        <a href="#">Cụm Rạp</a>
                    </div>
                    <div className="mobile__nav">
                        <a href="#">Tin Tức</a>
                    </div>
                    <div className="mobile__nav">
                        <a href="#">Ứng Dụng</a>
                    </div>
                    <div className="mobile__nav">
                        <a href="#">{location}</a>
                    </div>
                    <div className="mobile__nav">
                        {localStorage.getItem(USERLOGIN) ? (
                            <a
                                onClick={() => {
                                    localStorage.removeItem(USERLOGIN);
                                    localStorage.removeItem(TYPE_USER);
                                    localStorage.removeItem(TOKEN);
                                    localStorage.removeItem(STICKETINFO);
                                    window.location.reload();
                                }}
                            >
                                Đăng Xuất
                            </a>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
