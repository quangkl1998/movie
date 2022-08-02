import { AppDispatch, RootState } from "configStore";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBanner } from "Slices/bannerSlice";
import cn from "classnames";
import FormGetSticket from "Components/FormGetSticket/FormGetSticket";

const Carousel = () => {
    const { banners, isLoading, error } = useSelector((state: RootState) => state.banner);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getBanner());
    }, []);

    if (isLoading) {
        // TODO: Loading component
        return <h1>Loading...</h1>;
    }

    if (error) {
        // TODO: Error component
        return <h1>{error}</h1>;
    }

    return (
        <div>
            <div id="carouselExampleIndicators" className="carousel slide movie__carousel" data-ride="carousel">
                <ol className="carousel-indicators carousel__button" style={{ zIndex: "1" }}>
                    <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
                    <li data-target="#carouselExampleIndicators" data-slide-to={1} />
                    <li data-target="#carouselExampleIndicators" data-slide-to={2} />
                </ol>
                <div className="carousel-inner movie__carousel__item" style={{ maxHeight: "700px" }}>
                    {banners.map((banner, index) => {
                        return (
                            <div className={cn(index === 0 ? "active" : "", "carousel-item")} key={banner.maBanner}>
                                <img src={banner.hinhAnh} className="d-block w-100" />
                            </div>
                        );
                    })}
                </div>
                <a className="carousel-control-prev " href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span aria-hidden="true">
                        <i className="fa-solid fa-caret-left" style={{ fontSize: "50px" }}></i>
                    </span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span aria-hidden="true">
                        <i className="fa-solid fa-caret-right" style={{ fontSize: "50px" }}></i>
                    </span>
                </a>
                <FormGetSticket />
            </div>
        </div>
    );
};

export default Carousel;
