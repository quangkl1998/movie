import MovieItem from "Components/MovieItem/MovieItem";
import { AppDispatch, RootState } from "configStore";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovieShowing } from "Slices/movie";
import { NavLink } from "react-router-dom";
import { number } from "yup/lib/locale";
import { hideLoading, showLoading } from "Slices/loadingSlice";

const MovieList = () => {
    const { movies, totalPages, isLoading, error } = useSelector((state: RootState) => state.movie);

    const dispatch = useDispatch<AppDispatch>();

    const [pagState, changePagState] = useState(0);

    function toggleActive(index: number) {
        changePagState(index);
        console.log(pagState);
    }
    function toggleActiveStyles(index: number) {
        if (pagState === index) return "page-item active";
        else return "page-item";
    }

    useEffect(() => {
        dispatch(getMovieShowing(1));
    }, []);

    const renderPagination = (currentPage: number) => {
        const countPage = [];
        for (let index = 1; index <= currentPage; index++) {
            countPage.push(index);
        }
        return countPage;
    };

    if (isLoading) {
        // TODO: Loading component
        dispatch(showLoading());
        return <div></div>;
    }

    if (error) {
        // TODO: Error component
        return <h1>{error}</h1>;
    }

    dispatch(hideLoading());
    return (
        <div className="container pt-5">
            <div className="row">
                <div className="col-sm-12 pt-5" id="film-header">
                    <h1 className="text-center">Danh sách phim</h1>
                </div>

                {movies.map((movie) => {
                    return <MovieItem key={movie.maPhim} movie={movie} />;
                })}

                <div className="col-sm-12">
                    <ul className="pagination justify-content-center mt-3">
                        {renderPagination(totalPages).map((pag, index) => {
                            return (
                                <li className={toggleActiveStyles(index)} key={pag} onClick={() => toggleActive(index)}>
                                    <a
                                        className="page-link"
                                        role="button"
                                        href="#film-header"
                                        onClick={() => {
                                            dispatch(getMovieShowing(pag));
                                        }}
                                    >
                                        {pag}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div
                className="container back__news"
                style={{
                    backgroundImage: "url('./images/icons/back-news.png')",
                }}
            ></div>
        </div>
    );
};

export default MovieList;
