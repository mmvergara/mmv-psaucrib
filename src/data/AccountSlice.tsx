import { createSlice } from "@reduxjs/toolkit";
import { userInfo } from "../types/AppInterfaces";

const localAuth = localStorage.getItem("authState")
  ? JSON.parse(localStorage.getItem("authState")!)
  : null;
const initialState: { userInfo: userInfo } = {
  userInfo: localAuth
    ? localAuth
    : {
        userCredential: "",
        studentNumber: "",
        userName: "",
        userPic: "",
        userPass: "",
      },
};

const AccountSlice = createSlice({
  name: "accountSlice",
  initialState,
  reducers: {
    getUserCredentials(state: { userInfo: userInfo }, action: { payload: userInfo }) {
      state.userInfo = action.payload;
      localStorage.setItem("authState", JSON.stringify(action.payload));
    },
    SignOut(state: { userInfo: userInfo }) {
      state.userInfo = {
        userCredential: "",
        studentNumber: "",
        userName: "",
        userPass: "",
        userPic: "",
      };
      localStorage.removeItem("authState");
    },
  },
});

export const AccountSliceActions = AccountSlice.actions;
export default AccountSlice.reducer;
