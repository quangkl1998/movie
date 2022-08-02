import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeTemplate from "Templates/HomeTemplate";
import "./css/main.css";
import "antd/dist/antd.css";
import Login from "Pages/Login/Login";
import HomePage from "Pages/HomePage/HomePage";
import Register from "Pages/Register/Register";
import FilmDetail from "Pages/FilmDetail/FilmDetail";
import ProtectedRoute from "Routes/ProtectedRoute";
import BookingStickets from "Pages/BookingStickets/BookingStickets";
import Loading from "Components/Loading/Loading";

function App() {
    return (
        <BrowserRouter>
            <Loading />
            <Routes>
                <Route path="" element={<HomeTemplate />}>
                    <Route index element={<HomePage />} />
                    <Route
                        path="/detail/:maPhim"
                        element={
                            // <ProtectedRoute>
                            <FilmDetail />
                            //</ProtectedRoute>
                        }
                    />
                </Route>
                <Route
                    path="/datve/:maLichChieu"
                    element={
                        <ProtectedRoute>
                            <BookingStickets />
                        </ProtectedRoute>
                    }
                />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
