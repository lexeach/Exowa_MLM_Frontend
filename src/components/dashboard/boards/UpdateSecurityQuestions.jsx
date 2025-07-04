// import { Eye, EyeOffIcon } from "lucide-react";
// import React, { useEffect, useMemo, useState } from "react";
// import LoaderTwo from "../../loader/LoaderTwo";
// import { useSelector } from "react-redux";
// import { getDynamicStyles, getdynamicStylesInput, getdynamicStylesInputerror } from "../GlobalApi/Global";

// const UpdateSecurityQuestions = () => {
//   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
//   const PageTheme = useSelector((state) => state.doWin.PageTheme);
//   const Theme = useSelector((state) => state.doWin.Theme);
//   const dynamicStylesInput = useMemo(() => {
//     return getdynamicStylesInput(Theme);
//   }, [Theme, PageTheme]);
//   const dynamicStyles = useMemo(() => {
//     return getDynamicStyles(PageTheme || Theme);
//   }, [PageTheme, Theme]);
//   //-------------------------
//   const togglePasswordVisibility = () => {
//     setIsPasswordVisible(!isPasswordVisible);
//   };
//   //------------------------------------
//   const questions = [
//     { value: 0, question: "Select a question--" },
//     {
//       value: 13,
//       question: "What was the first trip you went on without your family?",
//     },
//     { value: 12, question: "What was the model of your first mobile phone?" },
//     { value: 11, question: "What is the name of your favorite teacher?" },
//     { value: 10, question: "What was your childhood nickname?" },
//     { value: 9, question: "What is your favorite sports team?" },
//     { value: 8, question: "What is your favorite book?" },
//     { value: 7, question: "What is your favorite movie?" },
//     { value: 6, question: "What was the name of your first pet?" },
//     { value: 5, question: "What is your favorite hobby?" },
//     { value: 4, question: "What is your best friend's first name?" },
//     { value: 3, question: "What city were you born in?" },
//     { value: 2, question: "What is your favorite food?" },
//     { value: 1, question: "What is your favorite color?" },
//   ];
//   //---
//   const BaseURI = process.env.REACT_APP_API_BASE_URI;
//   //   const dispatch = useDispatch();
//   //   const navigation = useNavigate();
//   const [isLoader, setisLoader] = useState(false);
//   const [isValidation, setisValidation] = useState(false);
//   const [formData, setFormData] = useState({
//     SecurityQuestion: "",
//     Answer: "",
//     NewPassword: "",
//     ConfirmPassword: "",
//     otp: "",
//   });
//   const [errors, setErrors] = useState({
//     SecurityQuestion: "",
//     Answer: "",
//     NewPassword: "",
//     ConfirmPassword: "",
//     otp: "",
//   });
//   //----------
//   const handleOnchange = (e) => {
//     setisValidation(true);
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };
//   //--------------------
//   const validate = () => {
//     let newErrors = {};
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!formData.Answer) {
//       newErrors.Answer = "Required Answer*";
//     }
//     if (!formData.NewPassword) {
//       newErrors.NewPassword = "Required NewPassword*";
//     } else if (!passwordRegex.test(formData.NewPassword)) {
//       newErrors.NewPassword = "assword is too weak*";
//     }
//     if (!formData.ConfirmPassword) {
//       newErrors.ConfirmPassword = "Required confirm password*";
//     } else if (formData.NewPassword !== formData.ConfirmPassword) {
//       newErrors.ConfirmPassword = "Passwords do not match*";
//     }
//     if (!formData.otp) {
//       newErrors.otp = "Required OTP*";
//     }
//     if (!formData.SecurityQuestion) {
//       newErrors.SecurityQuestion = "Required Security-Question*";
//     }
//     setErrors(newErrors);
//   };
//   //---------------
//   useEffect(() => {
//     if (isValidation) {
//       validate();
//     }
//   }, [formData]);

//   //----------------
//   // Send-OTP-Funcion----------
//   const sendTrspassOTP = () => {
//     setisLoader(true);
//   };
//   //---------------------------
//   return (
//     <div>
//       <div className="flex items-center justify-between gap-5 flex-wrap">
//         <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//           <label className="text-sm text-gray-800 font-medium"  style={{ color: Theme.textcolor }}>
//             Security Question
//           </label>
//           <select
//             className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//             style={dynamicStylesInput}
//             name="SecurityQuestion"
//             onChange={handleOnchange}
//           >
//             {questions.map((item, index) => (
//               <option
//                 key={item.value}
//                 value={item.question}
//                 disabled={index === 0}
//                 selected={index === 0}
//                 style={dynamicStylesInput}
//               >
//                 {item.question}
//               </option>
//             ))}
//           </select>
//           {errors.SecurityQuestion && (
//             <p
//               className="text-red-500 text-[14px] mt-1 text-end absolute right-0"
//               style={{ color: dynamicStyles.background }}
//             >
//               {errors.SecurityQuestion}
//             </p>
//           )}
//         </div>
//         <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//           <label className="text-sm text-gray-800 font-medium"  style={{ color: Theme.textcolor }}>Answer</label>
//           <input
//             type="text"
//             placeholder="Enter Answer"
//             className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//             style={dynamicStylesInput}
//             name="Answer"
//             onChange={handleOnchange}
//           />
//           {errors.Answer && (
//             <p
//               className="text-red-500 text-[14px] mt-1 text-end absolute right-0"
//               style={{ color: dynamicStyles.background }}
//             >
//               {errors.Answer}
//             </p>
//           )}
//         </div>
//         <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//           <label className="text-sm text-gray-800 font-medium"  style={{ color: Theme.textcolor }}>
//             New Password
//           </label>
//           <div className="relative mt-2">
//             <input
//               type={isPasswordVisible ? "text" : "password"}
//               placeholder="New Password"
//               className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//               style={dynamicStylesInput}
//               name="NewPassword"
//               onChange={handleOnchange}
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-0 bottom-0 focus:outline-none"
//               onClick={togglePasswordVisibility}
//             >
//               {isPasswordVisible ? <EyeOffIcon /> : <Eye />}
//             </button>
//             {errors.NewPassword && (
//               <p
//                 className="text-red-500 text-[14px] mt-1 text-end absolute right-0"
//                 style={{ color: dynamicStyles.background }}
//               >
//                 {errors.NewPassword}
//               </p>
//             )}
//           </div>
//         </div>
//         <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//           <label className="text-sm text-gray-800 font-medium"  style={{ color: Theme.textcolor }}>
//             Confirm Password
//           </label>
//           <div className="relative mt-2">
//             <input
//               type={isPasswordVisible ? "text" : "password"}
//               placeholder="New Password"
//               className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//               style={dynamicStylesInput}
//               name="ConfirmPassword"
//               onChange={handleOnchange}
//             />
//             <button
//               type="button"
//               className="absolute right-3 top-0 bottom-0 focus:outline-none"
//               onClick={togglePasswordVisibility}
//             >
//               {isPasswordVisible ? <EyeOffIcon /> : <Eye />}
//             </button>
//             {errors.ConfirmPassword && (
//               <p
//                 className="text-red-500 text-[14px] mt-1 text-end absolute right-0"
//                 style={{ color: dynamicStyles.background }}
//               >
//                 {errors.ConfirmPassword}
//               </p>
//             )}
//           </div>
//         </div>

//         <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
//           <label className="text-sm text-gray-800 font-medium"  style={{ color: Theme.textcolor }}>
//             One Time Password
//           </label>
//           <div className="relative mt-2">
//             <input
//               type="number"
//               placeholder="Enter One Time Password"
//               className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
//               style={dynamicStylesInput}
//               name="otp"
//               onChange={handleOnchange}
//             />
//             {isLoader ? (
//               <button
//                 className="absolute right-0 top-0 bottom-0 rounded-lg bg-[#4d33f8] px-3 m-1 text-white text-sm"
//                 style={dynamicStyles}
//               >
//                 <LoaderTwo />
//               </button>
//             ) : (
//               <button
//                 className="absolute right-0 top-0 bottom-0 rounded-lg bg-[#4d33f8] px-3 m-1 text-white text-sm"
//                 onClick={sendTrspassOTP}
//                 style={dynamicStyles}
//               >
//                 Send OTP
//               </button>
//             )}
//           </div>
//           {errors.otp && (
//             <p
//               className="text-red-500 text-[14px] mt-1 text-end absolute right-0"
//               style={{ color: dynamicStyles.background }}
//             >
//               {errors.otp}
//             </p>
//           )}
//         </div>
//       </div>
//       <div className="mt-8">
//         <button
//           className="px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
//           style={dynamicStyles}
//         >
//           Update
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpdateSecurityQuestions;
