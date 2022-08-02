import Article from "Components/Article/Article";
import Carousel from "Components/Carousel/Carousel";
import Footer from "Components/Footer/Footer";
import Header from "Components/Header/Header";
import Introduce from "Components/Introduce/Introduce";
import ListCinemas from "Components/ListCinemas/ListCinemas";
import MovieList from "Components/MovieList/MovieList";

const HomePage = () => {
    return (
        <div>
            <Carousel />
            <MovieList />
            <ListCinemas />
            <Article />
            <Introduce />
        </div>
    );
};

export default HomePage;
