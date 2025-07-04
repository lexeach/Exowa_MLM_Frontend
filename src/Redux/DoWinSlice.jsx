import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  countries: [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States" },
    { code: "+44", name: "United Kingdom" },
    { code: "+81", name: "Japan" },
    { code: "+86", name: "China" },
    { code: "+49", name: "Germany" },
    { code: "+33", name: "France" },
    { code: "+39", name: "Italy" },
    { code: "+7", name: "Russia" },
    { code: "+55", name: "Brazil" },
    { code: "+61", name: "Australia" },
    { code: "+27", name: "South Africa" },
    { code: "+34", name: "Spain" },
    { code: "+31", name: "Netherlands" },
    { code: "+52", name: "Mexico" },
    { code: "+81", name: "Japan" },
    { code: "+20", name: "Egypt" },
    { code: "+82", name: "South Korea" },
    { code: "+62", name: "Indonesia" },
    { code: "+41", name: "Switzerland" },
    { code: "+48", name: "Poland" },
    { code: "+90", name: "Turkey" },
    { code: "+54", name: "Argentina" },
    { code: "+98", name: "Iran" },
    { code: "+66", name: "Thailand" },
    { code: "+974", name: "Qatar" },
    { code: "+63", name: "Philippines" },
    { code: "+380", name: "Ukraine" },
    { code: "+45", name: "Denmark" },
    { code: "+971", name: "United Arab Emirates" },
    { code: "+234", name: "Nigeria" },
    { code: "+351", name: "Portugal" },
    { code: "+62", name: "Indonesia" },
    { code: "+43", name: "Austria" },
  ],
  userrefferalCode: null,
  userIsLogin: false, //--------user login state
  AuthRedirect: true,
  loginuserID: {
    userID: null,
    userEmail: null,
    userPassword: null,
  },
  userLoginData: {},
  ApiAllData: {},
  AllNotifition: [],
  coverImage: null,
  isshowLoader: null,
  webstaticdata: null,
  SidebarTheme: {
    textcolor: "",
    background: "",
  },
  PageTheme: {
    textcolor: "",
    background: "",
  },
  Theme: {
    Theme: null,
  },
  ActiveLevelData: "",
  short_link: "",
  pool_levelDashboard: "",
};
export const DoWinSlice = createSlice({
  name: "DoWin",
  initialState: initialState,
  reducers: {
    setuserrefferalCode: (state, action) => {
      state.userrefferalCode = action.payload;
    },
    setlogout: (state, action) => {
      return initialState;
    },
    setuserIsLogin: (state, action) => {
      state.userIsLogin = action.payload;
    },
    setAuthRedirect: (state, action) => {
      state.AuthRedirect = action.payload;
    },
    setloginuserID: (state, action) => {
      state.loginuserID = action.payload;
    },
    setcoverImage: (state, action) => {
      state.coverImage = action.payload;
    },
    setuserLoginData: (state, action) => {
      state.userLoginData = action.payload;
    },
    setApiAllData: (state, action) => {
      state.ApiAllData = action.payload;
    },
    setAllNotifition: (state, action) => {
      state.AllNotifition = action.payload;
    },
    setisshowLoader: (state, action) => {
      state.isshowLoader = action.payload;
    },
    setwebstaticdata: (state, action) => {
      state.webstaticdata = action.payload;
    },
    setSidebarTheme: (state, action) => {
      state.SidebarTheme = action.payload;
    },
    setPageTheme: (state, action) => {
      state.PageTheme = action.payload;
    },
    setTheme: (state, action) => {
      state.Theme = action.payload;
    },
    setActiveLevelData: (state, action) => {
      state.ActiveLevelData = action.payload;
    },
    setshort_link: (state, action) => {
      state.short_link = action.payload;
    },
    setpool_levelDashboard: (state, action) => {
      state.pool_levelDashboard = action.payload;
    },
  },
});

export const {
  setuserrefferalCode,
  setloginuserID,
  setuserLoginData,
  setApiAllData,
  setAllNotifition,
  countries,
  setuserIsLogin,
  setcoverImage,
  setisshowLoader,
  setwebstaticdata,
  setSidebarTheme,
  setPageTheme,
  setTheme,
  setAuthRedirect,
  setlogout,
  setActiveLevelData,
  setshort_link,
  setpool_levelDashboard,
} = DoWinSlice.actions;
export default DoWinSlice.reducer;
