import React from "react";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authenticateApi, toastmsg } from "../GlobalApi/Global";
import axios from "axios";

const AllowClearExamUser = ({ setisAllowuser }) => {
  const Theme = useSelector((state) => state.doWin.Theme);
  const authData = useSelector((state) => state.doWin.ApiAllData);
  const is_exam_cleard_userdata = authData?.data?.exam_cleard_user || [];
  const logindata = useSelector((state) => state.doWin.userLoginData);
  const usertoken = logindata?.token;
  const dispatch = useDispatch();
  const BaseURI = process.env.REACT_APP_API_BASE_URI;

  const allowuser = async (userid, action) => {
    try {
      const config = {
        headers: {
          "x-access-token": usertoken,
        },
      };
      const response = await axios.post(
        `${BaseURI}/user/approved_user  `,
        { approval_userid: userid, status: action },
        config
      );
      if (response.status === 200) {
        authenticateApi(usertoken, dispatch);
        toastmsg("1", response?.data?.message || "Unknow");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      toastmsg(
        "0",
        error?.response?.message ||
          error?.response?.data?.message ||
          error?.response?.data?.error
      );
    }
  };

  const handleAllowClick = (userid, action) => {
    if (userid && action === 1) {
      allowuser(userid, action);
      setisAllowuser(false);
    } else if (userid && action === 2) {
      allowuser(userid, action);
      setisAllowuser(false);
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 overflow-y-auto sm:overflow-y-hidden"
        style={{ zIndex: 999 }}
      >
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
          <div
            className="inline-block relative transform overflow-hidden rounded-3xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[34rem] sm:align-middle"
            style={{
              backgroundColor: Theme.background,
              borderColor: Theme.background,
              color: Theme.textcolor,
            }}
          >
            <button className="w-full flex justify-end pr-5 pt-5">
              <IoMdClose
                className="text-2xl"
                onClick={() => setisAllowuser(false)}
              />
            </button>

            <div
              className="bg-white max-h-[90vh] overflow-auto px-4 pt-5 pb-4 sm:p-6 sm:pb-4"
              style={{
                backgroundColor: Theme.background,
                borderColor: Theme.background,
                color: Theme.textcolor,
              }}
            >
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr
                    className="bg-gray-100 border-b"
                    style={{
                      backgroundColor: Theme.background,
                      borderColor: Theme.background,
                      color: Theme.textcolor,
                    }}
                  >
                    <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                      Sr No.
                    </th>
                    <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                      Name
                    </th>
                    <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                      User Id
                    </th>
                    <th className="px-4 py-3.5 text-left text-sm font-medium text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {is_exam_cleard_userdata?.map((data, index) => (
                    <tr
                      key={`${data.userid}-${index}`}
                      className="border-b border-indigo-50"
                    >
                      <td
                        className="px-4 py-3.5 text-sm"
                        style={{ color: Theme.textcolor }}
                      >
                        {index + 1}
                      </td>
                      <td
                        className="px-4 py-3.5 text-sm"
                        style={{ color: Theme.textcolor }}
                      >
                        {data?.user_name}
                      </td>
                      <td
                        className="px-4 py-3.5 text-sm"
                        style={{ color: Theme.textcolor }}
                      >
                        {data?.userid}
                      </td>
                      <td
                        className="px-4 py-3.5 text-sm min-w-[120px] max-w-[180px] flex gap-2"
                        style={{ color: Theme.textcolor }}
                      >
                        <button
                          onClick={() => handleAllowClick(data?.userid, 1)}
                          className="px-3 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 transition"
                        >
                          Allow
                        </button>
                        <button
                          onClick={() => handleAllowClick(data?.userid, 2)}
                          className="px-3 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 transition"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllowClearExamUser;
