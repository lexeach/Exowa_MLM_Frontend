import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { getDynamicStyles, handleCopy } from "../GlobalApi/Global";
import CustompageHeader from "../../custome/CustompageHeader";

const WalletAddress = () => {
  const authData = useSelector((state) => state.doWin.ApiAllData);
  const showData = authData?.data || {};
  const address = showData?.wallet_Address || "";
  const Theme = useSelector((state) => state.doWin.Theme);
  const PageTheme = useSelector((state) => state.doWin.PageTheme);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme]);

  return (
    <div className="overflow-hidden">
      <div className="max-h-screen overflow-x-auto py-5 lg:px-10 px-3">
        <div className="mt-5">
          <CustompageHeader
            hometab="Setting"
            innertab="Wallet Address"
            decText="Your wallet address is shown here."
            decTitle="Wallet Address"
          />

          <div
            className="bg-white rounded-2xl lg:p-10 p-2 shadow-md shadow-indigo-50 mt-10 mb-12"
            style={dynamicStyles}
          >
            <p className="font-bold">Wallet Address</p>
            <div className="flex items-center mt-2 w-full overflow-x-auto">
              <p
                className="pl-2 pr-3 py-[6px] border-[#4d33f8] border-l-2 border-b-2 border-t-2   rounded-l-lg"
                style={{
                  borderColor: PageTheme.background,
                }}
              >
                {address}
              </p>
              <button
                className="bg-[#4d33f8] text-white px-2 py-2  rounded-r-lg"
                style={{
                  background: PageTheme.background,
                }}
                onClick={() => handleCopy(address)}
              >
                Copy
              </button>
            </div>
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

export default WalletAddress;
