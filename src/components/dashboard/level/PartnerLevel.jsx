import React, { useState } from "react";
import { ChevronRight, LucideLayoutDashboard } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import profile from "../../../assets/images/defaultProfile.png";
import { BsFillUnlockFill, BsFillLockFill } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import { GiWideArrowDunk } from "react-icons/gi";
import { TbKeyframesFilled } from "react-icons/tb";
import { FaRegCopy } from "react-icons/fa";
import {
  authenticateApi,
  formatAmount,
  formatAmoutText,
  handleCopy,
  toastmsg,
} from "../GlobalApi/Global";
import axios from "axios";
import UnlockLevelModel from "../CustomModels/UnlockLevelModel";
import SendPowerModel from "../CustomModels/SendPowerModel";
import ShiftPowerModel from "../CustomModels/ShiftPowerModel";
import { RiTable2 } from "react-icons/ri";
import { setActiveLevelData } from "../../../Redux/DoWinSlice";
import ButtonLoader from "../../loader/ButtonLoader";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

const PartnerLevel = () => {
  const IMGURI = process.env.REACT_APP_IMG_URI;
  const logindata = useSelector((state) => state.doWin.userLoginData);
  const usertoken = logindata?.token;
  const BaseURI = process.env.REACT_APP_API_BASE_URI;

  const authData = useSelector((state) => state.doWin.ApiAllData);
  const activeLevelData = authData?.data?.mergedPartnerLevels || [];
  const userlevels = authData?.data?.mergedPartnerLevels || [];
  // console.log("userlevels",userlevels)

  const isAllActive = userlevels.every((item) => item?.is_active === 1);
  const showData = authData?.data || {};
  const img = authData?.data?.selfie || "";
  const userProImage = img?.startsWith("/uploads")
    ? `${IMGURI}${img}`
    : profile;
  const Theme = useSelector((state) => state.doWin.Theme);
  const dispatch = useDispatch();

  // states
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isSendPowerModel, setisSendPowerModel] = useState(false);
  const [isShiftPower, setisShiftPower] = useState(false);
  const [levelData, setlevelData] = useState(null);
  const [LevelNuber, setLevelNuber] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [activeLevelLoader, setactiveLevelLoader] = useState(false);
  const [eyeStates, setEyeStates] = useState({});

  const activetOthersLevels = async () => {
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };

      const response = await axios.post(
        `${BaseURI}/user/upgrade-partner-level  `,
        { level: levelData?.level },
        config
      );
      if (response.status === 200) {
        authenticateApi(usertoken, dispatch);
        toastmsg("1", response?.data?.message || "Unknow");
        setisModalOpen(false);
        setactiveLevelLoader(false);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error
      );
      setactiveLevelLoader(false);
      setisModalOpen(false);
    }
  };

  // const activeLength = activeLevelData?.length;
  // const lastItem = activeLevelData[activeLength - 1];
  // const LastDataAmount = parseFloat(lastItem?.amount || "0");
  const activeLevels = activeLevelData.filter((item) => item.is_active === 1);
  const activeLength = activeLevels.length;
  const lastItem = activeLevels[activeLength - 1];

  const LastDataAmount = parseFloat(lastItem?.power_am || "0");

  const handleopnemodel = (e) => {
    if (e?.level === activeLength + 1 && LastDataAmount !== 0) {
      setisModalOpen(true);
      setlevelData(e);
    } else if (LastDataAmount === 0) {
      toastmsg("0", "Insufficient balance");
    } else {
      toastmsg("0", "Please activate the previous level before continuing.");
    }
  };

  const HandleSendPower = (data) => {
    if (data?.power_am > 0) {
      setisSendPowerModel(true);
      setLevelNuber(data);
    } else {
      toastmsg("0", "Insufficient amount");
    }
  };
  const HandleShiftPower = (data) => {
    if (data?.power_am > 0) {
      setisShiftPower(true);
      setLevelNuber(data);
    } else {
      toastmsg("0", "Insufficient amount");
    }
  };

  const handleContinue = (data) => {
    if (data?.level !== 1) {
      setactiveLevelLoader(true);
      setTimeout(() => {
        activetOthersLevels();
      }, 1000);
    }
  };

  const toggleEye = (level) => {
    setEyeStates((prev) => ({
      ...prev,
      [level]: !prev[level],
    }));
  };
  return (
    <>
      <div className="overflow-hidden relative">
        {isModalOpen && (
          <UnlockLevelModel
            levelData={levelData}
            setisModalOpen={setisModalOpen}
            handleContinue={handleContinue}
            activeLevelLoader={activeLevelLoader}
          />
        )}
        {isSendPowerModel && (
          <SendPowerModel
            setisSendPowerModel={setisSendPowerModel}
            LevelNuber={LevelNuber}
            isCondition={1}
          />
        )}
        {isShiftPower && (
          <ShiftPowerModel
            setisShiftPower={setisShiftPower}
            LevelNuber={LevelNuber}
            isCondition={1}
          />
        )}
        <div className="max-h-screen overflow-x-auto py-4 lg:px-10 px-3">
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
                    Partner
                  </Link>
                </li>
                <li aria-current="page">
                  <div class="flex items-center">
                    <ChevronRight className="w-4 h-4" />
                    <span class="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                      Partner Level
                    </span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <div>
            <div
              className="bg-white rounded-2xl   border border-violet-50 lg:px-8 lg:py-6 p-4  mt-5  w-full flex flex-wrap gap-5 justify-between items-center"
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
                <p className="text-[1rem] font-extrabold">
                  {showData?.user_name || ""}
                </p>
              </div>
              <div>
                <p className="text-[.8rem] font-bold">Active Level</p>
                <p className="text-[1.3rem]"># {activeLength}</p>
              </div>
              <div className="flex md:justify-center  flex-wrap md:items-center gap-5">
                <div>
                  <p className="text-[.8rem] font-bold">CO-REFERRAL CODE</p>
                  <p className="text-[1.2rem] flex gap-2 items-center justify-center">
                    # {showData?.coreferrer_code || ""}{" "}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleCopy(showData?.coreferrer_code)}
                    >
                      <FaRegCopy />
                    </span>
                  </p>
                </div>
                <div>
                  <p className="text-[.8rem] font-bold">REFERRAL CODE</p>
                  <p className="text-[1.2rem] flex gap-2 items-center justify-center">
                    # {showData?.userid || ""}{" "}
                    <span
                      className="cursor-pointer"
                      onClick={() => handleCopy(showData?.userid)}
                    >
                      <FaRegCopy />
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className=" mt-7 flex flex-wrap  gap-5 mb-24">
            {userlevels?.map((data) => {
              const amount = formatAmount(data?.power_am);
              const formatAmount1 = formatAmoutText(amount);
              const fees = formatAmount(data?.default_amount);
              const isEye = eyeStates[data.level];
              return (
                <>
                  <div
                    key={data?.level}
                    className="lg:w-[330px] xl:w-[350px] 2xl:w-[375px] w-full h-[170px] lg:h-[180px]  text-white rounded-lg  px-3"
                    style={{
                      background: data?.is_active
                        ? "linear-gradient(45deg, #337df8, #886ece)"
                        : "linear-gradient(45deg, #4d4d50, #13273B)",
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <p className="text-[1rem] font-bold py-[8px]">
                        Level {data.level}
                      </p>
                      {data?.is_active ? (
                        <p className="  font-extrabold ">Active</p>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className=" text-white rounded-lg flex justify-start gap-3 items-center px-2 mt-2">
                      <div
                        className="  p-2 rounded-xl"
                        style={{
                          background: data?.is_active ? "#fff" : "#737373",
                        }}
                      >
                        {data?.is_active ? (
                          <BsFillUnlockFill className="text-[#337DF8] font-extrabold text-[1.9rem]" />
                        ) : (
                          <BsFillLockFill className="text-white font-extrabold text-[1.9rem]" />
                        )}
                      </div>
                      <div className="flex gap-1 relative  w-full">
                        <div className="flex flex-col -gap-5 items-start">
                          <p className="flex gap-1 justify-center items-start text-[1.1rem] ">
                            Power ₹
                            {amount > 0 ? (
                              <span className="text-[1.2rem]">
                                {isEye ? amount : formatAmount1}
                              </span>
                            ) : (
                              0
                            )}
                          </p>
                          {data?.is_active === 0 && (
                            <p className="flex gap-1 justify-center items-start text-[1.1rem] ">
                              Fees ₹
                              <span className="text-[1.2rem]">{fees}</span>
                            </p>
                          )}
                        </div>
                        {String(formatAmount1).includes("...") && (
                          <button
                            className="text-white absolute right-0 top-1"
                            onClick={() => toggleEye(data?.level)}
                          >
                            {isEye ? (
                              <IoMdEye className="text-[1.4rem]" />
                            ) : (
                              <IoMdEyeOff className="text-[1.4rem]" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="w-full flex justify-end lg:mt-6 mt-4">
                      <div className="flex gap-3 w-full  justify-end">
                        {isAllActive ? (
                          ""
                        ) : (
                          <div
                            onMouseEnter={() =>
                              setHoveredButton({
                                level: data?.level,
                                type: "shift",
                              })
                            }
                            onMouseLeave={() => setHoveredButton(null)}
                            className="flex flex-col items-center relative"
                          >
                            <button
                              className="px-[5px] py-[5px] text-[#337DF8] bg-white rounded-lg"
                              onClick={() => HandleShiftPower(data)}
                            >
                              <GiWideArrowDunk className="text-[1.4rem] " />
                            </button>
                            {hoveredButton?.level === data?.level &&
                              hoveredButton?.type === "shift" && (
                                <p className="bottom-8 -right-10 absolute w-[145px] py-1 text-[.8rem] font-extrabold text-center  text-white">
                                  Shift Power
                                </p>
                              )}
                          </div>
                        )}
                        {data?.is_active ? (
                          <>
                            <div
                              onMouseEnter={() =>
                                setHoveredButton({
                                  level: data?.level,
                                  type: "send",
                                })
                              }
                              onMouseLeave={() => setHoveredButton(null)}
                              className="flex flex-col items-center relative"
                            >
                              <button
                                className="px-1 py-[4px] text-[#337DF8] bg-white rounded-lg"
                                onClick={() => HandleSendPower(data)}
                              >
                                <MdArrowOutward className="text-[1.5rem] " />
                              </button>
                              {hoveredButton?.level === data?.level &&
                                hoveredButton?.type === "send" && (
                                  <p className="bottom-8 -right-14 absolute w-[145px] py-1 text-[.8rem] font-extrabold text-center text-white">
                                    Transfer Power
                                  </p>
                                )}
                            </div>
                          </>
                        ) : (
                          <button
                            className="px-2 py-[6px] text-[#337DF8] flex justify-center gap-1 items-center bg-white rounded-lg    ease-in duration-[0.4s] hover:scale-[0.9]"
                            onClick={() => handleopnemodel(data)}
                          >
                            Unlock
                            <TbKeyframesFilled className="text-[#337DF8] font-extrabold text-[1.3rem]" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerLevel;
