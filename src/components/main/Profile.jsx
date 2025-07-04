import { ChevronRight, LucideLayoutDashboard } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProfileChangeProfilePassword from "../dashboard/profiles/ProfileChangeProfilePassword";
import { useDispatch, useSelector } from "react-redux";
import { FaRegCopy } from "react-icons/fa";
import {
  getDynamicStyles,
  getdynamicStylesInput,
  toastmsg,
} from "../dashboard/GlobalApi/Global";
import img1 from "../../assets/cover images/img1.jpeg";
import img2 from "../../assets/cover images/img2.jpeg";
import img3 from "../../assets/cover images/img3.jpeg";
import img4 from "../../assets/cover images/img4.jpeg";
import img5 from "../../assets/cover images/img5.jpeg";
import img6 from "../../assets/cover images/img6.jpeg";
import img7 from "../../assets/cover images/img7.jpeg";
import img8 from "../../assets/cover images/img8.jpeg";
import img9 from "../../assets/cover images/img9.webp";
import img10 from "../../assets/cover images/img10.jpg";
import img11 from "../../assets/cover images/img11.jpeg";
import img12 from "../../assets/cover images/img12.jpeg";
import img13 from "../../assets/cover images/img13.jpg";
import { BiSolidEdit } from "react-icons/bi";
import { IoCloseSharp } from "react-icons/io5";
import { setcoverImage } from "../../Redux/DoWinSlice";
import profile from "../../assets/images/defaultProfile.png";

const Profile = () => {
  const coverImgArr = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
    img13,
  ];
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const coverImg = useSelector((state) => state.doWin.coverImage);
  const defaultcoverimg = coverImg ? coverImg : img1;
  const IMGURI = process.env.REACT_APP_IMG_URI;
  const img = ApiAllData?.data?.selfie || "";
  const userProImage = img.startsWith("/uploads") ? `${IMGURI}${img}` : profile;
  const dispatch = useDispatch();
  const countries = useSelector((state) => state.doWin.countries);
  const [filteredCountry, setFilteredCountry] = useState("");
  const filterCountryByCode = (code) => {
    const country = countries.find((country) => country?.code === code);
    setFilteredCountry(country ? country?.name : "Country not found");
  };
  useEffect(() => {
    filterCountryByCode(ApiAllData?.data?.country_code);
  }, [ApiAllData]);

  const handleCopy = (item) => {
    navigator.clipboard.writeText(item).then(() => {
      toastmsg("1", "Copied!");
    });
  };
  const [isOpenCover, setIsOpenCover] = useState(false);
  const toggleCover = () => {
    setIsOpenCover((prevState) => !prevState);
  };

  const handelset = (e) => {
    dispatch(setcoverImage(e));
  };

  const Theme = useSelector((state) => state.doWin.Theme);
  const PageTheme = useSelector((state) => state.doWin.PageTheme);

  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme]);
  const dynamicStylesInput = useMemo(() => {
    return getdynamicStylesInput(Theme);
  }, [Theme]);

  return (
    <div className="overflow-hidden">
      <div className="max-h-screen overflow-x-auto py-5 lg:px-10 px-3">
        <div className="">
          <nav
            class="flex bg-white rounded-xl p-4 border border-violet-50"
            aria-label="Breadcrumb"
            style={dynamicStyles}
          >
            <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li class="inline-flex items-center">
                <Link
                  to="/"
                  class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-[#4d33f8]  "
                >
                  <LucideLayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <Link
                    to="/profile"
                    class="ms-1 text-sm font-medium text-gray-700 hover:text-[#4d33f8] md:ms-2  "
                  >
                    Setting
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div class="flex items-center">
                  <ChevronRight className="w-4 h-4" />
                  <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                    Profile
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="mt-5">
          <div
            className="bg-white rounded-2xl p-2 shadow-md shadow-indigo-50"
            style={dynamicStyles}
          >
            <div className="relative">
              <img
                src={defaultcoverimg}
                className="rounded-2xl h-80 w-full object-cover"
                alt=""
              />
              <button
                className="absolute right-3 bottom-2  z-10  p-[.35rem] rounded-full bg-[#4d33f8] text-[#fff]"
                onClick={toggleCover}
                style={{
                  background: PageTheme.background,
                  color: PageTheme.textcolor,
                }}
              >
                {isOpenCover ? (
                  <IoCloseSharp className="text-[1.3rem]" />
                ) : (
                  <BiSolidEdit className="text-[1.3rem] " />
                )}
              </button>

              {/* --------------- */}
              {isOpenCover && (
                <div
                  className="absolute  h-[19.5rem] xl:w-[10%] md:w-[20%] w-[40%] flex flex-wrap bg-[#fff] object-cover right-0 bottom-1 "
                  style={dynamicStylesInput}
                >
                  <div className="overflow-auto h-72">
                    {coverImgArr.map((e) => {
                      return (
                        <>
                          <div className="w-full p-2 flex flex-wrap  justify-center items-center overflow-hidden ">
                            <img
                              src={e}
                              alt=""
                              onClick={() => handelset(e)}
                              className="w-full object-fill xl:rounded-lg"
                            />
                          </div>
                        </>
                      );
                    })}
                  </div>
                </div>
              )}
              {/* -------------- */}
            </div>
            <div className="self-center text-center -mt-10 relative z-[1]">
              <div className="flex justify-center items-center relative">
                <img
                
                  src={userProImage}
                  className="rounded-full w-28 h-28 m-auto"
                  alt=""
                />
              </div>
              <div className="pb-5">
                <h6
                  className="text-[#4d33f8]"
                  style={{ color: Theme.textcolor }}
                >
                  {filteredCountry || "default-country"}
                </h6>
                <h6
                  className="text-gray-900  items-center relative group"
                  style={{ color: Theme.textcolor }}
                >
                  <span className="text-[#4d33f8] text-sm">
                    {ApiAllData?.data?.userid || "default-user"}
                  </span>
                  <button
                    onClick={() => handleCopy(ApiAllData?.data?.userid)}
                    className="ml-3 text-[#4d33f8] hover:text-[#281c77] "
                  >
                    <FaRegCopy className="text-sm " />
                  </button>
                </h6>
                <h6
                  className="text-gray-900"
                  style={{ color: Theme.textcolor }}
                >
                  {ApiAllData?.data?.user_email || "default@gmail.com"}
                </h6>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-2xl lg:p-10 p-4 shadow-md shadow-indigo-50 mt-10 mb-12"
            style={dynamicStyles}
          >
            <ProfileChangeProfilePassword />
          </div>
        </div>
        <div className=" py-16">
          <h6
            className="text-sm text-center text-gray-600"
            style={{ color: Theme.textcolor }}
          >
            Copyright © Designed & Developed by Autasis 2025
          </h6>
        </div>
      </div>
    </div>
  );
};

export default Profile;
