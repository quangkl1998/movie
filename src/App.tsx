import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomeTemplate from "Templates/HomeTemplate";
import "./css/main.css";
import "antd/dist/antd.css";
import HomePage from "Pages/HomePage/HomePage";
import FilmDetail from "Pages/FilmDetail/FilmDetail";
import ProtectedRoute from "Routes/ProtectedRoute";
import Loading from "Components/Loading/Loading";
import { lazy, Suspense } from "react";

// import BookingStickets from "Pages/BookingStickets/BookingStickets";
// import Register from "Pages/Register/Register";
// import Login from "Pages/Login/Login";

const BookingStickets = lazy(() => import("Pages/BookingStickets/BookingStickets"));
const Login = lazy(() => import("Pages/Login/Login"));
const Register = lazy(() => import("Pages/Register/Register"));

function App() {
    return (
        <Suspense>
            <Loading />
            <BrowserRouter>
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
        </Suspense>
    );
}

export default App;
