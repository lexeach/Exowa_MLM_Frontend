import React, { memo } from "react";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
const CustomcardDashHome = ({ amount = 0, filedname = "" }) => {
  return (
    <>
      <div className="lg:w-[320px] xl:w-[260px] 2xl:w-[320px] w-full h-[130px] bg-[#4d33f8] text-white rounded-lg flex justify-start gap-5 items-center px-5">
        <div className="bg-[#8F87F1]  p-2 rounded-xl">
          <HiOutlineClipboardDocumentList className="text-white font-extrabold text-[2.2rem]" />
        </div>
        <div className="">
          <p className="text-[2rem]">$ {amount}</p>
          <p className="text-[1rem] font-bold">{filedname}</p>
        </div>
      </div>
    </>
  );
};

export default memo(CustomcardDashHome);
