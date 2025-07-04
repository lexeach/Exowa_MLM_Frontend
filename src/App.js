import React, { useEffect } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Login from "./components/authentication/Login";
import Registration from "./components/authentication/Registration";
import ForgotPassword from "./components/authentication/ForgotPassword";
import OTP from "./components/authentication/OTP";
import Layout from "./components/dashboard/Layout";
import Header from "./components/dashboard/Header";
import Profile from "./components/main/Profile";
import UpdateForgotPassword from "./components/authentication/UpdateForgotPassword";
import DepositINRPackage from "./components/dashboard/deposit/DepositINRPackage";
import BankKyc from "./components/dashboard/setting/BankKyc";
import DepositInvoices from "./components/dashboard/deposit/DepositInvoices";
import ComingSoon from "./components/main/ComingSoon";
// Main page components
import HeaderMainPage from "./components/home/headers/HeaderMainPage";
import MainFooter from "./components/home/mainfooters/MainFooter";
import TermsConditions from "./components/home/TermsConditions";
import PrivacyPolicy from "./components/home/PrivacyPolicy";
import AboutUs from "./components/home/page/AboutUs";
import ContactUs from "./components/home/page/ContactUs";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setwebstaticdata } from "./Redux/DoWinSlice";
import DirectTeam from "./components/dashboard/network/DirectTeam";
import AllTeams from "./components/dashboard/network/AllTeams";
import Reward from "./components/dashboard/reward/Reward";
import BusinessHistory from "./components/dashboard/network/BusinessHistory";
import AccountStatement from "./components/dashboard/financial/AccountStatement";
import IncomeSumm from "./components/dashboard/financial/IncomeSumm";
import WalletHistory from "./components/dashboard/financial/WalletHistory";
import Support from "./components/dashboard/support/Support";
import WithdrawalAmount from "./components/dashboard/financial/WithdrawalAmount";
import { authenticateApi } from "./components/dashboard/GlobalApi/Global";
import WithdrawalReport from "./components/dashboard/financial/WithdrawalReport";
import AuthRedirect from "./components/main/AuthRedirect";
import DashBoardHome from "./components/dashboard/DashBoardHome";
import RewardIcome from "./components/dashboard/income/RewardIcome";
import TradingProfit from "./components/dashboard/income/TradingProfit";
import TradingLevel from "./components/dashboard/income/TradingLevel";
import Investment from "./components/dashboard/robot/Investment";
import InvestmentHistory from "./components/dashboard/robot/InvestmentHistory";
import WalletAddress from "./components/dashboard/setting/WalletAddress";
import Directsellincome from "./components/dashboard/income/Directsellincome";
import Level from "./components/dashboard/level/Level";
import ActiveLevelTable from "./components/dashboard/level/ActiveLevelTable";
import PartnerLevel from "./components/dashboard/level/PartnerLevel";
import UserrefarrelTable from "./components/dashboard/level/UserrefarrelTable";
import PartnerRefarralTable from "./components/dashboard/level/PartnerRefarralTable";
import Exam from "./components/dashboard/Exam/Exam";
import PaymentCart from "./components/dashboard/PaymentCart/PaymentCart";
import Turbo from "./components/dashboard/Turbo/Turbo";
import Powersummary from "./components/dashboard/financial/Powersummary";
import SponsorTeam from "./components/dashboard/level/SponsorTeam";
import PartnerTeam from "./components/dashboard/level/PartnerTeam";
import PartenMemberTable from "./components/dashboard/level/PartenMemberTable";
import LandingPage from "./components/home/LandingPage";
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};
const App = () => {
  const dispatch = useDispatch();
  const isuserIsLogin = useSelector((state) => state.doWin.userIsLogin);
  // console.log("isuserIsLogin", isuserIsLogin);
  const userLoginData = useSelector((state) => state.doWin.userLoginData);
  const usertoken = userLoginData?.token || "";
  const Layouts = () => (
    <div className="contentContainer">
      <Layout>
        <Header />
        <Outlet />
      </Layout>
    </div>
  );

  const BaseURI = process.env.REACT_APP_API_BASE_URI;
  const handkeGetHisotry = async () => {
    try {
      const res = await axios.get(`${BaseURI}/website/static_data`);
      const values = [...res?.data?.result];
      const result = values.map((item) => {
        return {
          title: item?.title,
          data: item?.description?.data,
        };
      });
      dispatch(setwebstaticdata(result));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handkeGetHisotry();
    if (isuserIsLogin === true) {
      authenticateApi(usertoken, dispatch);
    }
  }, []);

  return (
    <BrowserRouter basename="/autasis">
      <AuthRedirect />
      <ScrollToTop />
      {isuserIsLogin ? (
        <>
          <Routes>
            <Route path="/paymentCart" element={<PaymentCart />} />

            <Route element={<Layouts />}>
              {/* <Route path="/" element={<DashBoardHome />} /> */}
              <Route index element={<DashBoardHome />} />
              <Route path="/profile" element={<Profile />} />
              <Route
                path="/deposit-inr-package"
                element={<DepositINRPackage />}
              />
              <Route path="/deposit-invoices" element={<DepositInvoices />} />
              <Route path="/coming-soon" element={<ComingSoon />} />
              <Route path="/bankkyc" element={<BankKyc />} />
              <Route path="/level" element={<Level />} />
              <Route path="/activelevel" element={<ActiveLevelTable />} />
              <Route path="/partnerLevel" element={<PartnerLevel />} />
              <Route
                path="/UserrefarrelTable"
                element={<UserrefarrelTable />}
              />
              <Route
                path="/sponsorTeam"
                element={<SponsorTeam />}
              />
              
              <Route
                path="/PartnerRefarralTable"
                element={<PartnerRefarralTable />}
              />
              
              <Route
                path="/partnerTeam"
                element={<PartnerTeam />}
              />
               <Route
                path="/partnermember"
                element={<PartenMemberTable />}
              />

              <Route path="/directTeam" element={<DirectTeam />} />
              <Route path="/allTeams" element={<AllTeams />} />
              <Route path="/businessHistory" element={<BusinessHistory />} />
              <Route path="/accountStatement" element={<AccountStatement />} />

              <Route path="/incomeSummary" element={<IncomeSumm />} />
              <Route path="/powersummary" element={<Powersummary />} />

              <Route path="/rewardIcome" element={<RewardIcome />} />
              <Route path="/tradingProfit" element={<TradingProfit />} />
              <Route path="/tradingLevel" element={<TradingLevel />} />
              <Route path="/investment" element={<Investment />} />
              <Route
                path="/investmentHistory"
                element={<InvestmentHistory />}
              />
              <Route path="/walletAddress" element={<WalletAddress />} />
              <Route path="/directsell" element={<Directsellincome />} />
              <Route path="/walletHistory" element={<WalletHistory />} />
              <Route path="/withdrawalAmount" element={<WithdrawalAmount />} />
              <Route path="/withdrawalReport" element={<WithdrawalReport />} />
              <Route path="/reward" element={<Reward />} />
              <Route path="/support" element={<Support />} />
              <Route path="/exam" element={<Exam />} />
              <Route path="/turbo" element={<Turbo />} />
            </Route>
          </Routes>
        </>
      ) : (
        <>
          <HeaderMainPage />
          <Routes>
            <Route path="/about-us" element={<AboutUs />} />
          

            
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/terms-and-conditions" element={<TermsConditions />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/update-forgot-password"
              element={<UpdateForgotPassword />}
            />
            <Route path="/otp" element={<OTP />} />
          </Routes>
          <MainFooter />
        </>
      )}
    </BrowserRouter>
  );
};

export default App;
