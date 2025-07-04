import { Bell } from "lucide-react";
import React, { useEffect } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import notiIcon from "../../../assets/images/user-avatar-icon.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  formatsecendDate,
  getUserNotifitions,
  toastmsg,
} from "../GlobalApi/Global";
import Badge from "@mui/material/Badge";

const NotificationsBell = () => {
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const userToken = useSelector((state) => state.doWin.userLoginData);
  const isuserIsLogin = useSelector((state) => state.doWin.userIsLogin);
  const setusertoken = userToken?.token;
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const userName = ApiAllData?.data?.user_name || "default user";
  const AllNotifition = useSelector((state) => state.doWin.AllNotifition);
  const dispatch = useDispatch();
  const unseenNotifications = AllNotifition?.filter(
    (notification) => notification?.is_seen === 0
  );
  const notificationCount = unseenNotifications?.length;
  //-------------
  const seenNotification = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": setusertoken,
          Authorization: `Bearer ${setusertoken}`,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/seenNotification`,
        {},
        config
      );
      //   console.log("API response---------", response.data);
      if (response.status === 200) {
        getUserNotifitions(setusertoken, dispatch);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  //-------------
  const NotificationClearApi = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": setusertoken,
          Authorization: `Bearer ${setusertoken}`,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/notificationClear`,
        {},
        config
      );
      //   console.log("API response---------", response.data);
      if (response.status === 200) {
        getUserNotifitions(setusertoken, dispatch);
        toastmsg("1", response.data.message);
      }
    } catch (error) {
      console.error("Error during API call:", error);
    }
  };

  const NotificationClear = () => {
    if (AllNotifition?.length > 0) {
      NotificationClearApi();
    } else {
      // toastmsg("0", "Notification Not Found!");
    }
  };

  //-------------------
  useEffect(() => {
    if (isuserIsLogin === true) {
      getUserNotifitions(setusertoken, dispatch);
    }
  }, [isuserIsLogin]);
  const Theme = useSelector((state) => state.doWin.Theme);
  return (
    <Popover className="relative">
      <PopoverButton className="focus:outline-none" onClick={seenNotification}>
        <div
          className="w-9 h-9 bg-white rounded-full flex items-center justify-center text-[#4d33f8] hover:text-[#4d33f8] transition ease-in-out delay-150 hover:scale-125"
          style={{
            color: Theme.textcolor,
            background: Theme.inputbg,
          }}
        >
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "red",
                color: "#fff",
              },
            }}
            badgeContent={notificationCount}
          >
            <Bell className="w-5 h-5" />
          </Badge>
        </div>
      </PopoverButton>
      <PopoverPanel
        anchor="bottom"
        style={{
          background: Theme.inputbg,
        }}
        className="divide-y divide-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 flex flex-col bg-[#fff] p-2 rounded-2xl shadow-md w-[310px] z-20"
      >
        <div className="h-[380px] overflow-auto py-2 px-3 mb-3 relative  z-50">
          {AllNotifition?.map((item) => {
            const dateTime = formatsecendDate(item?.time);
            return (
              <>
                <div
                  key={item.id}
                  className={`flex items-start gap-3 mb-3 relative p-1 rounded-md ${
                    item.is_seen === 0 ? "bg-gray-100" : ""
                  }`}
                  style={{
                    background:
                      item.is_seen === 0 ? Theme.background : Theme.inputbg,
                  }}
                >
                  <div className="w-[15%]">
                    <img
                      src={notiIcon}
                      className="rounded-full w-10 h-10"
                      alt="noti image"
                    />
                  </div>
                  <div className="w-[85%] relative">
                    <h5
                      className="text-[15px] text-gray-900 font-[400] flex justify-between items-center  relative"
                      style={{
                        color: Theme.textcolor,
                      }}
                    >
                      <span>{userName || ""}</span>
                      <span className="flex flex-col relative pr-3">
                        <span className="text-[.7rem] ">
                          {dateTime?.time || "00"}
                        </span>
                        <span className="text-[.7rem] absolute mt-3">
                          {dateTime?.date || "00/00/00"}
                        </span>
                      </span>
                    </h5>
                    <h6
                      className="text-[12px] text-gray-600 font-[400]  mt-1 leading-5"
                      style={{
                        color: Theme.textcolor,
                      }}
                    >
                      {item.action}
                    </h6>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="flex flex-wrap justify-between  items-center pb-3 px-3">
          <PopoverButton
            className="text-[14px] font-[400] text-[#4d33f8] text-center"
            style={{
              color: Theme.textcolor,
            }}
            onClick={NotificationClear}
          >
            Clear
          </PopoverButton>
          <PopoverButton
            className="text-[14px] font-[400] text-[#4d33f8] text-center"
            style={{
              color: Theme.textcolor,
            }}
          >
            Close
          </PopoverButton>
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default NotificationsBell;
