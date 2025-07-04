import {
  ArrowRight,
  FacebookIcon,
  Instagram,
  Mail,
  Send,
  Twitter,
  Youtube,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toastmsg } from "../../dashboard/GlobalApi/Global";

const MainFooter = () => {
  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const [socialMediaData, setSocialMediaData] = useState(null);
  useEffect(() => {
    axios
      .get(`${BaseURI}/website/social_media`)
      .then((response) => {
        setSocialMediaData(response?.data?.result[0]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const [email, setemail] = useState(null);
  const handlechange = (e) => {
    setemail(e.target.value);
  };

  const handleSubmit = async () => {
    if (email !== null) {
      SubscribeAPi();
    } else {
      toastmsg("0", "Please Enter Email");
    }
  };
  const SubscribeAPi = async () => {
    const data = {
      email: email,
    };
    try {
      const res = await axios.post(`${BaseURI}/website/subscriber`, data);
      if (res.status === 200) {
        setemail("");
        toastmsg("1", res.data.message);
      }
    } catch (error) {
      toastmsg("0", "Email Error!");
    }
  };

  return (
    <footer className="w-full bg-gradient-to-r from-[#000000] to-[#0b0914] lg:py-14 py-8">
      <div className="container max-w-7xl m-auto px-4 sm:px-8">
        <div className="pb-14 pt-12">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 gap-4">
            <div className="lg:mb-0 mb-10">
              <div className="pb-8">
                <img
                  src={require("../../../assets/logo/logo-white.png")}
                  className="object-contain w-24"
                  alt=""
                />
              </div>
              <div className="pr-4">
                <p className="text-white text-lg leading-7 font-normal tracking-wide">
                Exowa is an AI-powered academic assessment platform built using advanced algorithms and technologies—designed to deliver smart, accurate, and personalized learning experiences.


                </p>
              </div>
            </div>
            <div className="lg:mb-0 mb-10">
              <div className="mb-5">
                <h4 className="text-2xl font-medium text-white ">Navigation</h4>
              </div>
              <div className="grid gap-5">
                <Link
                  to="/"
                  className="text-gray-100 hover:text-[#4d33f8] transition"
                >
                  Home
                </Link>
                <Link
                  to="/about-us"
                  className="text-gray-100 hover:text-[#4d33f8] transition"
                >
                  About
                </Link>
                <Link
                  to="/contact-us"
                  className="text-gray-100 hover:text-[#4d33f8] transition"
                >
                  Contact
                </Link>
                <Link
                  to="/terms-and-conditions"
                  className="text-gray-100 hover:text-[#4d33f8] transition"
                >
                  Terms & Conditions
                </Link>
                <Link
                  to="/privacy-policy"
                  className="text-gray-100 hover:text-[#4d33f8] transition"
                >
                  Privacy Policy
                </Link>
              </div>
            </div>
            <div className="lg:mb-0 mb-10">
              <div className="grid gap-5">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socialMediaData?.facebook}
                  className="flex items-center gap-4 text-gray-100 hover:text-[#4d33f8]"
                >
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                    <FacebookIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-normal">Facebook</span>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socialMediaData?.twitter}
                  className="flex items-center gap-4 text-gray-100 hover:text-[#4d33f8]"
                >
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                    <Twitter className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-normal">X (Twitter)</span>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socialMediaData?.telegram_channel}
                  className="flex items-center gap-4 text-gray-100 hover:text-[#4d33f8]"
                >
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                    <Send className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-normal">Telegram</span>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socialMediaData?.instagram}
                  className="flex items-center gap-4 text-gray-100 hover:text-[#4d33f8]"
                >
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-normal">Instagram</span>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socialMediaData?.youtube}
                  className="flex items-center gap-4 text-gray-100 hover:text-[#4d33f8]"
                >
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                    <Youtube className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-normal">YouTube</span>
                </a>
              </div>
            </div>
            <div className="lg:mb-0 mb-10">
              <div className="grid gap-5 mb-10">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={socialMediaData?.whatsapp_channel}
                  className="flex items-center gap-4 text-gray-100 hover:text-[#4d33f8]"
                >
                  <div className="flex items-center justify-center">
                    <FaWhatsapp className="w-9 h-9" />
                  </div>
                  <div>
                    <h6 className="text-xl font-normal">
                      {socialMediaData?.mobile_no}
                    </h6>
                    <p className="text-sm font-normal">Trading related query</p>
                  </div>
                </a>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`mailto:${
                    socialMediaData?.support_email || "contact@algo-trader.network"
                  }`}
                  className="flex items-center gap-4 text-gray-100 hover:text-[#4d33f8]"
                >
                  <div className="w-10 h-10 rounded-full border border-white flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h6 className="text-xl font-normal break-words">
                      {socialMediaData?.support_email ||
                        "contact@algo-trader.network"}
                    </h6>
                    <p className="text-sm font-normal">Email us</p>
                  </div>
                </a>
              </div>

              <div className="">
                <div className="mb-5">
                  <h4 className="text-2xl font-medium text-white">
                    Subscribe To Newsletter
                  </h4>
                  <p className="text-sm text-white">
                    Get latest update and news
                  </p>
                </div>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your Email"
                    onChange={handlechange}
                    value={email}
                    className="w-full bg-[#1d1d1d] px-4 h-[43px] rounded-lg focus:outline-none  font-medium placeholder:text-gray-400 text-white"
                  />
                  <button
                    className="absolute top-0 right-3 bottom-0 bg-[#1d1d1d] rounded-lg"
                    onClick={handleSubmit}
                  >
                    {" "}
                    <ArrowRight className="text-[#4d33f8]" />{" "}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-10 border-t border-[#b8b2ca94]">
          <p className="text-[#B8B2CA] text-sm">
            Copyright © 2025, . All trademarks and copyrights belong to
            Autasis Edutech
          </p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
