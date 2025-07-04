import React, { memo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatUnixTimestamp, handleCopy } from "../dashboard/GlobalApi/Global";
import { FaUsers } from "react-icons/fa6";
import { GoDiscussionOutdated } from "react-icons/go";
import { GrValidate } from "react-icons/gr";
import { AiOutlineUserAdd } from "react-icons/ai";
import { LuCopy } from "react-icons/lu";
import { IoLogoRss } from "react-icons/io";
function CustomAboutmeDashHome() {
  const authData = useSelector((state) => state.doWin.ApiAllData);
 
  const showData = authData?.data || {};
  const formattime = formatUnixTimestamp(showData?.registration_date);
  const is_examPassed = authData?.data?.is_examPassed;
  const Is_Top_Approved = authData?.data?.is_top_approved === 2;

  const levelsRawData = authData?.data?.userHeightLevels || [];
  const invoices = levelsRawData?.map((item, index) => ({
    level: index + 1,
    values: item,
  }));
  
  // / Find the first item where pool_level === 1
  const targetRow = invoices?.find(row => row.values?.pool_level === 1);
  let total = null;
  if (targetRow) {
    total = Object.entries(targetRow.values)
      .filter(([key]) => key.startsWith('level_'))
      .reduce((sum, [_, value]) => sum + (Number(value) || 0), 0);
  }
  return (
    <>
      <div className="w-full flex flex-col gap-5 ">
        <p className="text-[1.1rem] font-bold">About Me</p>
        <p className="flex justify-between border-b-2 border-gray-200 pb-2 px-2 rounded-b-lg">
          <span className="font-bold text-[.9rem] flex gap-2 items-center">
            <AiOutlineUserAdd className="text-[1.2rem]" />
            Referral ID
          </span>
          {showData?.userid && (
            <span className="font-bold flex items-center gap-1 hover:text-blue-600">
              {showData?.userid || ""}{" "}
              <LuCopy
                className="cursor-pointer text-[1.1rem]"
                onClick={() => handleCopy(showData?.userid)}
              />
            </span>
          )}
        </p>
        <p className="flex justify-between border-b-2 border-gray-200 pb-2 px-2 rounded-b-lg">
          <span className="font-bold text-[.9rem] flex gap-2 items-center ">
            <IoLogoRss className="text-[1.2rem]" />
            {/* Referral By */}
            My Sponsor
          </span>
          {showData?.reffereral_code && (
            <span className="font-bold flex items-center gap-1 hover:text-blue-600">
              {showData?.reffereral_code || ""}
              <LuCopy
                className="cursor-pointer text-[1.1rem]"
                onClick={() => handleCopy(showData?.reffereral_code)}
              />
            </span>
          )}
        </p>
        <p className="flex justify-between border-b-2 border-gray-200 pb-2 px-2 rounded-b-lg">
          <span className="font-bold text-[.9rem] flex gap-2 items-center">
            <GrValidate className="text-[1.2rem]" />
            {/* Co-Referral */}
            My Partner
          </span>
          {showData?.coreferrer_code && (
            <span className="font-bold flex items-center gap-1 hover:text-blue-600">
              {showData?.coreferrer_code || ""}
              <LuCopy
                className="cursor-pointer text-[1.1rem]"
                onClick={() => handleCopy(showData?.coreferrer_code)}
              />
            </span>
          )}
        </p>
        <p className="flex justify-between border-b-2 border-gray-200 pb-2 px-2 rounded-b-lg">
          <span className="font-bold text-[.9rem] flex gap-2 items-center">
            <FaUsers className="text-[1.2rem]" />
            Team
          </span>
          <span className="font-bold">{total || 0}</span>
        </p>

        <p className="flex justify-between border-b-2 border-gray-200 pb-2 px-2 rounded-b-lg">
          <span className="font-bold text-[.9rem] flex gap-2 items-center">
            <GoDiscussionOutdated className="text-[1.2rem]" />
            Date of Joining
          </span>
          <span className="font-bold">{formattime || 0}</span>
        </p>
        <p className="flex justify-between border-b-2 border-gray-200 pb-2 px-2 rounded-b-lg font-extrabold">
          {showData?.is_partner === 1 ? (
            <span className="text-green-500">🌟 You are a Partner</span>
          ) : (
            <span> ❌ Not a Partner Yet</span>
          )}
        </p>
        {Is_Top_Approved && is_examPassed === 0 && (
          <p className="flex justify-between border-b-2 border-gray-200 pb-2 px-2 rounded-b-lg font-extrabold">
            <span className="text-green-500">
              🌟 Great news! Your exam has been approved by the Admin.
            </span>
          </p>
        )}
      </div>
    </>
  );
}

export default memo(CustomAboutmeDashHome);
