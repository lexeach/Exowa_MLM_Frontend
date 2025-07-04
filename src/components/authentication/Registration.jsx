import { Eye, EyeOffIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setuserrefferalCode } from "../../Redux/DoWinSlice";
import LoaderTwo from "../loader/LoaderTwo";
import { toastmsg } from "../dashboard/GlobalApi/Global";

const Registration = () => {
  const countries = useSelector((state) => state.doWin.countries);
  const [selectedCountryCode, setSelectedCountryCode] = useState(countries[0]);
  //--------------------------------------------------
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const referral = params.get("referral");
  const coreferral=params.get("coreferral")

  const [isLoader, setisLoader] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const [isConPassword, setisConPassword] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phoneNum: "",
    password: "",
    confirmpassword: "",
    referralCode: referral ? referral : "",
    coreferralCode:coreferral?coreferral: "",
    country_code: "",
  });

  // console.log("formData", formData);
  const [errors, setErrors] = useState({
    fullname: "",
    email: "",
    phoneNum: "",
    password: "",
    confirmpassword: "",
    referralCode: "",
    coreferralCode: "",
  });

  // Visibal Password------
  const togglePasswordVisibility = () => {
    setisPassword(!isPassword);
  };

  // Visibal Confrim Password------
  const toggleConPasswordVisibility = () => {
    setisConPassword(!isConPassword);
  };
  //-----------------
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      country_code: selectedCountryCode.code,
    }));
  }, [selectedCountryCode]);
  //-----------
  const CallFun = async (e) => {
    setisLoader(true);
    const apiData = {
      fullname: formData.fullname,
      email: formData.email,
      password: formData.password,
      referrerID: formData.referralCode,
      country_code: formData.country_code,
      phoneno: formData.phoneNum,
      coreferrerID: formData.coreferralCode,
    };

    // console.log("apiData-----", apiData);
    try {
      const response = await axios.post(`${BaseURI}/user/register`, apiData);
      dispatch(setuserrefferalCode(response.data.data));
      // console.log("response",response)
      toast.success(`${response.data.message}`);
      if (response.status === 200) {
        setisLoader(false);
        navigation("/");
      }
    } catch (error) {
      console.error("Error during API call:", error.response);
      toast.error(`${error.response?.data.error || error.message}`);
      setisLoader(false);
    }
  };
  //  For Validation--------------------
  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((value) => value.trim() !== "");
  };
  const handleSubmit = async () => {
    const allFieldsFilled = areAllFieldsFilled(formData);
    if (!allFieldsFilled) {
      toastmsg("0", "Please fill all required fields!");
      return;
    }
    const validationErrors = await Promise.all(
      Object.keys(formData).map((field) =>
        validateField(field, formData[field])
      )
    );
    if (validationErrors.some((error) => error !== "")) {
      toastmsg("0", "Please correct errors before submitting!");
      return;
    }
    CallFun();
  };

  const validateField = async (field, value) => {
    let error = "";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const phoneRegex = /^\d{7,}$/;
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [field]: value === "" ? "" : "loading",
    }));
    switch (field) {
      case "fullname":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required fullname*";
        break;
      case "email":
        if (value === "") error = "";
        else if (!emailRegex.test(value)) error = "Invalid email format*";
        break;
      case "phoneNum":
        if (value === "") error = "";
        else if (!phoneRegex.test(value)) error = "Required  seven number*";
        break;
      case "password":
        if (value === "") error = "";
        else if (!passwordRegex.test(value)) error = "Password is too weak*";
        break;
      case "confirmpassword":
        if (value === "") error = "";
        else if (formData.password !== value) error = "Passwords do not match*";
        break;
      case "referralCode":
        if (value === "") {
          error = "";
        } else if (!value.trim()) {
          error = "Required referral code*";
        } else if (value.trim().length < 6) {
          error = "Min 6 characters*";
        }
        break;

      case "coreferralCode":
        if (value === "") {
          error = "";
        } else if (!value.trim()) {
          error = "Required co-referral code*";
        } else if (value.trim().length < 6) {
          error = "Min 6 characters*";
        }
        break;

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
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
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
  const [refUsername, setrefUsername] = useState("");
  const [corefUsername, setcorefUsername] = useState("");
  const fetchReferralData = async (code, endpoint) => {
    if (!code || code.length < 6) {
      if (endpoint === "user/fetchreferral") {
        setrefUsername("");
      } else if (endpoint === "user/fetchCoreferral") {
        setcorefUsername("");
      }
      console.log(`${endpoint} code is incomplete or invalid.`);
      return;
    }

    const apiData =
      endpoint === "user/fetchreferral" ? { referral: code } : { coreferral: code };

    try {
      const response = await axios.post(`${BaseURI}/${endpoint}`, apiData);
      if (endpoint === "user/fetchreferral") {
        setrefUsername(response?.data?.data);
      } else if (endpoint === "user/fetchCoreferral") {
        setcorefUsername(response?.data?.data);
      }
    } catch (error) {
      console.log("errro",error)
      if (endpoint === "user/fetchreferral") {
        setrefUsername("");
      } else if (endpoint === "user/fetchCoreferral") {
        setcorefUsername("");
      }
      console.error("Error during API call:", error);
    }
  };

  useEffect(() => {
    fetchReferralData(formData.referralCode, "user/fetchreferral");
    fetchReferralData(formData.coreferralCode, "user/fetchCoreferral");
  }, [formData.referralCode, formData.coreferralCode]);

  return (
    <div className="bg-[#F3F3F3] py-20 ">
      <div className="container max-w-6xl m-auto ">
        <div className="shadow-lg border rounded-3xl overflow-hidden  lg:m-0 m-4">
          <div className="grid lg:grid-cols-2 overflow-hidden ">
            {/* Left Panel */}
            <div className="loginBg relative hidde"></div>
            {/* Right Panel */}
            <div className="p-3 bg-white ">
              <div className="mx-auto flex w-full flex-col  justify-center space-y-6 sm:w-[90%]">
                <div className="space-y-2 text-start pt-5">
                  <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                    Create an account
                  </h1>
                  <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link to="/" className="text-[#541AFF]">
                      Log in
                    </Link>
                  </p>
                </div>

                <div className="lg:space-y-4 space-y-8 pb-4">
                  <div className="lg:flex items-center gap-3 ">
                    <div className="lg:w-1/2">
                      <div className="lg:mb-4 mb-9 relative ">
                        <input
                          type="text"
                          placeholder="Full Name"
                          name="fullname"
                          className="w-full rounded-lg border h-[45px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                          onChange={handleOnchange}
                        />

                        <div className="absolute top-11 right-0">
                          {errors.fullname &&
                            validationStatus.fullname === "error" && (
                              <p className="text-red-500 text-[14px] mt-1 text-end ">
                                {errors.fullname}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <div className="lg:mb-4 mb-9 relative">
                        <input
                          type="email"
                          placeholder="Email"
                          className="w-full rounded-lg border h-[45px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                          name="email"
                          onChange={handleOnchange}
                        />{" "}
                        <div className="absolute top-11 right-0">
                          {errors.email &&
                            validationStatus.email === "error" && (
                              <p className="text-red-500 text-[14px] mt-1 text-end">
                                {errors.email}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:flex items-center gap-3">
                    <div className="lg:w-1/2">
                      <div className="lg:mb-4 mb-9 relative">
                        <input
                          type={isPassword ? "text" : "password"}
                          placeholder="Enter Password"
                          className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                          name="password"
                          onChange={handleOnchange}
                        />
                        <button
                          type="button"
                          className="absolute top-3 right-2"
                          onClick={togglePasswordVisibility}
                        >
                          {isPassword ? <Eye /> : <EyeOffIcon />}
                        </button>
                        <div className="absolute top-11 right-0">
                          {errors.password &&
                            validationStatus.password === "error" && (
                              <p className="text-red-500 text-[14px] mt-1 text-end">
                                {errors.password}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <div className="lg:mb-4 mb-9 relative">
                        <input
                          type={isConPassword ? "text" : "password"}
                          placeholder="Confirm Password"
                          className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                          name="confirmpassword"
                          onChange={handleOnchange}
                        />
                        <button
                          type="button"
                          className="absolute top-3 right-2"
                          onClick={toggleConPasswordVisibility}
                        >
                          {isConPassword ? <Eye /> : <EyeOffIcon />}
                        </button>

                        <div className="absolute top-11 right-0">
                          {errors.confirmpassword &&
                            validationStatus.confirmpassword === "error" && (
                              <p className="text-red-500 text-[14px] mt-1 text-end">
                                {errors.confirmpassword}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:flex items-center gap-3">
                    <div className="lg:w-1/2">
                      <div className="lg:mb-4 mb-9 flex items-center w-full relative">
                        <select
                          className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 bg-white placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                          name="country_code"
                          onChange={handleOnchange}
                        >
                          {countries.map((item) => (
                            <option
                              key={item.code}
                              value={item.code}
                              className="flex gap-2"
                            >
                              <span>{item.code}</span>
                              <span> {item.name}</span>
                            </option>
                          ))}
                        </select>

                        <div className="absolute top-11 right-0">
                          {errors.country_code && (
                            <p className="text-red-500 text-[14px] mt-1 text-end absolute  w-full">
                              {errors.country_code}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="lg:w-1/2">
                      <div className="lg:mb-4 mb-9flex items-center w-full relative">
                        <input
                          type="number"
                          placeholder="Phone Number"
                          className="w-full rounded-lg border h-[48px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                          name="phoneNum"
                          onChange={handleOnchange}
                        />

                        <div className="absolute top-11 right-0">
                          {errors.phoneNum &&
                            validationStatus.phoneNum === "error" && (
                              <p className="text-red-500 text-[14px] mt-1 text-end">
                                {errors.phoneNum}
                              </p>
                            )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:space-y-4 space-y-8 pb-4">
                    <div className="lg:flex items-center gap-3 ">
                      <div className="lg:w-1/2">
                        <div className="lg:mb-4 mb-9 relative">
                          <input
                            type="text"
                            placeholder="Referral Code"
                            className="w-full rounded-lg border h-[45px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                            name="referralCode"
                            onChange={handleOnchange}
                            value={formData?.referralCode}
                          />
                          <p className="absolute top-12 left-1  text-[#031b5a] text-sm  w-full">
                            {refUsername}
                          </p>

                          <div className="absolute top-11 right-0 flex gap-1 items-center ">
                            {errors.referralCode &&
                              validationStatus.referralCode === "error" && (
                                <p className="text-red-500 text-[14px] mt-1 text-end">
                                  {errors.referralCode}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="lg:w-1/2">
                        <div className="lg:mb-4 mb-9 relative">
                          <input
                            type="text"
                            placeholder="Co-Referral Code"
                            className="w-full rounded-lg border h-[45px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                            name="coreferralCode"
                            onChange={handleOnchange}
                            value={formData?.coreferralCode}
                          />
                          <p className="absolute top-12 left-1  text-[#031b5a] text-sm  w-full">
                            {corefUsername}
                          </p>

                          <div className="absolute top-11 right-0 flex gap-1 items-center ">
                            {errors.coreferralCode &&
                              validationStatus.coreferralCode === "error" && (
                                <p className="text-red-500 text-[14px] mt-1 text-end">
                                  {errors.coreferralCode}
                                </p>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3">
                    {isLoader ? (
                      <button className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2 flex justify-center items-center">
                        <LoaderTwo />
                      </button>
                    ) : (
                      <button
                        className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2"
                        onClick={handleSubmit}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleSubmit();
                          }
                        }}
                      >
                        Create Account
                      </button>
                    )}
                  </div>
                </div>

                <div className="text-center text-sm text-gray-500 pb-4">
                  By clicking continue, you agree to our{" "}
                  <Link
                    to="/terms-and-conditions"
                    className="font-medium text-gray-900 underline hover:text-black"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    to="/privacy-policy"
                    className="font-medium text-gray-900 underline hover:text-black"
                  >
                    Privacy Policy
                  </Link>
                  .
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
