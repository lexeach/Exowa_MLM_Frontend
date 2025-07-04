import React, { useCallback, useMemo } from "react";
import { Power, Search } from "lucide-react";
import NotificationsBell from "./dashboardmenu/NotificationsBell";
import { Button } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { reduxEmpty } from "./GlobalApi/Global";
import { persistor } from "../../Redux/Store";
const Header = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const userName = ApiAllData?.data?.user_name || "user";
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const handelLogout = useCallback(async () => {
    try {
      await reduxEmpty(dispatch);
      await persistor.purge();
      localStorage.removeItem("persist:root");
      sessionStorage.clear();
      // navigation("algo-trader");
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, navigation]);
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStyles = useMemo(() => {
    return {
      color: PageTheme?.textcolor || Theme?.textcolor,
      background: PageTheme?.background || Theme?.inputbg,
    };
  }, [Theme, PageTheme]);
  return (
    <header
      className="h-16 border-b border-[#f2f0ff] bg-white lg:px-10 px-3 py-2 flex items-center justify-between gap-3"
      style={{
        color: Theme.textcolor,
        background: Theme.background,
        border: Theme.background,
      }}
    >
      <div className="md:ml-0 ml-8">
        <div
          className="lg:text-sm text-xs text-gray-500"
          style={{
            color: Theme.textcolor,
          }}
        >
          Welcome,
        </div>
        <div
          className="font-medium lg:text-[16px] text-xs text-gray-800"
          style={{
            color: Theme.textcolor,
          }}
        >
          {userName}
        </div>
      </div>

      <div className="max-w-xl flex-1 relative hidden md:block">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
          style={{
            color: Theme.textcolor,
          }}
        />
        <input
          type="search"
          placeholder="Find something"
          style={{
            color: Theme.textcolor,
            background: Theme.inputbg,
          }}
          className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 rounded-lg border-0 focus:ring-2 focus:ring-[#4d33f8] focus:outline-none"
        />
      </div>
      <div className="flex items-center gap-5 ">
        <NotificationsBell />
        <Button
          className="px-4 flex items-center gap-3 bg-[#4d33f8]/10 hover:bg-[#4d33f8] rounded-lg text-[#4d33f8] hover:text-white lg:h-[43px] h-[40px] ease-in duration-[0.4s] hover:scale-[0.9]"
          onClick={handelLogout}
          style={dynamicStyles}
        >
          Log out
          <Power className="w-4 h-4" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
