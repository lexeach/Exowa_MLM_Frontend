import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../loader/LoaderTwo";
import toast from "react-hot-toast";
import axios from "axios";
import {
  authenticateApi,
  getDynamicStyles,
  getUserNotifitions,
  getdynamicStylesInput,
  resendOTPApi,
  toastmsg,
} from "../GlobalApi/Global";
import LoaderTwo from "../../loader/LoaderTwo";
import { FaCheckCircle } from "react-icons/fa";
import { Eye, EyeOffIcon } from "lucide-react";

const BankKYCForm = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  // console.log("ApiAllData-----------", ApiAllData);
  const dispatch = useDispatch();
  const userToken = useSelector((state) => state.doWin.userLoginData);
  const setusertoken = userToken.token;
  const userID = userToken?.user?.userid;
  // console.log("userID", userID);
  const showLoader = useSelector((state) => state.doWin.isshowLoader);

  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const [isLoader, setisLoader] = useState(false);
  const [isLoader1, setisLoader1] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isValidation, setisValidation] = useState(false);
  const [formData, setFormData] = useState({
    accholder: "",
    BankName: "",
    AccNo: "",
    Branch: "",
    Address: "",
    ifsc: "",
    panno: "",
    otp: "",
    TrsPassword: "",
  });
  const [ifscDone, setifscDone] = useState(false);
  const togglePasswordVisibility = () => {
         setIsPasswordVisible(!isPasswordVisible);
       };
  //------------Error state-------------
  const [errors, setErrors] = useState({
    accholder: "",
    Address: "",
    ifsc: "",
    panno: "",
    otp: "",
    TrsPassword: "",
  });
  //-----------------
  const SubmitRequestApi = async () => {
    setisLoader(true);
    const apiData = {
      bank_name: formData.BankName,
      ifsc: formData.ifsc,
      bank_add: formData.Address,
      bank_branch: formData.Branch,
      acc_no: formData.AccNo,
      acc_holder: formData.accholder,
      pan_no: formData.panno,
      otp: formData.otp,
      transacation_password: formData.TrsPassword,
    };
    // console.log("SubmitRequestApi-----", apiData);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": setusertoken,
          Authorization: `Bearer ${setusertoken}`,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/bank_kyc`,
        apiData,
        config
      );
      //   console.log("API response:", response.data);
      if (response.status === 200) {
        getUserNotifitions(setusertoken, dispatch);
        toast.success(response.data.message);
        authenticateApi(setusertoken, dispatch);
        setTimeout(() => {
          EmptyState();
          setisValidation(false);
          setisLoader(false);
        }, 1000);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(
        `${
          error?.response?.data?.message ||
          error?.response?.data?.error ||
          error.message
        }`
      );
      setisLoader(false);
    }
  };
  //----------------
  const EmptyState = () => {
    setFormData({
      accholder: "",
      BankName: "",
      AccNo: "",
      ifsc: "",
      panno: "",
      otp: "",
      TrsPassword: "",
      Branch: "",
      Address: "",
    });
  };
  //----------------------
  const handleOnchange = (e) => {
    setisValidation(true);
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  //---------paymentMode Array------------
  const validate = () => {
    let newErrors = {};
    if (!formData.accholder) {
      newErrors.accholder = "Required*";
    }

    if (!formData.AccNo) {
      newErrors.AccNo = "Required*";
    }

    if (!formData.ifsc) {
      newErrors.ifsc = "Required*";
    } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/i.test(formData.ifsc)) {
      newErrors.ifsc = "Invalid IFSC format";
    }
    if (!formData.panno) {
      newErrors.panno = "Required*";
    }
    if (!formData.TrsPassword) {
      newErrors.TrsPassword = "Required*";
    }
    if (!formData.otp) {
      newErrors.otp = "Required*";
    } else {
      console.log("Done");
    }
    setErrors(newErrors);
  };
  //---------------
  useEffect(() => {
    if (isValidation) {
      validate();
    }
  }, [formData]);
  const handleSubmit = () => {
    setisValidation(true);
    validate();

    if (Object.keys(errors).length === 0 && ifscDone === true) {
      SubmitRequestApi();
    }
    if (ifscDone === false && formData.ifsc !== "") {
      toastmsg("0", "Invalid IFSC code");
    }
  };
  const sendTrspassOTP = () => {
    if (formData.TrsPassword !== "") {
      setisLoader1(true);
      resendOTPApi(setusertoken, userID, dispatch);
    } else {
      setisLoader1(false);
      toastmsg("0", "Required TransactionPassword*");
    }
  };
  const getIfscDetails = async (ifscCode) => {
    try {
      const res = await axios.get(`https://ifsc.razorpay.com/${ifscCode}`);

      const data = res.data || "";
      setFormData((prevFormData) => ({
        ...prevFormData,
        BankName: data.BANK || prevFormData.BankName,
        Branch: data.BRANCH || prevFormData.Branch,
        Address: data.ADDRESS || prevFormData.Address,
      }));
      setifscDone(true);
    } catch (error) {
      setifscDone(false);

      setFormData((prevFormData) => ({
        ...prevFormData,
        BankName: "",
        Branch: "",
        Address: "",
      }));
    }
  };
  useEffect(() => {
    if (formData.ifsc) {
      getIfscDetails(formData.ifsc);
    }
  }, [formData.ifsc]);

  useEffect(() => {
    setisLoader1(false);
  }, [showLoader]);
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
        <div className="xl:w-[49%]  w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            IFSC
          </label>
          <input
            type="text"
            placeholder="Enter IFSC"
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="ifsc"
            style={dynamicStylesInput}
            value={formData.ifsc}
            onChange={handleOnchange}
          />
          <div className="absolute top-12 right-2">
            {formData.ifsc !== "" && ifscDone === true && (
              <p className="w-full flex justify-end pr-1 ">
                <FaCheckCircle className="transform  text-green-500" />
              </p>
            )}
          </div>
          {errors.ifsc && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.ifsc}
            </p>
          )}
        </div>
        <div className="xl:w-[49%]  w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Bank Name
          </label>
          <input
            type="text"
            placeholder="Bank Name"
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="BankName"
            style={dynamicStylesInput}
            value={formData.BankName}
            readOnly={true}
          />
          <div className="absolute top-12 right-2">
            {formData.BankName !== "" && (
              <p className="w-full flex justify-end pr-1 ">
                <FaCheckCircle className="transform  text-green-500" />
              </p>
            )}
          </div>
        </div>
        {/* ----- */}
        <div className="xl:w-[49%]  w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Branch
          </label>
          <input
            type="text"
            placeholder="Branch"
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="Branch"
            style={dynamicStylesInput}
            value={formData.Branch}
            readOnly={true}
          />
          <div className="absolute top-12 right-2">
            {formData.Branch !== "" && (
              <p className="w-full flex justify-end pr-1 ">
                <FaCheckCircle className="transform  text-green-500" />
              </p>
            )}
          </div>
        </div>

        <div className="xl:w-[49%]  w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Address
          </label>
          <input
            type="text"
            placeholder="Address"
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="Address"
            style={dynamicStylesInput}
            value={formData.Address}
            readOnly={true}
          />
          <div className="absolute top-12 right-2">
            {formData.Address !== "" && (
              <p className="w-full flex justify-end pr-1 ">
                <FaCheckCircle className="transform  text-green-500" />
              </p>
            )}
          </div>
        </div>
        {/* ------- */}
        <div className="xl:w-[49%]  w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Account Number
          </label>
          <input
            type="number"
            placeholder=" A/c Number"
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="AccNo"
            style={dynamicStylesInput}
            value={formData.AccNo}
            onChange={handleOnchange}
          />
          <div className="absolute top-12 right-2">
            {formData.AccNo !== "" && (
              <p className="w-full flex justify-end pr-1 ">
                <FaCheckCircle className="transform  text-green-500" />
              </p>
            )}
          </div>
          {errors.AccNo && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.AccNo}
            </p>
          )}
        </div>
        {/* --- */}
        <div className="xl:w-[49%]  w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Account Holder Name
          </label>
          <input
            type="text"
            placeholder="A/c Holder Name"
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="accholder"
            style={dynamicStylesInput}
            value={formData.accholder}
            onChange={handleOnchange}
          />
          <div className="absolute top-12 right-2">
            {formData.accholder !== "" && (
              <p className="w-full flex justify-end pr-1 ">
                <FaCheckCircle className="transform  text-green-500" />
              </p>
            )}
          </div>
          {errors.accholder && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.accholder}
            </p>
          )}
        </div>
        {/* ------ */}

        <div className="xl:w-[49%]  w-full relative">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Pan Number
          </label>
          <input
            type="text"
            placeholder="Enter Pan Number"
            className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 mt-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
            name="panno"
            value={formData.panno}
            style={dynamicStylesInput}
            onChange={handleOnchange}
          />
          <div className="absolute top-12 right-2">
            {formData.panno !== "" && (
              <p className="w-full flex justify-end pr-1 ">
                <FaCheckCircle className="transform  text-green-500" />
              </p>
            )}
          </div>
          {errors.panno && (
            <p
              className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
              style={{ color: dynamicStyles.background }}
            >
              {errors.panno}
            </p>
          )}
        </div>
        {/* -------- */}
        <div className="xl:w-[49%]  w-full">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            Transaction Password
          </label>
          <div className="relative mt-2">
            <input
              type={isPasswordVisible ? "text" : "password"}
              placeholder="Transaction Password"
              className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
              value={formData.TrsPassword}
              name="TrsPassword"
              style={dynamicStylesInput}
              onChange={handleOnchange}
            />
            <div className="absolute -bottom-5 right-0">
              {formData.TrsPassword !== "" && (
                <p className="w-full flex justify-end pr-1 ">
                  <FaCheckCircle className="transform  text-green-500" />
                </p>
              )}
            </div>
            <button
              type="button"
              className="absolute right-3 top-0 bottom-0 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <Eye /> : <EyeOffIcon />}
            </button>
            {errors.TrsPassword && (
              <p
                className="text-red-500 text-[14px] mt-1 text-end absolute  w-full"
                style={{ color: dynamicStyles.background }}
              >
                {errors.TrsPassword}
              </p>
            )}
          </div>
        </div>
        {/* ---------------- */}
        <div className="xl:w-[49%]  w-full">
          <label
            className="text-sm text-gray-800 font-medium"
            style={{ color: Theme.textcolor }}
          >
            One Time Password
          </label>
          <div className="relative mt-2">
            <input
              type="email"
              placeholder="Enter One Time Password"
              className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
              value={formData.otp}
              name="otp"
              style={dynamicStylesInput}
              onChange={handleOnchange}
            />
            <div className="absolute -bottom-5 right-0">
              {formData.otp !== "" && (
                <p className="w-full flex justify-end pr-1 ">
                  <FaCheckCircle className="transform  text-green-500" />
                </p>
              )}
            </div>
            {isLoader1 ? (
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
        {/* ---------------- */}
      </div>
      <div className="mt-8">
        <div className="pt-3">
          {isLoader ? (
            <button
              className="px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
              style={dynamicStyles}
            >
              <Loader />
            </button>
          ) : (
            <button
              button
              className="px-5 lg:w-1/5 w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
              onClick={handleSubmit}
              style={dynamicStyles}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BankKYCForm;
