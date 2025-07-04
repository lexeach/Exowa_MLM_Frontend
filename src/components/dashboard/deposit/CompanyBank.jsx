import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { getDynamicStyles, toastmsg } from "../GlobalApi/Global";
import { FaRegCopy } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";

const CompanyBank = () => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const companyBanks = ApiAllData.data.company_banks || [];
  const [isShow, setisShow] = useState(false);
  const arraysize = companyBanks.length;
  useEffect(() => {
    if (arraysize > 0) {
      setisShow(true);
    }
  }, [companyBanks]);
  //----------------
  const handleCopy = (e, item) => {
    navigator.clipboard.writeText(e).then(() => {
      let msg = "";
      if (item === "pan_no") {
        msg = "Pan No. Copied!";
      } else if (item === "ifsc") {
        msg = "Copied IFSC code ";
      } else if (item === "acc_no") {
        msg = "Copied Account No.!  ";
      }
      toastmsg("1", msg);
    });
  };
  const Theme = useSelector((state) => state.doWin.Theme);
  return (
    <div className="">
      {isShow && (
        <div className="lg:flex items-center gap-4 pl-5 ">
          <div className="pb-5  w-full">
            {/* <h6 className=" text-xl mb-2">Company Banks</h6> */}
            <div className="flex flex-wrap xl:gap-[10rem] gap-10  justify-center">
              {companyBanks?.map((item) => {
                return (
                  <>
                    <div
                      className="h-[14em] md:pl-4 pl-2 w-[25rem] border-2 border-[rgba(75,30,133,0.5)] rounded-[1.5em] bg-gradient-to-r from-[#090124] via-[#5640e7] to-[#4d33f8]  px-2 py-4 shadow-md shadow-indigo-50 text-white font-nunito p-[1em] flex justify-center items-left flex-col gap-[0.75em] backdrop-blur-[12px]"
                      style={{
                        boxShadow: `0px 4px 10px ${Theme.shadowcolor}`,
                      }}
                    >
                      <div className="relative">
                        <h1>Company Bank</h1>
                        <MdAccountBalance className="text-[3rem] absolute right-5 -top-3 bg-[#c6facc]/5 p-[.6rem] rounded-xl" />
                        <h1 className="text-[2em] font-medium uppercase ">
                          <span>{item.bank_name || "default bank"}</span>
                        </h1>
                        <p className="text-[1rem] flex flex-wrap">
                          <span className="pr-1">Holder Name:</span>
                          <span>{item.acc_holder || "default bank"}</span>
                        </p>
                        <p className="text-[1rem]  flex flex-wrap">
                          <span className="pr-1"> Pan No:</span>
                          <span>{item.pan_no || "default bank"}</span>
                          <button
                            onClick={() => handleCopy(item.pan_no, "pan_no")}
                            className="ml-3 text-white "
                          >
                            <FaRegCopy className="text-[1rem]" />
                          </button>
                        </p>
                        <p className="text-[1rem]  flex flex-wrap">
                          <span className="pr-1"> IFSC Code : </span>
                          <span>{item.ifsc || "default bank"}</span>
                          <button
                            onClick={() => handleCopy(item.ifsc, "ifsc")}
                            className="ml-3 text-white "
                          >
                            <FaRegCopy className="text-[1rem]" />
                          </button>
                        </p>

                        <p className="text-[1rem]  flex flex-wrap">
                          <span className="pr-1"> Account No:</span>
                          <span>{item.acc_no || "default bank"}</span>
                          <button
                            onClick={() => handleCopy(item.acc_no, "acc_no")}
                            className="ml-3 text-white "
                          >
                            <FaRegCopy className="text-[1rem]" />
                          </button>
                        </p>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            {/* -------- */}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyBank;
