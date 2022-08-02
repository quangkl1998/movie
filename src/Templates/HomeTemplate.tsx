import Article from "Components/Article/Article";
import Carousel from "Components/Carousel/Carousel";
import Footer from "Components/Footer/Footer";
import FormGetSticket from "Components/FormGetSticket/FormGetSticket";
import Header from "Components/Header/Header";
import Introduce from "Components/Introduce/Introduce";
import ListCinemas from "Components/ListCinemas/ListCinemas";
import HomePage from "Pages/HomePage/HomePage";
import React from "react";
import { Outlet } from "react-router-dom";

const HomeTemplate = () => {
    return (
        <div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default HomeTemplate;
