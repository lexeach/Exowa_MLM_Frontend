// import React, { useEffect, useState } from "react";
// import { BsFillLockFill } from "react-icons/bs";
// import { TbKeyframesFilled } from "react-icons/tb";
// import { useDispatch, useSelector } from "react-redux";
// import { authenticateApi, formatAmount, toastmsg } from "../GlobalApi/Global";
// import { useNavigate } from "react-router-dom";
// import { VscEmptyWindow } from "react-icons/vsc";
// import LoaderTwo from "../../loader/LoaderTwo";
// import axios from "axios";
// import { setshort_link } from "../../../Redux/DoWinSlice";

// const PaymentCart = () => {
//   const BaseURI = process.env.REACT_APP_API_BASE_URI;
//   const Navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Redux selectors
//   const authData = useSelector((state) => state.doWin.ApiAllData);
//   const logindata = useSelector((state) => state.doWin.userLoginData);

//   const userlevels = authData?.data?.mergedUserLevels || [];
//   const data = userlevels[0] ?? [];
//   const fees = formatAmount(data?.default_amount);
//   const userActiveLevel = authData?.data?.mergedUserLevels[0]?.is_active || 0;
//   const usertoken = logindata?.token;
//   const myshortlink = useSelector((state) => state.doWin.short_link);
//   // Component state
//   const [loader, setloader] = useState(false);
//   const [isPaymentSuccess, setisPaymentSuccess] = useState(false);
//   // Original callback URL template
//   const callbackUrl = `${window.location.origin}/autasis/paymentCart`;

//   const handlePayment = async (amount) => {
//     setloader(true);
//     try {
//       const config = {
//         headers: {
//           "x-access-token": usertoken,
//         },
//       };

//       const response = await axios.post(
//         `${BaseURI}/create-payment-link`,
//         { amount: amount, callback_url: callbackUrl },
//         config
//       );

//       if (response.status === 200) {
//         window.location.href = response?.data?.short_url;
//         dispatch(setshort_link(response?.data?.short_url));
//       }
//     } catch (error) {
//       console.error("Payment error:", error);
//       setloader(false);
//       toastmsg(
//         "0",
//         error?.response?.message ||
//           error?.response?.data?.message ||
//           error?.response?.data?.error
//       );
//     }
//   };

//   const handlePaymentVerify = async ({ razorpayPaymentId, myshortlink }) => {
//     try {
//       const config = {
//         headers: {
//           "x-access-token": usertoken,
//         },
//       };
//       const response = await axios.post(
//         `${BaseURI}/user/activate-level`,
//         { paymentId: razorpayPaymentId, short_URL: myshortlink },
//         config
//       );
//       if (response.status === 200) {
//         authenticateApi(usertoken, dispatch, Navigate);
//     dispatch(setshort_link(""));
//       }
//     } catch (error) {
//       console.error("Error during API call:", error);
//       setisPaymentSuccess(false);
//       setloader(false);
//       toastmsg(
//         "0",
//         error?.response?.message ||
//           error?.response?.data?.message ||
//           error?.response?.data?.error
//       );
//     }
//   };

//   useEffect(() => {
//     // Parse the current URL
//     const query = new URLSearchParams(window.location.search);
//     const razorpayPaymentId = query.get("razorpay_payment_id");
//     const razorpayStatus = query.get("razorpay_payment_link_status");

//     if (razorpayPaymentId) {
//       // Clean up the URL to only show the parameters we want
//       const cleanUrl = `${window.location.pathname}?razorpayPaymentId=${razorpayPaymentId}&status=${razorpayStatus}`;
//       window.history.replaceState({}, document.title, cleanUrl);
//       if (razorpayStatus === "paid") {
//         toastmsg("1", "Payment successful!");
//         handlePaymentVerify({ razorpayPaymentId, myshortlink });
//         setisPaymentSuccess(true);
//       } else {
//         toastmsg("0", "Payment failed!");
//         setisPaymentSuccess(false);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     if (userActiveLevel > 0) {
//       Navigate("/");
//     }
//   }, [userActiveLevel]);

//   return (
//     <>
//       <div className="w-full flex justify-center items-center py-6 sm:min-h-[600px]">
//         {isPaymentSuccess ? (
//           <div className="sm:w-[400px] sm:h-[400px] w-[300px] h-[300px]  mx-auto mt-[5rem] flex flex-col items-center justify-center px-4 py-4 shadow-lg border border-green-500 rounded-md">
//             <img
//               src={require("../../../assets/images/success.png")}
//               alt="img"
//               className="w-fit"
//             />
//             <h1 className="font-semibold"> 🚀 Payment Successful!</h1>
//             <div className="bg-green-500 px-4 py-2 rounded-lg my-3 mx-2">
//               <LoaderTwo />
//             </div>
//           </div>
//         ) : (
//           <div className="lg:w-[80%] mx-auto sm:mt-[10rem] mt-5 flex flex-wrap xl:justify-center lg:justify-start justify-center items-center gap-6 px-4">
//             <div
//               key={data?.level}
//               className="lg:w-[330px] xl:w-[350px] 2xl:w-[375px] w-full h-[170px] lg:h-[180px] text-white rounded-lg px-3"
//               style={{
//                 background: "linear-gradient(115deg, #256EFE, #052891)",
//               }}
//             >
//               <div className="flex justify-between items-center">
//                 <p className="text-[1rem] font-bold py-[8px]">
//                   Level {data?.level}
//                 </p>
//               </div>
//               <div className="text-white rounded-lg flex justify-start gap-3 items-center px-2 mt-2">
//                 <div className="p-2 rounded-xl bg-white">
//                   <BsFillLockFill className="text-[#003A9B] font-extrabold text-[1.9rem]" />
//                 </div>
//                 <div className="flex gap-1 relative w-full">
//                   <div className="flex flex-col -gap-5 items-start">
//                     {data?.is_active === 0 && (
//                       <p className="flex gap-1 justify-center items-start text-[1.1rem]">
//                         Fees ₹<span className="text-[1.2rem]">{fees}</span>
//                       </p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full flex justify-end lg:mt-6 mt-4">
//                 {loader ? (
//                   <button className="px-2 w-[80px] py-[6px] flex justify-center gap-1 items-center rounded-lg ease-in duration-[0.4s] hover:scale-[0.9]">
//                     <LoaderTwo />
//                   </button>
//                 ) : (
//                   <button
//                     className="px-2 py-[6px] text-[#003A9B] flex justify-center gap-1 items-center bg-white rounded-lg ease-in duration-[0.4s] hover:scale-[0.9]"
//                     onClick={() => handlePayment(fees)}
//                   >
//                     PayNow
//                     <TbKeyframesFilled className="text-[#003A9B] font-extrabold text-[1.3rem]" />
//                   </button>
//                 )}
//               </div>
//             </div>

//             <div
//               className="lg:w-[330px] xl:w-[350px] 2xl:w-[375px] w-full h-[170px] lg:h-[180px] text-white rounded-lg flex flex-col items-center justify-center gap-4 px-3"
//               style={{
//                 background: "linear-gradient(115deg, #256EFE, #052891)",
//               }}
//             >
//               <h1>
//                 <VscEmptyWindow />
//               </h1>
//             </div>

//             <div
//               className="lg:w-[330px] xl:w-[350px] 2xl:w-[375px] w-full h-[170px] lg:h-[180px] text-white rounded-lg flex flex-col items-center justify-center gap-4 px-3"
//               style={{
//                 background: "linear-gradient(115deg, #256EFE, #052891)",
//               }}
//             >
//               <h1>
//                 <VscEmptyWindow />
//               </h1>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default PaymentCart;

import React, { useEffect, useState } from "react";
import { BsFillLockFill } from "react-icons/bs";
import { TbKeyframesFilled } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { authenticateApi, formatAmount, toastmsg } from "../GlobalApi/Global";
import { useNavigate } from "react-router-dom";
import LoaderTwo from "../../loader/LoaderTwo";
import axios from "axios";
import { setshort_link } from "../../../Redux/DoWinSlice";
import bgone from "../../../assets/paymentcartimages/bgcover2.png";
import cartbgimg from "../../../assets/paymentcartimages/bgcover1.png";
import footerimg from "../../../assets/paymentcartimages/bg2.png";
import { IoLogoFacebook, IoLogoInstagram, IoLogoYoutube } from "react-icons/io";

const PaymentCart = () => {
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux selectors
  const authData = useSelector((state) => state.doWin.ApiAllData);
  const logindata = useSelector((state) => state.doWin.userLoginData);

  const userlevels = authData?.data?.mergedUserLevels || [];
  const data = userlevels[0] ?? [];
  const fees = formatAmount(data?.default_amount);
  const userActiveLevel = authData?.data?.mergedUserLevels[0]?.is_active || 0;
  const usertoken = logindata?.token;
  const myshortlink = useSelector((state) => state.doWin.short_link);
  // Component state
  const [loader, setloader] = useState(false);
  const [isPaymentSuccess, setisPaymentSuccess] = useState(false);

  // Original callback URL template
  const callbackUrl = `${window.location.origin}/autasis/paymentCart`;

  const handlePayment = async (amount) => {
    setloader(true);
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };

      const response = await axios.post(
        `${BaseURI}/create-payment-link`,
        { amount: amount, callback_url: callbackUrl },
        config
      );

      if (response.status === 200) {
        window.location.href = response?.data?.short_url;
        dispatch(setshort_link(response?.data?.short_url));
      }
    } catch (error) {
      console.error("Payment error:", error);
      setloader(false);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error
      );
    }
  };

  const handlePaymentVerify = async ({ razorpayPaymentId, myshortlink }) => {
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/activate-level`,
        { paymentId: razorpayPaymentId, short_URL: myshortlink },
        config
      );
      if (response.status === 200) {
        authenticateApi(usertoken, dispatch, Navigate);
        dispatch(setshort_link(""));
      }
    } catch (error) {
      console.error("Error during API call:", error);
      setisPaymentSuccess(false);
      setloader(false);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error
      );
    }
  };

  useEffect(() => {
    // Parse the current URL
    const query = new URLSearchParams(window.location.search);
    const razorpayPaymentId = query.get("razorpay_payment_id");
    const razorpayStatus = query.get("razorpay_payment_link_status");

    if (razorpayPaymentId) {
      // Clean up the URL to only show the parameters we want
      const cleanUrl = `${window.location.pathname}?razorpayPaymentId=${razorpayPaymentId}&status=${razorpayStatus}`;
      window.history.replaceState({}, document.title, cleanUrl);
      if (razorpayStatus === "paid") {
        toastmsg("1", "Payment successful!");
        handlePaymentVerify({ razorpayPaymentId, myshortlink });
        setisPaymentSuccess(true);
      } else {
        toastmsg("0", "Payment failed!");
        setisPaymentSuccess(false);
      }
    }
  }, []);

  useEffect(() => {
    if (userActiveLevel > 0) {
      Navigate("/");
    }
  }, [userActiveLevel]);

  return (
    <>
      {/* <div className="w-full flex justify-center items-center py-6 sm:min-h-[900px] sm:h-fit h-ful bg-[#09165B]"> */}
      <div className="w-full flex justify-center items-center py-6 min-h-[900px] h-full bg-[#09165B]">
        {isPaymentSuccess ? (
          <div className="sm:w-[400px] sm:h-[400px] w-[300px] h-[300px]  mx-auto mt-[5rem] flex flex-col items-center justify-center px-4 py-4 shadow-lg border border-green-500 rounded-md">
            <img
              src={require("../../../assets/images/success.png")}
              alt="img"
              className="w-fit"
            />
            <h1 className="font-semibold text-white">
              {" "}
              🚀 Payment Successful!
            </h1>
            <div className="bg-green-500 px-4 py-2 rounded-lg my-3 mx-2">
              <LoaderTwo />
            </div>
          </div>
        ) : (
          <div className="md:w-[80%] mx-auto w-full">
            <div
              className="w-full 2xl:h-[1000px] xl:h-[1100px] pb-20   bg-inherit bg-center bg-no-repeat xl:bg-contain bg-cover flex flex-col items-center"
              style={{ backgroundImage: `url(${bgone})` }}
            >
              <div className="flex flex-col justify-center items-center relative py-10 px-2">
                <img
                  src={require("../../../assets/logo/logo-white.png")}
                  alt="logo"
                  className="lg:w-[300px] w-[200px]"

                />
                <button className="px-4 py-2 rounded-full text-red-800 font-bold bg-white">
                  SPECIAL OFFER
                </button>
                <h1 className="lg:text-[3rem] md:text-[2rem] text-[1.6rem] w-full lg:w-[40%] md:w-[80%] text-[#12CDF5] text-center mt-8">
                  You are successfully registered for free trial
                </h1>
                <p className="lg:w-[40%] md:w-[80%] w-[90%] text-center text-white md:text-[1.5rem] text-[1rem] md:mt-5 mt-3">
                  Please visit
                  <a
                    href="http://test.exowa.click"
                    className="underline px-3 text-[#12CDF5]"
                  >
                    http://test.exowa.click
                  </a>
                  to create your assessment. Your login credentials have been
                  sent to your registered email ID.
                </p>
                <p className="lg:w-[40%] md:w-[80%] w-[90%] text-center text-[#b3ed0f] md:text-[1.5rem] text-[1.2rem] mt-5">
                  As your trial period comes to an end, we want to share the
                  exciting benefits you’ll gain by upgrading to our Pro service.
                </p>
                {/* <img
                  src={require("../../../assets/paymentcartimages/roket.png")}
                  alt="rocket"
                  className="w-[350px] mt-5"
                /> */}
              </div>
            </div>


            <div
                className=" px-4 py-6   xl:w-[60%] md:w-[80%] w-full  rounded-lg sm:mx-auto bg-center bg-no-repeat  bg-inherit"
                style={{ backgroundImage: `url(${cartbgimg})` }}
              >
                <p className="md:text-[2.3rem] text-[1.1rem] text-center text-[#12CDF5]">
                  Special Offer: Upgrade Today and{" "}
                  <span className="text-[#EFD16C] font-bold">Save !</span>
                </p>

                <p className="md:text-[2.3rem] text-[1.1rem] text-center text-[#EFA06C] font-bold">
                  regular price <del>Rs 5000/</del>-
                </p>
                <p className="md:text-[2.3rem] text-[1.1rem] text-center text-[#6CEF82] font-bold">
                  offer price Rs 3650/-
                </p>
                <p className="sm:w-[50%] mx-auto mt-3 text-[1.1rem] text-center text-white">
                  To show our appreciation, we’re offering a{" "}
                  <span className="font-bold">30% discount</span> on your first
                  year when you upgrade to Pro.
                </p>

                <div className="w-full flex justify-center lg:mt-6 mt-4">
                  {loader ? (
                    <button className="px-4 py-4 my-6 bg-[#12CDF5] hover:bg-[#12cbf5c7] rounded-md">
                      <LoaderTwo />
                    </button>
                  ) : (
                    <button
                      className="px-4 py-4 my-6 bg-[#12CDF5] hover:bg-[#12cbf5c7] rounded-md"
                      onClick={() => handlePayment(fees)}
                    >
                      Upgarade Now
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full flex justify-center items-center">
                 <img
                  src={require("../../../assets/paymentcartimages/roket.png")}
                  alt="rocket"
                  className="w-[350px] mt-5"
                />
              </div>

            <div className="py-6">
              <h1 className="text-[#12CDF5] md:text-[3rem] text-[2rem] text-center mt-20 font-bold">
                Why Upgrade to Pro?
              </h1>
              <div className="flex justify-end mt-14">
                <div className="px-4 sm:py-6  py-2 rounded-l-full bg-[#15CDF6] flex items-center gap-1 xl:w-[50%] lg:w-[70%] w-full">
                  <div className="sm:w-[40%] w-[60%]">
                    <img
                      src={require("../../../assets/paymentcartimages/power.png")}
                      alt="power"
                      className="w-[70%]"
                    />
                  </div>
                  <div className="">
                    <p className="text-[#09165B] sm:text-[1.3rem] font-bold">
                      Increased Speed
                    </p>
                    <p className="text-[#16629b] mt-2">
                      Pro accounts benefit from faster server response times,
                      ensuring your website runs smoothly even during peak
                      traffic.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-start mt-14">
                <div className="px-4 sm:py-6  py-2 rounded-r-full bg-[#15CDF6] flex items-center gap-1 xl:w-[50%] lg:w-[70%] w-full">
                  <div className="">
                    <p className="text-[#09165B] sm:text-[1.3rem] font-bold">
                      Increased number of assements limits
                    </p>
                    <p className="text-[#16629b] mt-2">
                      Unlock more learning opportunities for your child with
                      increased number of assessment limits on EXOWA.
                    </p>
                  </div>
                  <div className="sm:w-[40%] w-[60%]">
                    <img
                      src={require("../../../assets/paymentcartimages/lock.png")}
                      alt="power"
                      className="w-[70%]"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-14">
                <div className="px-4 sm:py-6  py-2 rounded-l-full bg-[#15CDF6] flex items-center gap-1 xl:w-[50%] lg:w-[70%] w-full">
                  <div className="sm:w-[40%] w-[60%]">
                    <img
                      src={require("../../../assets/paymentcartimages/clock.png")}
                      alt="power"
                      className="w-[70%]"
                    />
                  </div>
                  <div className="">
                    <p className="text-[#09165B] sm:text-[1.3rem] font-bold">
                      24/7 Support
                    </p>
                    <p className="text-[#16629b] mt-2">
                      Get help anytime with our dedicated support team available
                      round-the-clock via chat, email, and phone.
                    </p>
                  </div>
                </div>
              </div>

            
            </div>
            <div className="px-4 py-6 mt-10   w-full  rounded-lg sm:mx-auto  bg-center bg-no-repeat  bg-inherit">
              <div className="w-full flex flex-col items-center justify-center text-center">
                <img
                  src={require("../../../assets/logo/logo-white.png")}
                  alt="logo"
                  className="w-[300px]"
                />
                <p className="text-white text-center">
                  For support write to
                  <a
                    href="mailto:support@exowa"
                    className="px-2 font-bold hover:underline"
                  >
                    support@exowa
                  </a>{" "}
                  click
                </p>
                <div className="flex gap-4 mt-5">
                  <a
                    href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61572926919832"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoFacebook className="text-[#12CDF5] text-[2rem] hover:scale-110 transition-transform" />
                  </a>

                  <a
                    href="https://www.instagram.com/ExowaEdutech"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoInstagram className="text-[#12CDF5] text-[2rem] hover:scale-110 transition-transform" />
                  </a>

                  <a
                    href="https://youtube.com/@Tajirmedia?si=VW63s4AKMjiVxCg5"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IoLogoYoutube className="text-[#12CDF5] text-[2rem] hover:scale-110 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PaymentCart;
