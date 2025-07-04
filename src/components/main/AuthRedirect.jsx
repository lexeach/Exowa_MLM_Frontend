import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reduxEmpty } from "../dashboard/GlobalApi/Global";

const AuthRedirect = () => {
  const navigate = useNavigate();
  const authRedirect = useSelector((state) => state.doWin.AuthRedirect);
  const dispatch = useDispatch();
  useEffect(() => {
    if (authRedirect === false) {
      navigate("/");
      reduxEmpty(dispatch);
    }
  }, [authRedirect]);
  return null;
};
export default AuthRedirect;
