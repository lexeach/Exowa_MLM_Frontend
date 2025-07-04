import axios from "axios";
import toast from "react-hot-toast";
import {
  setAllNotifition,
  setApiAllData,
  setAuthRedirect,
  setTheme,
  setisshowLoader,
  setloginuserID,
  setpool_levelDashboard,
  setuserIsLogin,
  setuserLoginData,
  setuserrefferalCode,
} from "../../../Redux/DoWinSlice";
const BaseURI = process.env.REACT_APP_API_BASE_URI;
//----------------------------
export const authenticateApi = async (usertoken, dispatch, navigate) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": usertoken,
        Authorization: `Bearer ${usertoken}`,
      },
    };
    const response = await axios.post(
      `${BaseURI}/user/authanticate`,
      {},
      config
    );
    if (response.status === 200) {
      dispatch(setApiAllData(response.data));

      const userActiveLevel =
        response?.data?.data?.mergedUserLevels[0]?.is_active || 0;
      if (userActiveLevel === 0) {
        navigate("/paymentCart");
      } else {
        navigate("/");
      }
    }
  } catch (error) {
    // console.log("eeeeeeeeee", error);
    if (
      error?.response?.data?.message === "Invalid Token" ||
      error?.response?.data?.message === "Unauthorize request" ||
      error?.response?.data?.error === "User Not Found"
    ) {
      dispatch(setAuthRedirect(false));
      dispatch(setuserIsLogin(false));
    }
    // dispatch(setAuthRedirect(false));
    // dispatch(setuserIsLogin(false));
  }
};
//--------Get-Notification-API -------
export const getUserNotifitions = async (usertoken, dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": usertoken,
        Authorization: `Bearer ${usertoken}`,
      },
    };
    const response = await axios.get(
      `${BaseURI}/user/getUserNotifitions`,
      config
    );
    if (response.status === 200) {
      if (Array.isArray(response.data.data)) {
        // setAllNotifition(response.data.data);
        dispatch(setAllNotifition(response.data.data));
      } else {
        dispatch(setAllNotifition([]));
      }
    }
  } catch (error) {
    console.error("Error during API call:", error);
  }
};
//  Resend-OTP-API --------------
export const resendOTPApi = async (usertoken, userData, dispatch) => {
  const apiData = {
    userid: userData,
  };
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "x-access-token": usertoken,
        Authorization: `Bearer ${usertoken}`,
      },
    };
    const response = await axios.post(
      `${BaseURI}/user/resend`,
      apiData,
      config
    );
    // console.log("API response------------", response.data);
    if (response.status === 200) {
      toast.success(response?.data?.message);
      dispatch(setisshowLoader(response?.data));
    }
  } catch (error) {
    console.error("Error during API call:", error.response);
    toast.error(`${error?.response?.data?.message || "An error occurred"}`);
    dispatch(setisshowLoader(error.response));
  }
};
//  Profile Setting global API Function----------
// Use On Logout -----------
export const reduxEmpty = (dispatch) => {
  dispatch(setuserIsLogin(false));
  dispatch(setuserrefferalCode(null));
  dispatch(setloginuserID(null));
  dispatch(setuserLoginData(null));
  dispatch(setApiAllData(null));
  dispatch(setAllNotifition(null));
  dispatch(setuserLoginData(null));
  dispatch(setpool_levelDashboard(null));
};
//-------------
export const toastmsg = (type, msg, duration = 2000) => {
  if (type === "1") {
    toast.success(msg, {
      duration: duration,
    });
  } else if (type === "0") {
    toast.error(msg, {
      duration: duration,
    });
  }
};
//----------------
export const getTheme = (mode, dispatch) => {
  const darkMode = {
    background: "#171622",
    shadowcolor: "#212130",
    bordercolor: "#2e2e42",
    textcolor: "#fff",
    buttonbg: "#fff",
    iconcolor: "#fff",
    iconbg: "#000",
    iconHover: "#000",
    inputbg: "#212130",
    mode: "dark",
  };
  const lightMode = {
    background: "",
    shadowcolor: "#0000",
    bordercolor: "",
    textcolor: "",
    buttonbg: "",
    bggray: "",
    textgray: "",
    iconcolor: "",
    iconbg: "",
    iconHover: "",
    mode: "",
  };
  dispatch(setTheme(mode === "dark" ? darkMode : lightMode));
};
// Global function to get dynamic styles
export const getDynamicStyles = (theme, customStyles = {}) => {
  return {
    color: theme?.textcolor || customStyles.textcolor,
    background: theme?.background || customStyles.background,
    border: theme?.background || customStyles.background,
    boxShadow: `0px 4px 10px ${theme.shadowcolor}`,
    ...customStyles,
  };
};
export const getdynamicStylesInput = (theme, customStyles = {}) => {
  return {
    color: theme?.textcolor,
    background: theme?.inputbg,
    border: theme?.bordercolor,
    ...customStyles,
  };
};
export const getdynamicStylesInputerror = (theme, customStyles = {}) => {
  return {
    color: theme?.textcolor,
    ...customStyles,
  };
};
//---------
export const ConvertPrice = (name, value, withdrawal, setwithdrawal) => {
  const conversionRate = 86.52;
  if (!value) {
    setwithdrawal({
      ...withdrawal,
      [name === "AmountDoller" ? "AmountINR" : "AmountDoller"]: "",
    });
    return;
  }
  if (name === "AmountDoller") {
    const INR = (value * conversionRate).toFixed(2);
    setwithdrawal({ ...withdrawal, AmountINR: INR });
  } else if (name === "AmountINR") {
    const doller = (value / conversionRate).toFixed(2);
    setwithdrawal({ ...withdrawal, AmountDoller: doller });
  }
};

export const incomeToFixedFun = (amount) => {
  return !isNaN(Number(amount)) ? Number(amount).toFixed(4) : "0.00";
};

export const handleCopy = (e) => {
  navigator?.clipboard.writeText(e).then(() => {
    toastmsg("1", "Copied");
  });
};

export const formatMaskedText = (data) => {
  if (!data || data.length < 3) return data; // Return as is if too short

  const firstPart = data.slice(0, 10); // First 10 characters
  const lastPart = data.slice(-5); // Last 5 characters

  return `${firstPart}...${lastPart}`;
};

export const factorial = (n) => {
  if (n < 0) return undefined;
  if (n === 0 || n === 1) return 1;
  return n * factorial(n - 1);
};

export const formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const formatsecendDate = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);

  // Format date
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  // const formattedDate = `${month}/${day}/${year}`;
  const formattedDate = `${day}-${month}-${year}`;

  // Format time
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const formattedHour = hours % 12 || 12;
  const formattedTime = `${formattedHour}:${minutes} ${ampm}`;

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

export function formatAmount(amount, value = 3) {
  if (!isNaN(amount)) {
    return parseFloat(amount).toFixed(value);
  }
  return "0.00";
}

export const formatAmoutText = (data) => {
  if (!data || data.length <= 6) return data; // Return as is if too short
  const firstPart = data.slice(0, 6);

  return `${firstPart}...`;
};

export const activateFirstLevel = async (usertoken) => {
  try {
    const config = {
      headers: {
        "x-access-token": usertoken,
      },
    };
    const response = await axios.post(
      `${BaseURI}/user/activate-level`,
      {},
      config
    );

    if (response.status === 200) {
      return { success: true, message: response?.data?.message || "Unknown" };
    }
  } catch (error) {
    console.error("Error during API call:", error);
    return {
      success: false,
      message:
        error?.response?.message ||
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        "An unexpected error occurred",
    };
  }
};

// Return Format Time (like..May 28, 2025)
export const formatUnixTimestamp = (unixTimestamp) => {
  const date = new Date(unixTimestamp * 1000);
  // Format options
  const options = { year: "numeric", month: "long", day: "numeric" };
  // Return formatted date
  return date.toLocaleDateString("en-US", options);
};
export const TimestampStringFormat = (isoString) => {
  const date = new Date(isoString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
};
