import { createSlice } from "@reduxjs/toolkit";
import { User, UserLogin } from "Interface/user";
import { USERLOGIN } from "Utill/setting";

let userLogin = "";

if (localStorage.getItem(USERLOGIN)) {
    let usLogin: UserLogin = JSON.parse(localStorage.getItem(USERLOGIN) as string);

    userLogin = usLogin.taiKhoan;
}
// const makeid = (length: number) => {
//     var result = "";
//     var characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//     var charactersLength = characters.length;
//     for (var i = 0; i < length; i++) {
//         result += characters.charAt(
//             Math.floor(Math.random() * charactersLength),
//         );
//     }
//     return result;
// };
// console.log(makeid(5));

const initialState: User = {
    isLoading: true,
    infoBookedUser: [],
    listMovieShedule: [],
    userAction: "",
    listUser: [],
    userName: userLogin,
    userType: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, { payload }) => {
            state.userName = payload.userName;
            state.userType = payload.userType;
        },
    },
});

// action
export const { login } = userSlice.actions;

// reducer
export default userSlice.reducer;
