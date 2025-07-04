import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authenticateApi, toastmsg } from "../GlobalApi/Global";
import ButtonLoader from "../../loader/ButtonLoader";

const SendPowerModel = ({
  setisSendPowerModel,
  LevelNuber,
  isCondition = 0,
}) => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const logindata = useSelector((state) => state.doWin.userLoginData);
  const usertoken = logindata?.token;
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const dispatch = useDispatch();
  const endName =
    isCondition === 0 ? "transfer-power" : "transfer-power-partener";

  const [formData, setFormData] = useState({
    toUserId: "",
    fromLevel: LevelNuber?.level || 0,
    amount: "",
    toLevel: "",
  });
  const [loader, setloader] = useState(false);
  const transferPower = async () => {
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };
      const perameter = {
        fromLevel: formData?.fromLevel || "",
        amount: formData?.amount || "",
        toUserId: formData?.toUserId || "",
        toLevel: formData?.toLevel || "",
      };
      const response = await axios.post(
        `${BaseURI}/user/${endName}`,
        perameter,
        config
      );
      if (response.status === 200) {
        authenticateApi(usertoken, dispatch);
        toastmsg("1", response?.data?.message || "Unknow");

        setisSendPowerModel(false);
        setloader(false);
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error
      );
      setloader(false);
      setisSendPowerModel(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);
  };

  const handleContinue = () => {
    if (
      formData?.amount &&
      formData?.fromLevel &&
      formData?.toUserId &&
      formData?.toLevel
    ) {
      setloader(true);
      setTimeout(() => {
        transferPower();
      }, 1000);
    } else {
      toastmsg("0", "Require all data");
    }
  };
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
                    Transfer Power
                  </h3>
                  <div
                    className="flex flex-col gap-4 p-4 max-w-md mx-auto bg-white rounded-2xl shadow-md mt-5"
                    style={{
                      backgroundColor: Theme.background,
                      borderColor: Theme.background,
                      color: Theme.textcolor,
                    }}
                  >
                    <label className="flex flex-col">
                      <span className="mb-1 text-sm font-semibold">
                        From Level
                      </span>
                      <input
                        type="number"
                        name="fromLevel"
                        value={formData.fromLevel}
                        readOnly
                        className="border border-gray-300 p-2 rounded bg-gray-100 outline-none"
                        style={{
                          backgroundColor: Theme.inputbg,
                          borderColor: Theme.background,
                          color: Theme.textcolor,
                        }}
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="mb-1 text-sm font-semibold">
                        Receiver's ID
                      </span>
                      <input
                        type="text"
                        name="toUserId"
                        placeholder="Enter receiver's ID"
                        value={formData.toUserId}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded outline-none"
                        style={{
                          backgroundColor: Theme.inputbg,
                          borderColor: Theme.background,
                          color: Theme.textcolor,
                        }}
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="mb-1 text-sm font-semibold">Amount</span>
                      <input
                        type="number"
                        name="amount"
                        placeholder="Enter Amount"
                        value={formData.amount}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded outline-none"
                        style={{
                          backgroundColor: Theme.inputbg,
                          borderColor: Theme.background,
                          color: Theme.textcolor,
                        }}
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="mb-1 text-sm font-semibold">
                        To Level
                      </span>
                      <input
                        type="number"
                        name="toLevel"
                        placeholder="Enter To Level"
                        value={formData.toLevel}
                        onChange={handleChange}
                        className="border border-gray-300 p-2 rounded outline-none"
                        style={{
                          backgroundColor: Theme.inputbg,
                          borderColor: Theme.background,
                          color: Theme.textcolor,
                        }}
                      />
                    </label>
                  </div>
                  <div className="my-4 w-full flex flex-wrap  justify-center mt-10 items-center gap-4">
                    <button
                      className="px-2 py-[6px] text-white  bg-red-600 rounded-lg  hover:text-white  ease-in duration-[0.4s] hover:scale-[0.9]"
                      onClick={() => setisSendPowerModel(false)}
                    >
                      Cancel
                    </button>
                    {loader ? (
                      <button className="px-2 py-[6px] text-white  bg-green-600 rounded-lg  hover:text-white  ease-in duration-[0.4s] hover:scale-[0.9]">
                        <ButtonLoader />
                      </button>
                    ) : (
                      <button
                        className="px-2 py-[6px] text-white  bg-green-600 rounded-lg  hover:text-white  ease-in duration-[0.4s] hover:scale-[0.9]"
                        onClick={handleContinue}
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

export default SendPowerModel;
