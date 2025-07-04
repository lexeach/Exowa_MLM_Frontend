import React, { useMemo } from "react";
import { getDynamicStyles } from "../dashboard/GlobalApi/Global";
import { useSelector } from "react-redux";

const ComingSoon = () => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(Theme);
  }, [Theme]);
  return (
    <div className="overflow-hidden">
      <div className="max-h-screen overflow-x-auto py-5 lg:px-10 px-3">
        <div className="flex items-center justify-center h-screen">
          <div className="" style={{ background: dynamicStyles.color }}>
            <img
              src={require("../../assets/images/Coming-Soon-1-21-2025.gif")}
              className="w-full mix-blend-multiply "
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
