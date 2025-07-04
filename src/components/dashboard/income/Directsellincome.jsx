import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import CustompageHeader from "../../custome/CustompageHeader";
import { getDynamicStyles } from "../GlobalApi/Global";
import DirectsellincomeTable from "./DirectsellincomeTable";

const Directsellincome = () => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme]);
  return (
    <>
      <div className="overflow-hidden">
        <div className="max-h-screen overflow-x-auto py-5 lg:px-10 px-3">
          <CustompageHeader
            hometab="Income"
            innertab="Trading Income Profit"
            decText="  Here, you can seen Your Trading Income Profit Details!"
            decTitle="Trading Income Profit"
          />
          <div
            className="bg-white rounded-2xl lg:p-10 p-3 shadow-md shadow-indigo-50 mt-10 mb-12"
            style={dynamicStyles}
          >
            <DirectsellincomeTable />
          </div>
        </div>
      </div>
    </>
  );
};

export default Directsellincome;

 