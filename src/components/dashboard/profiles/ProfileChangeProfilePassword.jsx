// import { Eye, EyeOffIcon } from "lucide-react";
// import React, { useEffect, useMemo, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   authenticateApi,
//   getDynamicStyles,
//   getUserNotifitions,
//   getdynamicStylesInput,
//   resendOTPApi,
//   toastmsg,
// } from "../GlobalApi/Global";
// import axios from "axios";
// import LoaderTwo from "../../loader/LoaderTwo";
// import { FaCheckCircle } from "react-icons/fa";
// import { validateFieldGlobalFun } from "../GlobalApi/FormValidation";

// const ProfileChangeProfilePassword = () => {
//   const BaseURI = process.env.REACT_APP_API_BASE_URI;
//   const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
//   const userdata = ApiAllData?.data;
//   const userselfie = ApiAllData?.data?.selfie;
//   const userToken = useSelector((state) => state.doWin.userLoginData);
//   const showLoader = useSelector((state) => state.doWin.isshowLoader);
//   const setusertoken = userToken?.token;
//   const userID = userToken?.user?.userid;
//   // console.log("setusertoken--------------", userToken);
//   const countries = useSelector((state) => state.doWin.countries);
//   const [tabProfile, setTabProfile] = useState("Profile");
//   const [isTrsPassword, setisTrsPassword] = useState(false);
//   const [isPassword, setisPassword] = useState(false);
//   const [isConPassword, setisConPassword] = useState(false);
//   const [isCurrentPassword, setisCurrentPassword] = useState(false);
//   const [filteredCountry, setFilteredCountry] = useState("+91");
//   const [isLoader, setisLoader] = useState(false);
//   const [isshowchangePassword, setisshowchangePassword] = useState(false);
//   const [isshowProfileUpdate, setisshowProfileUpdate] = useState(false);
//   const [isshowTrsPasUpdate, setisshowTrsPasUpdate] = useState(false);
//   const [validationStatus, setValidationStatus] = useState({});
//   const dispatch = useDispatch();
//   // Filter country Code--------
//   const filterCountryByCode = (code) => {
//     const country = countries?.find((country) => country?.code === code);
//     setFilteredCountry(country ? country?.name : "Country not found");
//   };
//   // hide show password Function------
//   const togglePasswordVisibility = () => {
//     setisPassword(!isPassword);
//   };
//   const toggleConPasswordVisibility = () => {
//     setisConPassword(!isConPassword);
//   };
//   const toggleCurrentPasswordVisibility = () => {
//     setisCurrentPassword(!isCurrentPassword);
//   };
//   const toggleTrsPasswordVisibility = () => {
//     setisTrsPassword(!isTrsPassword);
//   };
//   // Form States -----------
//   const [ProfileData, setProfileData] = useState({
//     username: userdata?.user_name || "",
//     email: userdata?.user_email || "",
//     Mobile: userdata?.mobile_no || "",
//     country_code: filteredCountry || "",
//     file: userselfie || "",
//   });
//   // console.log("ProfileData----", ProfileData);
//   const [ProfilePasswordData, setProfilePasswordData] = useState({
//     oldPassword: "",
//     newConfirmPassword: "",
//     newPassword: "",
//   });

//   const [errors, setErrors] = useState({
//     // For Profile update
//     username: "",
//     email: "",
//     Mobile: "",
//     country_code: "",
//     file: "",
//     // For Profile pass update
//     oldPassword: "",
//     newConfirmPassword: "",
//     newPassword: "",
//     // For Transaction pass update
//     transactionPassword: "",
//     otp: "",
//   });

//   const [TrsPasswordData, setTrsPasswordData] = useState({
//     transactionPassword: "",
//     otp: "",
//   });
//   //   Empty Form data after Api Calling-----
//   const emptyStates = () => {
//     setProfilePasswordData({
//       oldPassword: "",
//       newConfirmPassword: "",
//       newPassword: "",
//     });
//     setTrsPasswordData({
//       transactionPassword: "",
//       otp: "",
//     });
//     setValidationStatus("error");
//   };
//   // Set Profile-Update-Data------------
//   const handleOnchange = (e) => {
//     const { name, value, files } = e.target;
//     setProfileData((prevData) => ({
//       ...prevData,
//       [name]: files ? files[0] : value,
//     }));
//     validateField(name, value).then((error) => {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: error,
//       }));
//     });
//   };

//   // Set Profile-Update-Data------------
//   const handleOnchangePrpPass = (e) => {
//     const { name, value } = e.target;
//     setProfilePasswordData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     validateField(name, value).then((error) => {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: error,
//       }));
//     });
//   };
//   // Set Transaction-Password-Update-Data------------
//   const TrsPassOnchange = (e) => {
//     const { name, value } = e.target;
//     setTrsPasswordData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//     validateField(name, value).then((error) => {
//       setErrors((prevErrors) => ({
//         ...prevErrors,
//         [name]: error,
//       }));
//     });
//   };
//   //  For Validation--------------------
//   const areAllFieldsFilled = (data) => {
//     return Object.values(data).every((value) => value !== "");
//   };

//   // Validation Function **************
//   const validateField = async (field, value) => {
//     let error = "";
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const phoneRegex = /^\d{7,}$/;
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     setValidationStatus((prevStatus) => ({
//       ...prevStatus,
//       [field]: value === "" ? "" : "loading",
//     }));
//     switch (field) {
//       //  For Profile Update Validations-----------
//       case "username":
//         if (value === "") error = "";
//         else if (!value.trim()) error = "Required username*";
//         break;
//       case "email":
//         if (value === "") error = "";
//         else if (!emailRegex.test(value)) error = "Invalid email format*";
//         break;
//       case "Mobile":
//         if (value === "") error = "";
//         else if (!phoneRegex.test(value)) error = "Required  seven number*";
//         break;
//       case "country_code":
//         if (value === "") error = "";
//         else if (!value.trim()) error = "Required country code*";
//         break;
//       case "file":
//         if (value === "") error = "";
//         else if (!value.trim()) error = "Required file*";
//         break;

//       //  For Profile Password Update Validations-----------
//       case "newPassword":
//         if (value === "") error = "";
//         else if (!passwordRegex.test(value)) error = "Password is too weak*";
//         break;
//       case "oldPassword":
//         if (value === "") error = "";
//         else if (!value.trim()) error = "Required Passwords*";
//         break;

//       case "newConfirmPassword":
//         if (value === "") error = "";
//         else if (ProfilePasswordData.newPassword !== value)
//           error = "NewPassword do not match*";
//         break;

//       //  For TransactionPassword Validations-----------
//       case "transactionPassword":
//         if (value === "") error = "";
//         else if (!value.trim()) error = "Required Passwords*";
//         else if (value.length < 4)
//           error = "Password is too weak, minimum length is 4*";
//         // else if (!passwordRegex.test(value)) error = "Password is too weak*";
//         break;
//       case "otp":
//         if (value === "") error = "";
//         else if (!value.trim()) error = "Required OTP*";
//         else if (value.length < 4) error = "Invalid OTP, minimum length is 4*";
//         break;
//       //------------------
//       default:
//         break;
//     }
//     await new Promise((resolve) => setTimeout(resolve, 500));
//     setValidationStatus((prevStatus) => ({
//       ...prevStatus,
//       [field]: error ? "error" : value === "" ? "" : "success",
//     }));
//     return error;
//   };
//   //---------------------------
//   const ProfileUpdateAPI = async () => {
//     setisshowProfileUpdate(true);
//     const apiData = {
//       photo: ProfileData.file,
//       name: ProfileData.username,
//       email: ProfileData.email,
//       country_code: ProfileData.country_code,
//       phoneno: ProfileData.Mobile,
//     };
//     // console.log("SubmitRequestApi-----", apiData);
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           "x-access-token": setusertoken,
//           Authorization: `Bearer ${setusertoken}`,
//         },
//       };
//       const response = await axios.post(
//         `${BaseURI}/user/profile_update`,
//         apiData,
//         config
//       );
//       // console.log("API response:", response.data);
//       if (response.status === 200) {
//         getUserNotifitions(setusertoken, dispatch);
//         toastmsg("1", response.data.message);
//         setisshowProfileUpdate(false);
//         authenticateApi(setusertoken, dispatch);
//       }
//     } catch (error) {
//       console.error("Error during API call:", error);
//       toastmsg("0", `${error?.response?.data?.message || "An error occurred"}`);
//       setisshowProfileUpdate(false);
//     }
//   };
//   // Change Profile Password Api Call.....
//   const changePassword = async () => {
//     setisshowchangePassword(true);
//     const apiData = {
//       old_password: ProfilePasswordData.oldPassword,
//       new_password: ProfilePasswordData.newPassword,
//     };
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": setusertoken,
//           Authorization: `Bearer ${setusertoken}`,
//         },
//       };
//       const response = await axios.post(
//         `${BaseURI}/user/change_password`,
//         apiData,
//         config
//       );
//       // console.log("API response---------", response.data);
//       if (response.status === 200) {
//         emptyStates();
//         toastmsg("1", response.data.message);
//         setisshowchangePassword(false);
//       }
//     } catch (error) {
//       console.error("Error during API call:", error.response.data.error);
//       toastmsg("0", error.response.data.error);
//       setisshowchangePassword(false);
//     }
//   };
//   // Transaction  Password Change API-------------
//   const TrsUpdatePassword = async () => {
//     setisshowTrsPasUpdate(true);
//     const apiData = {
//       pay_password: TrsPasswordData.transactionPassword,
//       otp: TrsPasswordData.otp,
//     };
//     try {
//       const config = {
//         headers: {
//           "Content-Type": "application/json",
//           "x-access-token": setusertoken,
//           Authorization: `Bearer ${setusertoken}`,
//         },
//       };
//       const response = await axios.post(
//         `${BaseURI}/user/payment_password`,
//         apiData,
//         config
//       );
//       // console.log("API response---------", response.data);
//       if (response.status === 200) {
//         emptyStates();
//         toastmsg("1", response.data.message);
//         setisshowTrsPasUpdate(false);
//       }
//     } catch (error) {
//       console.error("Error during API call:", error.response.data.error);
//       toastmsg("0", error.response.data.error);
//       setisshowTrsPasUpdate(false);
//     }
//   };
//   // For Profile Password--------
//   const handelProPassword = () => {
//     const allFieldsFilled = areAllFieldsFilled(ProfilePasswordData);
//     if (allFieldsFilled === true) {
//       changePassword();
//     } else {
//       toastmsg("0", "Please fill all required fields correctly.");
//     }
//   };
//   //For Transaction Password Update API---------------
//   const handelTrsUpdate = () => {
//     const allFieldsFilled = areAllFieldsFilled(TrsPasswordData);
//     if (allFieldsFilled === true) {
//       TrsUpdatePassword();
//     } else {
//       toastmsg("0", "Please fill all required fields!");
//     }
//   };
//   //For Profile Update API-------------
//   const handelProfileUpdate = () => {
//     const allFieldsFilled = areAllFieldsFilled(ProfileData);
//     if (allFieldsFilled === true) {
//       ProfileUpdateAPI();
//     } else {
//       toastmsg("0", "Please fill all required fields!");
//     }
//   };
//   // Send-OTP-Funcion----------
//   const sendTrspassOTP = () => {
//     if (TrsPasswordData.transactionPassword !== "") {
//       setisLoader(true);
//       resendOTPApi(setusertoken, userID, dispatch);
//     } else {
//       let newErrors = {};
//       newErrors.transactionPassword = "Required TransactionPassword*";
//       setErrors(newErrors);
//     }
//   };
//   //---------------------------
//   useEffect(() => {
//     filterCountryByCode(userdata?.country_code);
//   }, [ApiAllData]);
//   //-----------------
//   useEffect(() => {
//     setisLoader(false);
//   }, [showLoader]);
//   const PageTheme = useSelector((state) => state.doWin.PageTheme);
//   const Theme = useSelector((state) => state.doWin.Theme);
//   const dynamicStylesInput = useMemo(() => {
//     return getdynamicStylesInput(Theme);
//   }, [Theme, PageTheme]);
//   const dynamicStyles = useMemo(() => {
//     return getDynamicStyles(PageTheme || Theme);
//   }, [PageTheme, Theme]);

//   const [tableborder, settableborder] = useState("");
//   useEffect(() => {
//     if (Theme.mode === "dark") {
//       settableborder("#4b5563");
//     } else {
//       settableborder("#eef2ff");
//     }
//   }, [Theme]);
//   return (
//     <div className="">
//       <div
//         className="flex flex-wrap  justify-center md:justify-start items-center gap-5 mb-10 pb-3 border-b border-indigo-50"
//         style={{ borderColor: tableborder }}
//       >
//         <button
//           className={`px-5 h-[45px] ${
//             tabProfile === "Profile"
//               ? "bg-[#4d33f8] text-white"
//               : " text-[#4d33f8]"
//           } rounded-lg`}
//           onClick={() => setTabProfile("Profile")}
//         >
//           Profile
//         </button>
//         <button
//           className={`px-5 h-[45px] ${
//             tabProfile === "ProfileChange"
//               ? "bg-[#4d33f8] text-white"
//               : " text-[#4d33f8]"
//           } rounded-lg`}
//           onClick={() => setTabProfile("ProfileChange")}
//         >
//           Change Profile Password
//         </button>
//         <button
//           className={`px-5 h-[45px] ${
//             tabProfile === "TransactionChange"
//               ? "bg-[#4d33f8] text-white"
//               : " text-[#4d33f8]"
//           } rounded-lg`}
//           onClick={() => setTabProfile("TransactionChange")}
//         >
//           Change Transaction Password
//         </button>
//       </div>
//       {/* Profile Update --- */}
//       {tabProfile === "Profile" ? (
//         <div className="">
//           <div className="mb-10">
//             <h4 className="text-[#4d33f8] text-xl">Profile Content</h4>
//           </div>
//           <div className="flex items-center justify-between gap-5 flex-wrap ">
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 Name
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter your name"
//                 className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                 value={ProfileData.username}
//                 name="username"
//                 style={dynamicStylesInput}
//                 onChange={handleOnchange}
//               />
//               <div className="absolute bottom-4 right-2">
//                 {validationStatus.username === "success" && (
//                   <p className="mt-2 w-full flex justify-end pr-1">
//                     <FaCheckCircle className="transform  text-green-500" />
//                   </p>
//                 )}
//               </div>
//               {errors.username && (
//                 <p
//                   className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                   style={{ color: dynamicStyles.background }}
//                 >
//                   {errors.username}
//                 </p>
//               )}
//             </div>
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 Email
//               </label>
//               <input
//                 type="email"
//                 placeholder="Enter your email"
//                 className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                 value={ProfileData.email}
//                 name="email"
//                 style={dynamicStylesInput}
//                 onChange={handleOnchange}
//               />
//               <div className="absolute bottom-4 right-2">
//                 {validationStatus.email === "success" && (
//                   <p className="mt-2 w-full flex justify-end pr-1">
//                     <FaCheckCircle className="transform  text-green-500" />
//                   </p>
//                 )}
//               </div>
//               {errors.email && (
//                 <p
//                   className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                   style={{ color: dynamicStyles.background }}
//                 >
//                   {errors.email}
//                 </p>
//               )}
//             </div>
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 Country
//               </label>
//               <select
//                 className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                 name="country_code"
//                 value={ProfileData.country_code}
//                 onChange={handleOnchange}
//                 style={dynamicStylesInput}
//               >
//                 {countries.map((item) => (
//                   <option
//                     key={item.code}
//                     value={item.code}
//                     className="flex gap-2"
//                     style={dynamicStylesInput}
//                   >
//                     <span>{item.code}</span>
//                     <span> {item.name}</span>
//                   </option>
//                 ))}
//               </select>
//               <div className="absolute bottom-4 right-5">
//                 {validationStatus.country_code === "success" && (
//                   <p className="mt-2 w-full flex justify-end pr-1">
//                     <FaCheckCircle className="transform  text-green-500" />
//                   </p>
//                 )}
//               </div>
//               {errors.country_code && (
//                 <p
//                   className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                   style={{ color: dynamicStyles.background }}
//                 >
//                   {errors.country_code}
//                 </p>
//               )}
//             </div>
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 Mobile{" "}
//               </label>
//               <input
//                 type="number"
//                 placeholder="Enter your number"
//                 className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                 value={ProfileData.Mobile}
//                 name="Mobile"
//                 style={dynamicStylesInput}
//                 onChange={handleOnchange}
//               />
//               <div className="absolute bottom-4 right-2">
//                 {validationStatus.Mobile === "success" && (
//                   <p className="mt-2 w-full flex justify-end pr-1">
//                     <FaCheckCircle className="transform  text-green-500" />
//                   </p>
//                 )}
//               </div>
//               {errors.Mobile && (
//                 <p
//                   className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                   style={{ color: dynamicStyles.background }}
//                 >
//                   {errors.Mobile}
//                 </p>
//               )}
//             </div>
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 Profile picture
//               </label>
//               <input
//                 type="file"
//                 placeholder="UTR/Reference No."
//                 className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                 name="file"
//                 style={dynamicStylesInput}
//                 onChange={handleOnchange}
//               />
//               <div className="absolute bottom-4 right-2">
//                 {validationStatus.file === "success" && (
//                   <p className="mt-2 w-full flex justify-end pr-1 bg-white">
//                     <FaCheckCircle className="transform  text-green-500" />
//                   </p>
//                 )}
//               </div>
//               {errors.file && (
//                 <p
//                   className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                   style={{ color: dynamicStyles.background }}
//                 >
//                   {errors.file}
//                 </p>
//               )}
//             </div>
//             {/* <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full">
//                     <label className="text-sm text-gray-800 font-medium">Trading MT5 A/c No.</label>
//                     <input type="email" placeholder="Trading MT5 A/c No." className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black" />
//                 </div>
//                 <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full">
//                     <label className="text-sm text-gray-800 font-medium">Compounding MT5 A/c No.</label>
//                     <input type="email" placeholder="Compounding MT5 A/c No." className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black" />
//                 </div> */}
//           </div>
//           <div className="mt-8">
//             {isshowProfileUpdate ? (
//               <button
//                 className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
//                 style={dynamicStyles}
//               >
//                 <LoaderTwo />
//               </button>
//             ) : (
//               <button
//                 className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
//                 onClick={handelProfileUpdate}
//                 style={dynamicStyles}
//               >
//                 Update
//               </button>
//             )}
//           </div>
//         </div>
//       ) : tabProfile === "ProfileChange" ? (
//         // Profile Password change -------
//         <div className="">
//           <div className="mb-10">
//             <h4 className="text-[#4d33f8] text-xl">Profile Password Setting</h4>
//           </div>
//           <div className="flex items-center justify-between gap-5 flex-wrap">
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium "
//                 style={{ color: Theme.textcolor }}
//               >
//                 New Password
//               </label>
//               <div className="relative mt-2">
//                 <input
//                   type={isPassword ? "text" : "password"}
//                   placeholder="New Password"
//                   className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                   value={ProfilePasswordData.newPassword}
//                   name="newPassword"
//                   style={dynamicStylesInput}
//                   onChange={handleOnchangePrpPass}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-3 right-2"
//                   onClick={togglePasswordVisibility}
//                 >
//                   {isPassword ? <Eye /> : <EyeOffIcon />}
//                 </button>
//                 <div className="absolute top-12 right-2">
//                   {validationStatus.newPassword === "success" && (
//                     <p className=" mt-2 w-full flex justify-end pr-1">
//                       <FaCheckCircle className="transform  text-green-500" />
//                     </p>
//                   )}
//                 </div>
//                 {errors.newPassword && (
//                   <p
//                     className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                     style={{ color: dynamicStyles.background }}
//                   >
//                     {errors.newPassword}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 Confirm Password{" "}
//               </label>
//               <div className="relative mt-2">
//                 <input
//                   type={isConPassword ? "text" : "password"}
//                   placeholder="Confirm Password "
//                   className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                   value={ProfilePasswordData.newConfirmPassword}
//                   name="newConfirmPassword"
//                   style={dynamicStylesInput}
//                   onChange={handleOnchangePrpPass}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-3 right-2"
//                   onClick={toggleConPasswordVisibility}
//                 >
//                   {isConPassword ? <Eye /> : <EyeOffIcon />}
//                 </button>
//                 <div className="absolute top-12 right-2">
//                   {validationStatus.newConfirmPassword === "success" && (
//                     <p className=" mt-2 w-full flex justify-end pr-1">
//                       <FaCheckCircle className="transform  text-green-500" />
//                     </p>
//                   )}
//                 </div>
//                 {errors.newConfirmPassword && (
//                   <p
//                     className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                     style={{ color: dynamicStyles.background }}
//                   >
//                     {errors.newConfirmPassword}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full ">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 Current Password
//               </label>
//               <div className="relative mt-2">
//                 <input
//                   type={isCurrentPassword ? "text" : "password"}
//                   placeholder="Current Password"
//                   className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                   value={ProfilePasswordData.oldPassword}
//                   name="oldPassword"
//                   style={dynamicStylesInput}
//                   onChange={handleOnchangePrpPass}
//                 />
//                 <button
//                   type="button"
//                   className="absolute top-3 right-2"
//                   onClick={toggleCurrentPasswordVisibility}
//                 >
//                   {isCurrentPassword ? <Eye /> : <EyeOffIcon />}
//                 </button>
//                 <div className="absolute top-12 right-2">
//                   {validationStatus.oldPassword === "success" && (
//                     <p className=" mt-2 w-full flex justify-end pr-1">
//                       <FaCheckCircle className="transform  text-green-500" />
//                     </p>
//                   )}
//                 </div>
//                 {errors.oldPassword &&
//                   validationStatus.oldPassword === "error" && (
//                     <p
//                       className="text-red-500 text-[14px] mt-1 text-end"
//                       style={{ color: dynamicStyles.background }}
//                     >
//                       {errors.oldPassword}
//                     </p>
//                   )}
//               </div>
//             </div>
//           </div>
//           <div className="mt-8">
//             {isshowchangePassword ? (
//               <button
//                 className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
//                 style={dynamicStyles}
//               >
//                 <LoaderTwo />
//               </button>
//             ) : (
//               <button
//                 className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
//                 style={dynamicStyles}
//                 onClick={handelProPassword}
//               >
//                 Update
//               </button>
//             )}
//           </div>
//         </div>
//       ) : null}

//       {tabProfile === "TransactionChange" ? (
//         // Transaction Password change -------
//         <div className="flex flex-col gap-5">
//           <div className="mb-10">
//             <h4 className="text-[#4d33f8] text-xl">
//               Transaction Password Setting
//             </h4>
//           </div>
//           <div className="flex flex-wrap gap-5">
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 Transaction Password
//               </label>
//               <div className="relative mt-2">
//                 <input
//                   type={isTrsPassword ? "text" : "password"}
//                   placeholder="Transaction Password"
//                   className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                   value={TrsPasswordData.transactionPassword}
//                   name="transactionPassword"
//                   style={dynamicStylesInput}
//                   onChange={TrsPassOnchange}
//                 />
//                 <button
//                   type="button"
//                   className="absolute right-3 top-0 bottom-0 focus:outline-none"
//                   onClick={toggleTrsPasswordVisibility}
//                 >
//                   {isTrsPassword ? <Eye /> : <EyeOffIcon />}
//                 </button>
//                 <div className="absolute top-12 right-2">
//                   {validationStatus.transactionPassword === "success" && (
//                     <p className=" mt-2 w-full flex justify-end pr-1">
//                       <FaCheckCircle className="transform  text-green-500" />
//                     </p>
//                   )}
//                 </div>
//                 {errors.transactionPassword && (
//                   <p
//                     className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                     style={{ color: dynamicStyles.background }}
//                   >
//                     {errors.transactionPassword}
//                   </p>
//                 )}
//               </div>
//             </div>
//             <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//               <label
//                 className="text-sm text-gray-800 font-medium"
//                 style={{ color: Theme.textcolor }}
//               >
//                 One Time Password
//               </label>
//               <div className="relative mt-2">
//                 <input
//                   type="number"
//                   placeholder="Enter One Time Password"
//                   className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//                   value={TrsPasswordData.otp}
//                   name="otp"
//                   style={dynamicStylesInput}
//                   onChange={TrsPassOnchange}
//                 />
//                 {isLoader ? (
//                   <button
//                     className="absolute right-0 top-0 bottom-0 rounded-lg bg-[#4d33f8] px-3 m-1 text-white text-sm"
//                     style={dynamicStyles}
//                   >
//                     <LoaderTwo />
//                   </button>
//                 ) : (
//                   <button
//                     className="absolute right-0 top-0 bottom-0 rounded-lg bg-[#4d33f8] px-3 m-1 text-white text-sm"
//                     onClick={sendTrspassOTP}
//                     style={dynamicStyles}
//                   >
//                     Send OTP
//                   </button>
//                 )}

//                 <div className="absolute top-12 right-2">
//                   {validationStatus.otp === "success" && (
//                     <p className=" mt-2 w-full flex justify-end pr-1">
//                       <FaCheckCircle className="transform  text-green-500" />
//                     </p>
//                   )}
//                 </div>

//                 {errors.otp && (
//                   <p
//                     className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
//                     style={{ color: dynamicStyles.background }}
//                   >
//                     {errors.otp}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>
//           <div className="mt-8">
//             {isshowTrsPasUpdate ? (
//               <button
//                 className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
//                 style={dynamicStyles}
//               >
//                 <LoaderTwo />
//               </button>
//             ) : (
//               <button
//                 className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
//                 style={dynamicStyles}
//                 onClick={handelTrsUpdate}
//               >
//                 Update
//               </button>
//             )}
//           </div>
//         </div>
//       ) : null}
//     </div>
//   );
// };
// export default ProfileChangeProfilePassword;

import { Eye, EyeOffIcon } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateApi,
  getDynamicStyles,
  getUserNotifitions,
  getdynamicStylesInput,
  resendOTPApi,
  toastmsg,
} from "../GlobalApi/Global";
import axios from "axios";
import LoaderTwo from "../../loader/LoaderTwo";
import { FaCheckCircle } from "react-icons/fa";
import StateDistrictSelector from "../../stateDistrict/StateDistrictSelector";

const ProfileChangeProfilePassword = () => {
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const userdata = ApiAllData?.data;
  const userselfie = ApiAllData?.data?.selfie;
  const userToken = useSelector((state) => state.doWin.userLoginData);
  const showLoader = useSelector((state) => state.doWin.isshowLoader);
  const setusertoken = userToken?.token;
  const userID = userToken?.user?.userid;
  // console.log("setusertoken--------------", userToken);
  const countries = useSelector((state) => state.doWin.countries);
  const [tabProfile, setTabProfile] = useState("Profile");
  const [isTrsPassword, setisTrsPassword] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const [isConPassword, setisConPassword] = useState(false);
  const [isCurrentPassword, setisCurrentPassword] = useState(false);
  const [filteredCountry, setFilteredCountry] = useState("+91");
  const [isLoader, setisLoader] = useState(false);
  const [isshowchangePassword, setisshowchangePassword] = useState(false);
  const [isshowProfileUpdate, setisshowProfileUpdate] = useState(false);
  const [isshowTrsPasUpdate, setisshowTrsPasUpdate] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const dispatch = useDispatch();
  // Filter country Code--------
  const filterCountryByCode = (code) => {
    const country = countries?.find((country) => country?.code === code);
    setFilteredCountry(country ? country?.name : "Country not found");
  };
  // hide show password Function------
  const togglePasswordVisibility = () => {
    setisPassword(!isPassword);
  };
  const toggleConPasswordVisibility = () => {
    setisConPassword(!isConPassword);
  };
  const toggleCurrentPasswordVisibility = () => {
    setisCurrentPassword(!isCurrentPassword);
  };
  const toggleTrsPasswordVisibility = () => {
    setisTrsPassword(!isTrsPassword);
  };

  // Form States -----------
  const [ProfileData, setProfileData] = useState({
    username: userdata?.user_name || "",
    email: userdata?.user_email || "",
    Mobile: userdata?.mobile_no || "",
    country_code: filteredCountry || "",
    file: userselfie || "",
    address: userdata?.user_address || "",
    pincode: userdata?.user_pincode || "",
    state: userdata?.user_state || "",
    district: userdata?.user_district || "",
  });
  // console.log("ProfileData----", ProfileData);
  const [ProfilePasswordData, setProfilePasswordData] = useState({
    oldPassword: "",
    newConfirmPassword: "",
    newPassword: "",
  });

  const [errors, setErrors] = useState({
    // For Profile update
    username: "",
    email: "",
    Mobile: "",
    country_code: "",
    file: "",
    address: "",
    pincode: "",
    state: "",
    district: "",
    // For Profile pass update
    oldPassword: "",
    newConfirmPassword: "",
    newPassword: "",
    // For Transaction pass update
    transactionPassword: "",
    otp: "",
  });

  const [TrsPasswordData, setTrsPasswordData] = useState({
    transactionPassword: "",
    otp: "",
  });
  //   Empty Form data after Api Calling-----
  const emptyStates = () => {
    setProfilePasswordData({
      oldPassword: "",
      newConfirmPassword: "",
      newPassword: "",
    });
    setTrsPasswordData({
      transactionPassword: "",
      otp: "",
    });
    setValidationStatus("error");
  };
  // Set Profile-Update-Data------------
  const handleOnchange = (e) => {
    const { name, value, files } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
    validateField(name, value).then((error) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    });
  };

  // Set Profile-Update-Data------------
  const handleOnchangePrpPass = (e) => {
    const { name, value } = e.target;
    setProfilePasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value).then((error) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    });
  };
  // Set Transaction-Password-Update-Data------------
  const TrsPassOnchange = (e) => {
    const { name, value } = e.target;
    setTrsPasswordData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    validateField(name, value).then((error) => {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error,
      }));
    });
  };
  //  For Validation--------------------
  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((value) => value !== "");
  };

  // Validation Function **************
  const validateField = async (field, value) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,}$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const pincodeRegex = /^\d{6,}$/;

    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [field]: value === "" ? "" : "loading",
    }));
    switch (field) {
      //  For Profile Update Validations-----------
      case "username":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required username*";
        break;
      case "email":
        if (value === "") error = "";
        else if (!emailRegex.test(value)) error = "Invalid email format*";
        break;
      case "Mobile":
        if (value === "") error = "";
        else if (!phoneRegex.test(value)) error = "Required  seven number*";
        break;
      case "country_code":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required country code*";
        break;
      case "file":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required file*";
        break;

      case "address":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required address*";
        break;
      case "pincode":
        if (value === "") error = "";
        else if (!pincodeRegex.test(value))
          error = "Pincode must be at least 6 digits*";
        break;
      case "state":
        if (value === "") error = "Please select a state*";
        break;
      case "district":
        if (value === "") error = "Please select a district*";
        break;

      //  For Profile Password Update Validations-----------
      case "newPassword":
        if (value === "") error = "";
        else if (!passwordRegex.test(value)) error = "Password is too weak*";
        break;
      case "oldPassword":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required Passwords*";
        break;

      case "newConfirmPassword":
        if (value === "") error = "";
        else if (ProfilePasswordData.newPassword !== value)
          error = "NewPassword do not match*";
        break;

      //  For TransactionPassword Validations-----------
      case "transactionPassword":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required Passwords*";
        else if (value.length < 4)
          error = "Password is too weak, minimum length is 4*";
        // else if (!passwordRegex.test(value)) error = "Password is too weak*";
        break;
      case "otp":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required OTP*";
        else if (value.length < 4) error = "Invalid OTP, minimum length is 4*";
        break;
      //------------------
      default:
        break;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [field]: error ? "error" : value === "" ? "" : "success",
    }));
    return error;
  };
  //---------------------------
  const ProfileUpdateAPI = async () => {
    setisshowProfileUpdate(true);
    const apiData = {
      photo: ProfileData.file,
      name: ProfileData.username,
      email: ProfileData.email,
      country_code: ProfileData.country_code,
      phoneno: ProfileData.Mobile,
      address: ProfileData?.address,
      pincode: ProfileData?.pincode,
      state: ProfileData?.state,
      district: ProfileData?.district,
    };
    // console.log("SubmitRequestApi-----", apiData);
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": setusertoken,
          Authorization: `Bearer ${setusertoken}`,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/profile_update`,
        apiData,
        config
      );
      // console.log("API response:", response.data);
      if (response.status === 200) {
        getUserNotifitions(setusertoken, dispatch);
        toastmsg("1", response.data.message);
        setisshowProfileUpdate(false);
        authenticateApi(setusertoken, dispatch);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toastmsg("0", `${error?.response?.data?.message || "An error occurred"}`);
      setisshowProfileUpdate(false);
    }
  };
  // Change Profile Password Api Call.....
  const changePassword = async () => {
    setisshowchangePassword(true);
    const apiData = {
      old_password: ProfilePasswordData.oldPassword,
      new_password: ProfilePasswordData.newPassword,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": setusertoken,
          Authorization: `Bearer ${setusertoken}`,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/change_password`,
        apiData,
        config
      );
      // console.log("API response---------", response.data);
      if (response.status === 200) {
        emptyStates();
        toastmsg("1", response.data.message);
        setisshowchangePassword(false);
      }
    } catch (error) {
      console.error("Error during API call:", error.response.data.error);
      toastmsg("0", error.response.data.error);
      setisshowchangePassword(false);
    }
  };
  // Transaction  Password Change API-------------
  const TrsUpdatePassword = async () => {
    setisshowTrsPasUpdate(true);
    const apiData = {
      pay_password: TrsPasswordData.transactionPassword,
      otp: TrsPasswordData.otp,
    };
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": setusertoken,
          Authorization: `Bearer ${setusertoken}`,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/payment_password`,
        apiData,
        config
      );
      // console.log("API response---------", response.data);
      if (response.status === 200) {
        emptyStates();
        toastmsg("1", response.data.message);
        setisshowTrsPasUpdate(false);
      }
    } catch (error) {
      console.error("Error during API call:", error.response.data.error);
      toastmsg("0", error.response.data.error);
      setisshowTrsPasUpdate(false);
    }
  };
  // For Profile Password--------
  const handelProPassword = () => {
    const allFieldsFilled = areAllFieldsFilled(ProfilePasswordData);
    if (allFieldsFilled === true) {
      changePassword();
    } else {
      toastmsg("0", "Please fill all required fields correctly.");
    }
  };
  //For Transaction Password Update API---------------
  const handelTrsUpdate = () => {
    const allFieldsFilled = areAllFieldsFilled(TrsPasswordData);
    if (allFieldsFilled === true) {
      TrsUpdatePassword();
    } else {
      toastmsg("0", "Please fill all required fields!");
    }
  };
  //For Profile Update API-------------
  const handelProfileUpdate = () => {
    const allFieldsFilled = areAllFieldsFilled(ProfileData);
    if (allFieldsFilled === true) {
      ProfileUpdateAPI();
    } else {
      toastmsg("0", "Please fill all required fields!");
    }
  };
  // Send-OTP-Funcion----------
  const sendTrspassOTP = () => {
    if (TrsPasswordData.transactionPassword !== "") {
      setisLoader(true);
      resendOTPApi(setusertoken, userID, dispatch);
    } else {
      let newErrors = {};
      newErrors.transactionPassword = "Required TransactionPassword*";
      setErrors(newErrors);
    }
  };
  //---------------------------
  useEffect(() => {
    filterCountryByCode(userdata?.country_code);
  }, [ApiAllData]);
  //-----------------
  useEffect(() => {
    setisLoader(false);
  }, [showLoader]);
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStylesInput = useMemo(() => {
    return getdynamicStylesInput(Theme);
  }, [Theme, PageTheme]);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(PageTheme || Theme);
  }, [PageTheme, Theme]);

  const [tableborder, settableborder] = useState("");
  useEffect(() => {
    if (Theme.mode === "dark") {
      settableborder("#4b5563");
    } else {
      settableborder("#eef2ff");
    }
  }, [Theme]);
  return (
    <div className="">
      <div
        className="flex flex-wrap  justify-center md:justify-start items-center gap-5 mb-10 pb-3 border-b border-indigo-50"
        style={{ borderColor: tableborder }}
      >
        <button
          className={`px-5 h-[45px] ${
            tabProfile === "Profile"
              ? "bg-[#4d33f8] text-white"
              : " text-[#4d33f8]"
          } rounded-lg`}
          onClick={() => setTabProfile("Profile")}
        >
          Profile
        </button>
        <button
          className={`px-5 h-[45px] ${
            tabProfile === "ProfileChange"
              ? "bg-[#4d33f8] text-white"
              : " text-[#4d33f8]"
          } rounded-lg`}
          onClick={() => setTabProfile("ProfileChange")}
        >
          Change Profile Password
        </button>
        <button
          className={`px-5 h-[45px] ${
            tabProfile === "TransactionChange"
              ? "bg-[#4d33f8] text-white"
              : " text-[#4d33f8]"
          } rounded-lg`}
          onClick={() => setTabProfile("TransactionChange")}
        >
          Change Transaction Password
        </button>
      </div>
      {/* Profile Update --- */}
      {tabProfile === "Profile" ? (
        <div className="">
          <div className="mb-10">
            <h4 className="text-[#4d33f8] text-xl">Profile Content</h4>
          </div>
          <div className="flex items-center justify-between gap-5 flex-wrap ">
            <div className="xl:w-[49%]  w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                value={ProfileData.username}
                name="username"
                style={dynamicStylesInput}
                onChange={handleOnchange}
              />
              <div className="absolute bottom-4 right-2">
                {validationStatus.username === "success" && (
                  <p className="mt-2 w-full flex justify-end pr-1">
                    <FaCheckCircle className="transform  text-green-500" />
                  </p>
                )}
              </div>
              {errors.username && (
                <p
                  className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                  style={{ color: dynamicStyles.background }}
                >
                  {errors.username}
                </p>
              )}
            </div>
            <div className="xl:w-[49%]  w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                value={ProfileData.email}
                name="email"
                style={dynamicStylesInput}
                onChange={handleOnchange}
              />
              <div className="absolute bottom-4 right-2">
                {validationStatus.email === "success" && (
                  <p className="mt-2 w-full flex justify-end pr-1">
                    <FaCheckCircle className="transform  text-green-500" />
                  </p>
                )}
              </div>
              {errors.email && (
                <p
                  className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                  style={{ color: dynamicStyles.background }}
                >
                  {errors.email}
                </p>
              )}
            </div>
            <div className="xl:w-[49%]  w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Country code
              </label>
              <select
                className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                name="country_code"
                value={ProfileData.country_code}
                onChange={handleOnchange}
                style={dynamicStylesInput}
              >
                {countries.map((item) => (
                  <option
                    key={item.code}
                    value={item.code}
                    className="flex gap-2"
                    style={dynamicStylesInput}
                  >
                    <span>{item.code}</span>
                    <span> {item.name}</span>
                  </option>
                ))}
              </select>
              <div className="absolute bottom-4 right-5">
                {validationStatus.country_code === "success" && (
                  <p className="mt-2 w-full flex justify-end pr-1">
                    <FaCheckCircle className="transform  text-green-500" />
                  </p>
                )}
              </div>
              {errors.country_code && (
                <p
                  className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                  style={{ color: dynamicStyles.background }}
                >
                  {errors.country_code}
                </p>
              )}
            </div>
            <div className="xl:w-[49%]  sm:w-full w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Mobile{" "}
              </label>
              <input
                type="number"
                placeholder="Enter your number"
                className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                value={ProfileData.Mobile}
                name="Mobile"
                style={dynamicStylesInput}
                onChange={handleOnchange}
              />
              <div className="absolute bottom-4 right-2">
                {validationStatus.Mobile === "success" && (
                  <p className="mt-2 w-full flex justify-end pr-1">
                    <FaCheckCircle className="transform  text-green-500" />
                  </p>
                )}
              </div>
              {errors.Mobile && (
                <p
                  className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                  style={{ color: dynamicStyles.background }}
                >
                  {errors.Mobile}
                </p>
              )}
            </div>

            <div className="xl:w-[49%]  w-full">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Address
              </label>

              <textarea
                name="address"
                value={ProfileData.address}
                placeholder="Address"
                style={dynamicStylesInput}
                onChange={handleOnchange}
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0"
              />
            </div>
            <div className="xl:w-[49%]  w-full">
              {/* <StateDistrictSelector /> */}
              <StateDistrictSelector
                state={ProfileData.state}
                district={ProfileData.district}
                setProfileData={setProfileData}
              />
            </div>

            <div className="xl:w-[49%] sm:w-full w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Profile picture
              </label>
              <input
                type="file"
                placeholder="UTR/Reference No."
                className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                name="file"
                style={dynamicStylesInput}
                onChange={handleOnchange}
              />
              <div className="absolute bottom-4 right-2">
                {validationStatus.file === "success" && (
                  <p className="mt-2 w-full flex justify-end pr-1 bg-white">
                    <FaCheckCircle className="transform  text-green-500" />
                  </p>
                )}
              </div>
              {errors.file && (
                <p
                  className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                  style={{ color: dynamicStyles.background }}
                >
                  {errors.file}
                </p>
              )}
            </div>
            <div className="xl:w-[49%]  sm:w-full w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Pin code
              </label>
              <input
                type="number"
                placeholder="Enter your Pincode"
                className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                value={ProfileData.pincode}
                name="pincode"
                style={dynamicStylesInput}
                onChange={handleOnchange}
              />
              <div className="absolute bottom-4 right-2">
                {validationStatus.pincode === "success" && (
                  <p className="mt-2 w-full flex justify-end pr-1">
                    <FaCheckCircle className="transform  text-green-500" />
                  </p>
                )}
              </div>
              {errors.pincode && (
                <p
                  className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                  style={{ color: dynamicStyles.background }}
                >
                  {errors.pincode}
                </p>
              )}
            </div>
          </div>
          <div className="mt-8">
            {isshowProfileUpdate ? (
              <button
                className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                style={dynamicStyles}
              >
                <LoaderTwo />
              </button>
            ) : (
              <button
                className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                onClick={handelProfileUpdate}
                style={dynamicStyles}
              >
                Update
              </button>
            )}
          </div>
        </div>
      ) : tabProfile === "ProfileChange" ? (
        // Profile Password change -------
        <div className="">
          <div className="mb-10">
            <h4 className="text-[#4d33f8] text-xl">Profile Password Setting</h4>
          </div>
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
              <label
                className="text-sm text-gray-800 font-medium "
                style={{ color: Theme.textcolor }}
              >
                New Password
              </label>
              <div className="relative mt-2">
                <input
                  type={isPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  value={ProfilePasswordData.newPassword}
                  name="newPassword"
                  style={dynamicStylesInput}
                  onChange={handleOnchangePrpPass}
                />
                <button
                  type="button"
                  className="absolute top-3 right-2"
                  onClick={togglePasswordVisibility}
                >
                  {isPassword ? <Eye /> : <EyeOffIcon />}
                </button>
                <div className="absolute top-12 right-2">
                  {validationStatus.newPassword === "success" && (
                    <p className=" mt-2 w-full flex justify-end pr-1">
                      <FaCheckCircle className="transform  text-green-500" />
                    </p>
                  )}
                </div>
                {errors.newPassword && (
                  <p
                    className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                    style={{ color: dynamicStyles.background }}
                  >
                    {errors.newPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Confirm Password{" "}
              </label>
              <div className="relative mt-2">
                <input
                  type={isConPassword ? "text" : "password"}
                  placeholder="Confirm Password "
                  className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  value={ProfilePasswordData.newConfirmPassword}
                  name="newConfirmPassword"
                  style={dynamicStylesInput}
                  onChange={handleOnchangePrpPass}
                />
                <button
                  type="button"
                  className="absolute top-3 right-2"
                  onClick={toggleConPasswordVisibility}
                >
                  {isConPassword ? <Eye /> : <EyeOffIcon />}
                </button>
                <div className="absolute top-12 right-2">
                  {validationStatus.newConfirmPassword === "success" && (
                    <p className=" mt-2 w-full flex justify-end pr-1">
                      <FaCheckCircle className="transform  text-green-500" />
                    </p>
                  )}
                </div>
                {errors.newConfirmPassword && (
                  <p
                    className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                    style={{ color: dynamicStyles.background }}
                  >
                    {errors.newConfirmPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full ">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Current Password
              </label>
              <div className="relative mt-2">
                <input
                  type={isCurrentPassword ? "text" : "password"}
                  placeholder="Current Password"
                  className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  value={ProfilePasswordData.oldPassword}
                  name="oldPassword"
                  style={dynamicStylesInput}
                  onChange={handleOnchangePrpPass}
                />
                <button
                  type="button"
                  className="absolute top-3 right-2"
                  onClick={toggleCurrentPasswordVisibility}
                >
                  {isCurrentPassword ? <Eye /> : <EyeOffIcon />}
                </button>
                <div className="absolute top-12 right-2">
                  {validationStatus.oldPassword === "success" && (
                    <p className=" mt-2 w-full flex justify-end pr-1">
                      <FaCheckCircle className="transform  text-green-500" />
                    </p>
                  )}
                </div>
                {errors.oldPassword &&
                  validationStatus.oldPassword === "error" && (
                    <p
                      className="text-red-500 text-[14px] mt-1 text-end"
                      style={{ color: dynamicStyles.background }}
                    >
                      {errors.oldPassword}
                    </p>
                  )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            {isshowchangePassword ? (
              <button
                className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                style={dynamicStyles}
              >
                <LoaderTwo />
              </button>
            ) : (
              <button
                className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                style={dynamicStyles}
                onClick={handelProPassword}
              >
                Update
              </button>
            )}
          </div>
        </div>
      ) : null}

      {tabProfile === "TransactionChange" ? (
        // Transaction Password change -------
        <div className="flex flex-col gap-5">
          <div className="mb-10">
            <h4 className="text-[#4d33f8] text-xl">
              Transaction Password Setting
            </h4>
          </div>
          <div className="flex flex-wrap gap-5">
            <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                Transaction Password
              </label>
              <div className="relative mt-2">
                <input
                  type={isTrsPassword ? "text" : "password"}
                  placeholder="Transaction Password"
                  className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  value={TrsPasswordData.transactionPassword}
                  name="transactionPassword"
                  style={dynamicStylesInput}
                  onChange={TrsPassOnchange}
                />
                <button
                  type="button"
                  className="absolute right-3 top-0 bottom-0 focus:outline-none"
                  onClick={toggleTrsPasswordVisibility}
                >
                  {isTrsPassword ? <Eye /> : <EyeOffIcon />}
                </button>
                <div className="absolute top-12 right-2">
                  {validationStatus.transactionPassword === "success" && (
                    <p className=" mt-2 w-full flex justify-end pr-1">
                      <FaCheckCircle className="transform  text-green-500" />
                    </p>
                  )}
                </div>
                {errors.transactionPassword && (
                  <p
                    className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                    style={{ color: dynamicStyles.background }}
                  >
                    {errors.transactionPassword}
                  </p>
                )}
              </div>
            </div>
            <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
              <label
                className="text-sm text-gray-800 font-medium"
                style={{ color: Theme.textcolor }}
              >
                One Time Password
              </label>
              <div className="relative mt-2">
                <input
                  type="number"
                  placeholder="Enter One Time Password"
                  className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  value={TrsPasswordData.otp}
                  name="otp"
                  style={dynamicStylesInput}
                  onChange={TrsPassOnchange}
                />
                {isLoader ? (
                  <button
                    className="absolute right-0 top-0 bottom-0 rounded-lg bg-[#4d33f8] px-3 m-1 text-white text-sm"
                    style={dynamicStyles}
                  >
                    <LoaderTwo />
                  </button>
                ) : (
                  <button
                    className="absolute right-0 top-0 bottom-0 rounded-lg bg-[#4d33f8] px-3 m-1 text-white text-sm"
                    onClick={sendTrspassOTP}
                    style={dynamicStyles}
                  >
                    Send OTP
                  </button>
                )}

                <div className="absolute top-12 right-2">
                  {validationStatus.otp === "success" && (
                    <p className=" mt-2 w-full flex justify-end pr-1">
                      <FaCheckCircle className="transform  text-green-500" />
                    </p>
                  )}
                </div>

                {errors.otp && (
                  <p
                    className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                    style={{ color: dynamicStyles.background }}
                  >
                    {errors.otp}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8">
            {isshowTrsPasUpdate ? (
              <button
                className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                style={dynamicStyles}
              >
                <LoaderTwo />
              </button>
            ) : (
              <button
                className="px-5 lg:w-1/6 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                style={dynamicStyles}
                onClick={handelTrsUpdate}
              >
                Update
              </button>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileChangeProfilePassword;
