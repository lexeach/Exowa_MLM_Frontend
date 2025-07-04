import { LockIcon, MenuIcon, XIcon } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const HeaderMainPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const navigation = useNavigate();
  const handelLogin = async() => {
    try {
      navigation("/");
    } catch (error) {
      console.log(error);
    }
  };
  const handelregister = () => {
    navigation("/registration");
  };
  return (
    <header className="sticky top-0 z-50 w-full bg-[#090124]">
      <div className="container max-w-7xl m-auto flex py-3 items-center justify-between px-4 sm:px-8">
        <Link to="/" className="mr-8">
          <div>
            <img
              src={require("../../../assets/logo/dowin.png")}
              className="object-contain w-16"
              alt="Logo"
            />
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-2"
            onClick={handelLogin}
          >
            <LockIcon className="w-4 h-4" />{" "}
            <span className="lg:flex hidden">Customer</span> Login
          </button>
          <button
            className="text-white border lg:text-sm text-xs border-[#ffffff] lg:px-4 px-2 h-[40px] rounded-lg flex items-center hover:border-[#4d33f8] hover:bg-[#4d33f8] transition-all"
            onClick={handelregister}
          >
            Create Account
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderMainPage;
