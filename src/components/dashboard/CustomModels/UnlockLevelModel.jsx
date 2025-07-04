import React from "react";
import { useSelector } from "react-redux";
import { formatAmount } from "../GlobalApi/Global";
import ButtonLoader from "../../loader/ButtonLoader";

const UnlockLevelModel = ({
  levelData,
  setisModalOpen,
  handleContinue,
  activeLevelLoader,
}) => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const amount = formatAmount(levelData?.default_amount || 0);

  return (
    <>
      <div className="fixed inset-0  overflow-y-auto" style={{ zIndex: 999 }}>
        <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-950 opacity-80"></div>
          </div>
          <span
            className="hidden sm:inline-block sm:h-screen sm:align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div className="inline-block relative transform overflow-hidden rounded-3xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[34rem] sm:align-middle">
            <div
              className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
              style={{
                backgroundColor: Theme.background,
                borderColor: Theme.background,
                color: Theme.textcolor,
              }}
            >
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <h3
                    className="text-lg font-medium leading-6 text-[#4d33f8]"
                    id="modal-title"
                    style={{
                      color: Theme.textcolor,
                    }}
                  >
                    Upgrade Level
                  </h3>
                  <div className="mt-5 w-full flex flex-col justify-center items-center gap-3">
                    <p className="font-bold text-[1.5rem] bg-[#8F87F1] w-14 h-14 rounded-full text-white flex justify-center items-center ">
                      {levelData?.level || 0}
                    </p>
                    <p className="text-[2rem]">₹ {amount || 0}</p>
                  </div>
                  <div className="mt-5 w-full flex flex-col justify-center items-center gap-3">
                    <p className="font-bold">
                      "Upgrade now to enjoy additional benefits"
                    </p>
                    <p className="font-bold">
                      "Are you sure you want to proceed?"
                    </p>
                  </div>
                  <div className="my-4 w-full flex flex-wrap  justify-center mt-10 items-center gap-4">
                    <button
                      className="px-2 py-[6px] text-white  bg-red-600 rounded-lg  hover:text-white  ease-in duration-[0.4s] hover:scale-[0.9]"
                      onClick={() => setisModalOpen(false)}
                    >
                      Cancel
                    </button>
                    {activeLevelLoader ? (
                      <button className="px-2 py-[6px] text-white  bg-green-600 rounded-lg  hover:text-white  ease-in duration-[0.4s] hover:scale-[0.9]">
                        <ButtonLoader />
                      </button>
                    ) : (
                      <button
                        className="px-2 py-[6px] text-white  bg-green-600 rounded-lg  hover:text-white  ease-in duration-[0.4s] hover:scale-[0.9]"
                        onClick={() => handleContinue(levelData)}
                      >
                        Continue
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnlockLevelModel;
