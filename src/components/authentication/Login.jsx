import { Eye, EyeOffIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { setAuthRedirect, setloginuserID } from "../../Redux/DoWinSlice";
import { useDispatch } from "react-redux";
import LoaderTwo from "../loader/LoaderTwo";
import { toastmsg } from "../dashboard/GlobalApi/Global";
import logo  from '../../assets/logo/dowin.png'

const Login = () => {
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [isLoader, setisLoader] = useState(false);
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  //------------
  const CallFun = async (e) => {
    setisLoader(true);
    const apiData = {
      userid: formData.username,
      user_password: formData.password,
    };
    try {
      const response = await axios.post(`${BaseURI}/user/login`, apiData);
      if (response.status === 200) {
        setisLoader(false);
        dispatch(
          setloginuserID({
            userID: response?.data?.message[0],
            userEmail: response?.data?.message[1],
            userPassword: formData.password,
          })
        );
        dispatch(setAuthRedirect(true));
        toast.success("OTP send successfully");
        setTimeout(() => {
          navigation("/otp");
        }, 1000);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toast.error(
        `${
          error.response?.data.error ||
          error.response?.data.message ||
          error.message
        }`
      );
      setisLoader(false);
    }
  };

  //------------------------------------
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const areAllFieldsFilled = (data) => {
    return Object.values(data).every((value) => value !== "");
  };
  const [validationStatus, setValidationStatus] = useState({});
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
    const passwordRegex = /.{4,}$/;
    setValidationStatus((prevStatus) => ({
      ...prevStatus,
      [field]: value === "" ? "" : "loading",
    }));
    switch (field) {
      case "username":
        if (value === "") error = "";
        else if (!value.trim()) error = "Required username*";
        break;

      case "password":
        if (value === "") error = "";
        else if (!passwordRegex.test(value)) error = "Password is too weak*";
        break;
      default:
        break;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
    // Update validation status based on the error
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
  //----------------------------------
  useEffect(() => {
    dispatch(setAuthRedirect(true));
  }, []);
  return (
    <div className="bg-[#F3F3F3] py-20 ">
      <div className="container max-w-6xl m-auto ">
        {/* Right Panel */}
        <div className="lg:m-0 m-4">
          <div className="lg:w-[40%] p-4 bg-white  rounded-3xl m-auto">
            <div className="mx-auto flex w-full flex-col  justify-center space-y-6 sm:w-[90%] mt-5">
              <div className="">
                <img
                  src={logo}
                  className="m-auto w-32"
                  alt=""
                />
              </div>
              <div className="space-y-2 text-center">
                <h1 className="text-4xl font-semibold tracking-tight text-gray-900">
                  Welcome Back :)
                </h1>
                <p className="text-sm text-gray-500">
                  Please Enter your details
                </p>
              </div>

              <div className="space-y-4">
                <div className="mb-4  relative">
                  <input
                    type="text"
                    placeholder="Enter user Id"
                    className="w-full rounded-lg border h-[45px] border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-[#4d33f8] focus:outline-none focus:ring-0 focus:ring-black"
                    name="username"
                    onChange={handleOnchange}
                  />
                  <div className="absolute top-2 right-2">
                    {errors.username &&
                      validationStatus.username === "error" && (
                        <p className="text-red-500 text-[14px] mt-1 text-end">
                          {errors.username}
                        </p>
                      )}
                  </div>
                </div>
                <div className="lg:mb-8 mb-9 relative">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
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
                    {isPasswordVisible ? <Eye /> : <EyeOffIcon />}
                  </button>
                  <div className="absolute top-11 right-1">
                    {errors.password &&
                      validationStatus.password === "error" && (
                        <p className="text-red-500 text-[14px] mt-1 text-end">
                          {errors.password}
                        </p>
                      )}
                  </div>
                </div>
                <div className="mb-4 text-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#4d33f8]"
                  >
                    Forgot Password
                  </Link>
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
                      Login Now
                    </button>
                  )}
                </div>
              </div>

              <div className="pb-8">
                <div className="text-center text-sm text-gray-500">
                  Don't have an account? Create Account
                  <Link
                    to="/registration"
                    className="font-medium text-[#541AFF] underline hover:text-black"
                  >
                    Create Account
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

export default Login;
