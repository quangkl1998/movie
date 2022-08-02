import { Movie } from "Interface/movie";
import { NavLink } from "react-router-dom";

type Props = {
    movie: Movie;
};

const MovieItem = (props: Props) => {
    const { movie } = props;

    return (
        <div className="col-sm-6 col-md-3 mt-3">
            <div className="card overflow-hidden position-relative card-film">
                <img className="card-img-top" src={movie.hinhAnh} alt={movie.hinhAnh} width="100%" height="300px" />
                <NavLink
                    to={`/detail/${movie.maPhim}`}
                    className="btn btn-outline-success btnGetTicket position-absolute"
                >
                    Mua vé
                </NavLink>
                <div className="card-body bottom-0 w-100">
                    <h5 className="card-title text-uppercase" style={{ height: "40px" }}>
                        {movie.tenPhim}
                    </h5>
                    <p className="card-text text-truncate">{movie.moTa}</p>
                </div>
            </div>
        </div>
    );
};

export default MovieItem;
