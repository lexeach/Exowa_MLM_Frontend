import React, { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/LoaderTwo";
import toast from "react-hot-toast";
import axios from "axios";
import {
  ConvertPrice,
  authenticateApi,
  getDynamicStyles,
  getUserNotifitions,
  getdynamicStylesInput,
  toastmsg,
} from "../GlobalApi/Global";
import LoaderTwo from "../../loader/LoaderTwo";
import { FaCheckCircle } from "react-icons/fa";

const DepositFund = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const userdata = ApiAllData.data.company_banks;
  // console.log("userdata-----------", userdata);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.doWin.userLoginData);
  const setusertoken = userToken.token;
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const [isLoader, setisLoader] = useState(false);
  const [isValidation, setisValidation] = useState(false);
  const [CurrentPrice, setCurrentPrice] = useState("");
  const [INR, setINR] = useState("");
  //   console.log("INR", INR);
  const [formData, setFormData] = useState({
    HolderName: "",
    AmountDoller: "",
    AmountINR: "",
    bank_name: "",
    ReferenceUTR: "",
    PaymentMode: "",
    PaymentDepositDate: "",
    file: null,
  });
  //   console.log("formData----------", formData);
  //------------Error state-------------
  const [errors, setErrors] = useState({
    HolderName: "",
    AmountDoller: "",
    AmountINR: "",
    bank_name: "",
    ReferenceUTR: "",
    PaymentMode: "",
    PaymentDepositDate: "",
    file: "",
  });
  //-------------

  //---------
  const SubmitRequestApi = async () => {
    setisLoader(true);
    const apiData = {
      photo: formData.file,
      acc_holder: formData.HolderName,
      amountindollar: formData.AmountDoller,
      amountinrupees: formData.AmountINR,
      transaction_reference: formData.ReferenceUTR,
      payment_mode: formData.PaymentMode,
      payment_date: formData.PaymentDepositDate,
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
        `${BaseURI}/user/deposit_request`,
        apiData,
        config
      );
      //   console.log("API response:", response.data);
      if (response.status === 200) {
        getUserNotifitions(setusertoken, dispatch);
        toast.success(response.data.message);
        authenticateApi(setusertoken, dispatch);
        setisValidation(false);
        setTimeout(() => {
          EmptyState();
          setisLoader(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(`${error?.response?.data?.message || "An error occurred"}`);
      setisLoader(false);
    }
  };
  //----------------
  const fileInputRef = useRef(null);
  const EmptyState = () => {
    setFormData({
      HolderName: "",
      AmountDoller: "",
      AmountINR: "",
      bank_name: "",
      ReferenceUTR: "",
      PaymentMode: "",
      PaymentDepositDate: "",
      file: null,
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };
  //----------------------
  const handleOnchange = (e) => {
    setisValidation(true);
    const { name, value, files } = e.target;
    ConvertPrice(name, value, formData, setFormData);
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };
  //---------paymentMode Array------------
  const paymentMode = [
    { mode: " Select mode--" },
    { mode: "Cash Deposit by Branch" },
    { mode: "Cash Deposit Machine (CDM)" },
    { mode: "IMPS" },
    { mode: "NEFT/RTGS" },
  ];
  //----------------

  const validate = () => {
    let newErrors = {};

    if (!formData.HolderName) {
      newErrors.HolderName = "Required*";
    }
    if (!formData.AmountDoller) {
      newErrors.AmountDoller = "Required*";
    } else if (formData.AmountDoller < 0) {
      newErrors.AmountDoller = "Amount cannot be negative";
    }
    if (!formData.AmountINR) {
      newErrors.AmountINR = "Required*";
    } else if (formData.AmountINR < 0) {
      newErrors.AmountINR = "Amount cannot be negative";
    }
    if (!formData.ReferenceUTR) {
      newErrors.ReferenceUTR = "Required*";
    }
    if (!formData.PaymentMode) {
      newErrors.PaymentMode = "Required*";
    }
    if (!formData.PaymentDepositDate) {
      newErrors.PaymentDepositDate = "Required*";
    }
    if (!formData.file) {
      newErrors.file = "Required*";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted successfully");
    }
  };

  //---------------
  useEffect(() => {
    if (isValidation) {
      validate();
    }
  }, [formData]);
  // Get Current INR Price
  // useEffect(() => {
  //   const getINRPrice = async () => {
  //     try {
  //       const res = await axios.get(
  //         "https://v6.exchangerate-api.com/v6/60cc825412882cad57205cac/latest/USD"
  //       );
  //       setCurrentPrice(res?.data?.conversion_rates?.INR.toFixed(2));
  //     } catch (error) {
  //       console.error("Error fetching exchange rate:", error);
  //     }
  //   };
  //   getINRPrice();
  // }, []);
  const handleSubmit = () => {
    setisValidation(true);
    validate();
    if (Object.keys(errors).length === 0) {
      SubmitRequestApi();
    } else {
      toastmsg("0", "Please fill all required fields!");
    }
  };
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStylesInput = useMemo(() => {
    return getdynamicStylesInput(Theme);
  }, [Theme, PageTheme]);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(PageTheme || Theme);
  }, [PageTheme, Theme]);
  return (
    <div>
      <div className="flex items-center justify-between gap-5 flex-wrap">
        <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Company Bank Name
          </label>
          <select
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="bank_name"
            style={dynamicStylesInput}
            value={formData.bank_name}
            onChange={handleOnchange}
          >
            {userdata?.map((item) => (
              <option key={item.code} value={item.code} className="flex gap-2">
                <span>{item.bank_name}</span>
              </option>
            ))}
          </select>
          {!errors.bank_name && formData.bank_name !== "" && (
            <p className="absolute top-12 right-3">
              <FaCheckCircle className="transform  text-green-500" />
            </p>
          )}
        </div>
        <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Debited A/c Holder Name
          </label>
          <input
            type="text"
            placeholder="Debited A/c Holder Name"
            style={dynamicStylesInput}
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="HolderName"
            value={formData.HolderName}
            onChange={handleOnchange}
          />
          {!errors.HolderName && formData.HolderName !== "" && (
            <p className="absolute top-12 right-3">
              <FaCheckCircle className="transform  text-green-500" />
            </p>
          )}
          {errors.HolderName && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.HolderName}
            </p>
          )}
        </div>

        <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Amount($){" "}
          </label>
          <input
            type="number"
            placeholder="Enter Amount"
            style={dynamicStylesInput}
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="AmountDoller"
            value={formData.AmountDoller}
            onChange={handleOnchange}
          />
          {!errors.AmountDoller && formData.AmountDoller !== "" && (
            <p className="absolute top-12 right-3">
              <FaCheckCircle className="transform  text-green-500" />
            </p>
          )}
          {errors.AmountDoller && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.AmountDoller}
            </p>
          )}
        </div>
        <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Amount to be Send(INR){" "}
          </label>
          <input
            type="number"
            placeholder="Amount to be Send"
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="AmountINR"
            style={dynamicStylesInput}
            value={formData.AmountINR}
            onChange={handleOnchange}
          />
          {!errors.AmountINR && formData.AmountINR !== "" && (
            <p className="absolute top-12 right-3">
              <FaCheckCircle className="transform  text-green-500" />
            </p>
          )}
          {errors.AmountINR && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.AmountINR}
            </p>
          )}
        </div>
        <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            UTR/Reference No.{" "}
          </label>
          <input
            type="text"
            placeholder="UTR/Reference No."
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="ReferenceUTR"
            style={dynamicStylesInput}
            value={formData.ReferenceUTR}
            onChange={handleOnchange}
          />
          {!errors.ReferenceUTR && formData.ReferenceUTR !== "" && (
            <p className="absolute top-12 right-3">
              <FaCheckCircle className="transform  text-green-500" />
            </p>
          )}
          {errors.ReferenceUTR && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.ReferenceUTR}
            </p>
          )}
        </div>
        <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Payment Mode
          </label>

          <select
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="PaymentMode"
            style={dynamicStylesInput}
            value={formData.PaymentMode}
            onChange={handleOnchange}
          >
            {paymentMode?.map((item, index) => (
              <>
                <option
                  key={item.mode}
                  className="flex gap-2"
                  disabled={index === 0}
                  selected={index === 0}
                >
                  <span>{item.mode}</span>
                </option>
              </>
            ))}
          </select>
          {!errors.PaymentMode && formData.PaymentMode !== "" && (
            <p className="absolute top-12 right-3">
              <FaCheckCircle className="transform  text-green-500" />
            </p>
          )}
          {errors.PaymentMode && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.PaymentMode}
            </p>
          )}
        </div>
        <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Payment Deposit Date{" "}
          </label>
          <input
            type="date"
            placeholder="UTR/Reference No."
            style={dynamicStylesInput}
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="PaymentDepositDate"
            value={formData.PaymentDepositDate}
            onChange={handleOnchange}
          />
          {!errors.PaymentDepositDate && formData.PaymentDepositDate !== "" && (
            <p className="absolute top-12 right-3">
              <FaCheckCircle className="transform  text-green-500" />
            </p>
          )}
          {errors.PaymentDepositDate && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.PaymentDepositDate}
            </p>
          )}
        </div>
        <div className="lg:w-[49%] md:w-[49%] sm:w-full w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Browse Slip{" "}
          </label>
          <input
            type="file"
            placeholder="UTR/Reference No."
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="file"
            style={dynamicStylesInput}
            ref={fileInputRef}
            onChange={handleOnchange}
          />
          {!errors.file && formData.file !== "" && (
            <p className="absolute top-12 right-3">
              <FaCheckCircle className="transform  text-green-500" />
            </p>
          )}
          {errors.file && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.file}
            </p>
          )}
        </div>
      </div>
      <div className="mt-8">
        <div className="pt-3">
          {isLoader ? (
            <button
              className="px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
              style={dynamicStyles}
            >
              <LoaderTwo />
            </button>
          ) : (
            <button
              button
              className="px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
              onClick={handleSubmit}
              style={dynamicStyles}
            >
              Submit Deposit Request
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositFund;
