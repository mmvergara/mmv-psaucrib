import { createSlice } from "@reduxjs/toolkit";

const lightMode = {
  type: "lightmode",
  navBg: "#2b4829",
  psauYello: "#FFCB42",
  mainBg: "#c2dbc2",
  formContainer: "#fffffff9",
  pfpInputLabel: "#a87600",
  individualChatColor: "#345732",
  adminPanel: {
    panelTextColor: "black",
    panelBg: "#ffffff",
    panelBorder: "#ffb80e",
  },
  posts: {
    postFeedControlButtons:'#f3f3f3',
    postsBG: "white",
    postsText: "black",
    createPostsContainer: "#2b4829",
    createPostsInputField: "white",
    createPostsText: "black",
    btnBg: "white",
  },
};

const darkMode = {
  type: "darkmode",
  navBg: "#1f331d",
  psauYello: "#FFCB42",
  mainBg: "#0f190e",
  formContainer: "#012508",
  pfpInputLabel: "#FFCB42",
  individualChatColor: "#274224",
  adminPanel: {
    panelTextColor: "aliceblue",
    panelBg: "#f7eddb",
    panelBorder: "#e3a30d",
  },
  posts: {
    postFeedControlButtons:'#212529',
    postsBG: "#171717",
    postsText: "#f7eddb",
    createPostsContainer: "#141414",
    createPostsInputField: "#232323",
    createPostsText: "white",
    btnBg: "wheat",
  },
};


const localTheme = localStorage.getItem("themeStorage")
  ? JSON.parse(localStorage.getItem("themeStorage")!)
  : null;
const initialTheme = localTheme ? { ...localTheme } : { ...lightMode };
const UISlice = createSlice({
  name: "posts",
  initialState: { theme: { ...initialTheme }, SideNav: false },
  reducers: {
    toggleTheme(state) {
      if (state.theme.type === "lightmode") {
        state.theme = darkMode;
        localStorage.setItem("themeStorage", JSON.stringify(darkMode));
      } else {
        state.theme = lightMode;
        localStorage.setItem("themeStorage", JSON.stringify(lightMode));
      }
    },

    showSideNav(state) {
      state.SideNav = true;
    },
    hideSideNav(state) {
      state.SideNav = false;
    },
    toggleSideNav(state) {
      state.SideNav = !state.SideNav;
    },
  },
});

export const UISliceActions = UISlice.actions;
export default UISlice.reducer;
// const lightMode = {
//   type:'lightmode',
//   navBg: "#1d4C4F",
//   psauYello: "#FFCB42",
//   mainBg: "#ece9e9",
//   formContainer: "#012508",
//   pfpInputLabel: "#FFCB42",
//   adminPanel:{
//     panelTextColor:'aliceblue',
//     panelBg:'#ece9e9',
//     panelBorder:'#d3dcde'
//   }aaasas
// }

// const initialState = {
//   theme: {
//     ...lightMode,
//   },
// };
