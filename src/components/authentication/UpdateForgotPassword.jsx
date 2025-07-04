import { Eye, EyeOffIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import LoaderTwo from "../loader/LoaderTwo";
import logo from "../../assets/logo/dowin.png";
import { toastmsg } from "../dashboard/GlobalApi/Global";

const UpdateForgotPassword = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const userData = location.state?.userData;
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const [isLoader, setisLoader] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const [isConPassword, setisConPassword] = useState(false);
  const [validationStatus, setValidationStatus] = useState({});
  const togglePasswordVisibility = () => {
    setisPassword(!isPassword);
  };
  const toggleConPasswordVisibility = () => {
    setisConPassword(!isConPassword);
  };
  const [formData, setFormData] = useState({
    otp: "",
    password: "",
    confirmpassword: "",
  });
  const [errors, setErrors] = useState({
    otp: "",
    password: "",
    confirmpassword: "",
  });
  //------Update Password API ------------------
  const updatePassword = async () => {
    setisLoader(true);
    const apiData = {
      password: formData?.password,
      otp: formData?.otp,
      userid: userData?.userid,
    };
  
    try {
      const response = await axios.post(
        `${BaseURI}/user/updateForgetPassword`,
        apiData
      );
      toast.success(response?.data?.message);
      if (response.status === 200) {
        setisLoader(false);
        setTimeout(() => {
          // navigation("/login");
          navigation("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during API call:", error.response?.data);
      toast.error(`${error.response?.data.error}`);
      setisLoader(false);
    }
  };
  //-----------------------------------------
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
  //------------------
  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((value) => value !== "");
  };
  //--------------------
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
    if (allFieldsFilled === true) {
      updatePassword();
    }
  };
  //-------------------------
  const validateField = async (field, value) => {
    let error = "";
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      // [field]: value === "" ? "" : "loading",
      [field]: value === "" ? "" : "loading",
    }));
    switch (field) {
      case "password":
        if (value === "") error = "";
        else if (!passwordRegex.test(value)) error = "Password is too weak*";
        break;
      case "confirmpassword":
        if (value === "") error = "";
        else if (formData.password !== value) error = "Passwords do not match*";
        break;
      case "otp":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required OTP code*";
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

  return (
    <div className="bg-[#F3F3F3] py-20 ">
      <div className="container max-w-6xl m-auto ">
        {/* Right Panel */}
        <div className="lg:m-0 m-4">
          <div className="lg:w-[40%] p-4 bg-white  rounded-3xl m-auto">
            <div className="mx-auto flex w-full flex-col  justify-center space-y-6 sm:w-[90%] mt-5">
              <div className="">
                <img src={logo} className="m-auto w-32" alt="" />
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Update Password
                </h1>
                <p className="text-sm text-gray-500">
                  Enter below details to update your account password
                </p>
              </div>
              <div className="relative">
                <input
                  type="number"
                  placeholder="Enter OTP"
                  className="w-full rounded-lg border h-[45px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                  name="otp"
                  onChange={handleOnchange}
                />
                <div className="absolute top-2 right-2">
                  {/* {validationStatus.otp === "success" && (
                <p className="mt-2 w-full flex justify-end pr-1 bg-white">
                  <FaCheckCircle className="transform  text-green-500" />
                </p>
              )} */}
                  {errors.otp && validationStatus.otp === "error" && (
                    <p className="text-red-500 text-[14px] mt-1 text-end">
                      {errors.otp}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-7">
                <div className="mb-4 relative">
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
                    {/* {validationStatus.password === "success" && (
                      <p className=" mt-2 w-full flex justify-end pr-1">
                        <FaCheckCircle className="transform  text-green-500" />
                      </p>
                    )} */}
                    {errors.password &&
                      validationStatus.password === "error" && (
                        <p className="text-red-500 text-[14px] mt-1 text-end">
                          {errors.password}
                        </p>
                      )}
                  </div>
                </div>
                <div className="mb-4 relative">
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
                    {/* {validationStatus.confirmpassword === "success" && (
                      <p className=" mt-2 w-full flex justify-end pr-1">
                        <FaCheckCircle className="transform  text-green-500" />
                      </p>
                    )} */}
                    {errors.confirmpassword &&
                      validationStatus.confirmpassword === "error" && (
                        <p className="text-red-500 text-[14px] mt-1 text-end">
                          {errors.confirmpassword}
                        </p>
                      )}
                  </div>
                </div>

                <div className="py-3">
                  {isLoader ? (
                    <button className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2 flex justify-center items-center">
                      <LoaderTwo />
                    </button>
                  ) : (
                    <button
                      className="w-full rounded-lg h-[45px] bg-[#4d33f8] py-2 text-sm font-semibold text-white hover:bg-[#4d33f8]/90 focus:outline-none focus:ring-2 focus:ring-[#4d33f8] focus:ring-offset-2"
                      onClick={handleSubmit}
                    >
                      Update Password
                    </button>
                  )}
                </div>
              </div>

              <div className="pb-6">
                <div className="text-center text-sm text-gray-500">
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

export default UpdateForgotPassword;
