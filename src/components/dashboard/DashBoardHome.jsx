import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authenticateApi,
  formatMaskedText,
  handleCopy,
  incomeToFixedFun,
  toastmsg,
} from "./GlobalApi/Global";
import { LucideLayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomAboutmeDashHome from "../custome/CustomAboutmeDashHome";
import profile from "../../assets/images/defaultProfile.png";
import ButtonLoader from "../loader/ButtonLoader";
import axios from "axios";

const DashBoardHome = () => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const IMGURI = process.env.REACT_APP_IMG_URI;
  const navigate = useNavigate();
  const authData = useSelector((state) => state.doWin.ApiAllData);
  const logindata = useSelector((state) => state.doWin.userLoginData);
  const usertoken = logindata?.token;
  const userid = logindata?.user?.userid || "";
  const userActiveLevel = authData?.data?.mergedUserLevels[0]?.is_active || 0;
  const mergedPartnerLevels =
    authData?.data?.mergedPartnerLevels[0]?.is_active || 0;
  const isPartner = authData?.data?.is_partner || 0;
  const isqualified = authData?.data?.is_qualified;

  const is_topapproved = authData?.data?.is_top_approved || 0;

  const showData = authData?.data || {};
  // console.log("showData",showData)
  const fullURL = window.location.href;
  const paramValue = showData?.userid || "";
  const coreferralparamValue = showData?.coreferrer_code || "";
  const paramKey = "referral";
  const coreferralparamKey = "coreferral";
  const referralLink = `${fullURL}/registration?${paramKey}=${paramValue}&${coreferralparamKey}=${coreferralparamValue}`;

  const totalIncome = incomeToFixedFun(showData?.income);
  const totalWithdrawal = incomeToFixedFun(showData?.total_withdrawal);
  const partner_income = incomeToFixedFun(showData?.partner_income);

  const rewardincome = incomeToFixedFun(showData?.sponser_income);

  const referreluser = showData?.referred_users;
  const coreferredusers = showData?.coreferred_users;

  const img = authData?.data?.selfie || "";
  const userProImage = img.startsWith("/uploads") ? `${IMGURI}${img}` : profile;
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const dispatch = useDispatch();
  const [loader1, setloader1] = useState(false);
  const BaseURI = process.env.REACT_APP_API_BASE_URI;

  // const Is_Top_Approved = authData?.data?.is_top_approved === 2;
  // const is_examPassed = authData?.data?.is_examPassed === 0;
  const isPartnerShow = authData?.data?.is_partner === 1 ?? 0;

  const becomepartner = async () => {
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };

      const response = await axios.post(
        `${BaseURI}/user/become-partner  `,
        { userid: userid },
        config
      );
      if (response.status === 200) {
        authenticateApi(usertoken, dispatch);
        toastmsg("1", response?.data?.message || "Unknow");
        setloader1(false);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error
      );
      setloader1(false);
    }
  };
  useEffect(() => {
    if (userActiveLevel === 0) {
      authenticateApi(usertoken, dispatch, navigate);
    }
  }, []);

  return (
    <div className="overflow-hidden relative">
      <div className="max-h-screen overflow-x-auto py-5 lg:px-10 px-3">
        <div className=" ">
          <nav
            class="flex bg-white rounded-xl p-4 border border-violet-50"
            aria-label="Breadcrumb"
            style={{
              color: Theme.textcolor,
              background: Theme.background,
              borderColor: Theme.bordercolor,
            }}
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
            </ol>
          </nav>
        </div>

        {isqualified === 2 && (
          <div className="w-full py-4 px-4 mt-5 bg-red-200 rounded-xl  border text-black flex flex-wrap md:justify-between justify-start  items-center">
            <div>
              <div>
                <p className="mb-2">
                  ❌ Your exam has been rejected. Please contact support for
                  more information.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* BECOME PARTNERS */}

        {isqualified === 1 &&
          is_topapproved !== 0 &&
          mergedPartnerLevels === 1 &&
          isPartner === 0 && (
            <div
              className="w-full py-4 px-4 mt-5 bg-white rounded-xl  border border-violet-50 flex flex-wrap md:justify-between justify-start  items-center"
              style={{
                color: Theme.textcolor,
                background: Theme.background,
                borderColor: Theme.bordercolor,
              }}
            >
              <div>
                <div>
                  <p className="mb-2">
                    🤝 Want to become our partner and take the next big step?
                    {/* Let’s make it happen! */}
                    <span className="underline pl-1 font-bold">
                      pay partner fee!
                    </span>
                  </p>
                </div>
              </div>
              <div>
                {loader1 ? (
                  <button className="px-2 py-[6px] bg-[#4d33f8] text-white  hover:font-bold rounded-md  ease-in duration-[0.4s] hover:scale-[0.9]">
                    <ButtonLoader />
                  </button>
                ) : (
                  <button
                    className="px-2 py-[6px] bg-[#4d33f8] text-white  hover:font-bold rounded-md  ease-in duration-[0.4s] hover:scale-[0.9]"
                    onClick={becomepartner}
                  >
                    Continue
                  </button>
                )}
              </div>
            </div>
          )}

        <div className="mt-3">
          <div
            className="bg-white rounded-2xl border border-violet-50 lg:p-10 p-4  mt-10  w-full flex flex-wrap gap-5 justify-between items-center"
            style={{
              color: Theme.textcolor,
              background: Theme.background,
              borderColor: Theme.bordercolor,
            }}
          >
            <div>
              <p className="text-[.8rem] font-bold">REFERRAL CODE</p>
              <p className="text-[1.3rem]">#{showData?.userid || ""}</p>
            </div>
            <div>
              <p className="text-[.8rem] font-bold">Name</p>
              <p className="text-[1rem]">{showData?.user_name || ""}</p>
            </div>
            <div className="flex items-center ">
              <p
                className="pl-2 pr-3 py-[6px] border-[#4d33f8] border-l-2 border-b-2 border-t-2   rounded-l-lg"
                style={{
                  borderColor: PageTheme.background,
                }}
              >
                {formatMaskedText(referralLink)}
              </p>
              <button
                className="bg-[#4d33f8] text-white px-2 py-2  rounded-r-lg"
                style={{
                  background: PageTheme.background,
                }}
                onClick={() => handleCopy(referralLink)}
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <div
            className="bg-white rounded-2xl border lg:p-10 p-4  w-full lg:flex  flex-wrap gap-3 justify-between items-center"
            style={{
              color: Theme.textcolor,
              background: Theme.background,
              borderColor: Theme.bordercolor,
            }}
          >
            <div className="flex flex-col justify-center items-center">
              <img
                src={userProImage}
                alt=""
                className="w-[60px] h-[60px] rounded-full"
              />
              <p className="text-[1rem]">{showData?.user_name || ""}</p>
              <p className="text-[1.3rem] flex justify-center gap-1 items-center">
                Active
                <p className="w-[13px] h-[13px] rounded-full bg-green-400"></p>
              </p>
            </div>
            <div className="bg-[#EFEEFF] text-black px-4 py-2 rounded-lg border ">
              <p className="text-[.8rem] font-bold"> My Sponsors</p>
              <p className="text-[1.3rem]">{referreluser}</p>
            </div>
            {isPartnerShow && (
              <>
                <div className="bg-[#EFEEFF] text-black px-4 py-2 rounded-lg border lg:mt-0 mt-4">
                  <p className="text-[.8rem] font-bold"> My Partners</p>
                  <p className="text-[1.3rem]">{coreferredusers}</p>
                </div>
                <div className="bg-[#EFEEFF] text-black px-4 py-2 rounded-lg border lg:mt-0 mt-4">
                  <p className="text-[.8rem] font-bold">Partner Income</p>
                  <p className="text-[1.3rem]">₹{partner_income}</p>
                </div>
              </>
            )}
            <div className="bg-[#EFEEFF] text-black px-4 py-2 rounded-lg border lg:mt-0 mt-4 lg:mb-0 mb-3">
              <p className="text-[.8rem] font-bold">Sponsor Income </p>
              <p className="text-[1.3rem]">₹{incomeToFixedFun(rewardincome)}</p>
            </div>
            <div className="flex flex-wrap gap-5">
              <div className="lg:w-[280px] w-full lg:mt-0 mt-2 h-[90px] bg-[#4d33f8] text-white rounded-lg flex justify-start gap-5 items-center px-5">
                <div className="bg-[#8F87F1] px-4 py-[6px] rounded-xl">
                  <p className="text-white font-extrabold text-[1.5rem]">₹</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Total Income</p>
                  <p>₹ {totalIncome}</p>
                </div>
              </div>
              <div className="lg:w-[280px] w-full lg:mt-0 mt-2 h-[90px] bg-[#4d33f8] text-white rounded-lg flex justify-start gap-5 items-center px-5">
                <div className="bg-[#8F87F1] px-4 py-[6px] rounded-xl">
                  <p className="text-white font-extrabold text-[1.5rem]">₹</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p>Total Withdrawal</p>
                  <p>₹ {totalWithdrawal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 justify-between md:mt-10 mt-5">
          <div className="lg:w-[48%] w-full">
            <CustomAboutmeDashHome />
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

export default DashBoardHome;
