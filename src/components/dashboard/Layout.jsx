import React, { useEffect, useMemo, useState } from "react";
import {
  Activity,
  Check,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Settings,
  Settings2,
  Verified,
  X,
} from "lucide-react";
import { TiGroup } from "react-icons/ti";
import { VscDebugStepOut } from "react-icons/vsc";
import { SiTrustpilot } from "react-icons/si";
import { Link } from "react-router-dom";
import profile from "../../assets/images/defaultProfile.png";
import logo from "../../assets/logo/dowin.png";
import { useDispatch, useSelector } from "react-redux";
import { setPageTheme, setSidebarTheme } from "../../Redux/DoWinSlice";
import { getDynamicStyles, getTheme } from "./GlobalApi/Global";
const Layout = ({ children }) => {
  const ApiAllData = useSelector((state) => state.doWin.ApiAllData);
  const isexamShow = ApiAllData?.data?.referred_users ?? 0;
  const isShowExamConditin = ApiAllData?.data?.partner_referral_required ?? 0;
  const Is_Top_Approved = ApiAllData?.data?.is_top_approved === 0;
  // const isShowPartnerTab =
  //   ApiAllData?.data?.is_partner === 1 || Is_Top_Approved === 2 ? true : false;
  const isShowPartnerTab = ApiAllData?.data?.is_partner === 1 ? true : false;
  const userName = ApiAllData?.data?.user_name || "user";
  const useremail = ApiAllData?.data?.user_email || "user@gmail.com";
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const toggleSubmenu = (label) => {
    setOpenSubmenu((prevOpen) => (prevOpen === label ? null : label));
  };
  const navItems = [
    {
      href: "/",
      icon: <Settings2 className="w-5 h-5 " />,
      label: "Setting",

      submenu: [
        { href: "/profile", label: "Profile" },
        { href: "/bankkyc", label: "Bank KYC" },
      ],
    },
    {
      href: "/",
      icon: <VscDebugStepOut className="w-5 h-5 " />,
      label: "Level",
      submenu: [
        { href: "/level", label: "User Level" },
        { href: "/UserrefarrelTable", label: "My Sponsor " },
        { href: "/sponsorTeam", label: "My Sponsor Team" },
      ],
    },
    // {
    //   href: "/",
    //   icon: <TiGroup className="w-5 h-5 " />,
    //   label: "Partner",
    //   submenu: [
    //     { href: "/partnerLevel", label: "Partner Level" },
    //     { href: "/PartnerRefarralTable", label: "My Partners" },
    //     { href: "/partnerTeam", label: "My Partners Team" },
    //     { href: "/partnermember", label: "My Partners Members" },
    //   ],
    // },
    ...(isShowPartnerTab
      ? [
          {
            href: "/",
            icon: <TiGroup className="w-5 h-5" />,
            label: "Partner",
            submenu: [
              { href: "/partnerLevel", label: "Partner Level" },
              { href: "/PartnerRefarralTable", label: "My Partners" },
              { href: "/partnerTeam", label: "My Partners Team" },
              { href: "/partnermember", label: "My Partners Members" },
            ],
          },
        ]
      : []),

    {
      href: "/",
      icon: <Activity className="w-5 h-5" />,
      label: "Financial",
      submenu: [
        { href: "/withdrawalAmount", label: "Withdrawal Amount (INR)" },
        { href: "/withdrawalReport", label: "Withdrawal Report" },
        { href: "/accountStatement", label: "Account Statement" },
        { href: "/incomeSummary", label: "Income Summary" },
        { href: "/powersummary", label: "Power Summary" },
      ],
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const dispatch = useDispatch();
  const SidebarTheme = useSelector((state) => state.doWin.SidebarTheme);
  const Theme = useSelector((state) => state.doWin.Theme);
  const ThemeMode = Theme.mode;
  //-------------
  const SetSidebarthem = (color) => {
    if (
      color === "#fff" ||
      color === "#ffbf36" ||
      color === "#54cfc5" ||
      color === "#04c89a"
    ) {
      dispatch(setSidebarTheme({ background: color, textcolor: "#000" }));
    } else {
      dispatch(setSidebarTheme({ background: color, textcolor: "#fff" }));
    }
  };
  //------------------
  const Setpagethem = (color) => {
    if (color === "#fff") {
      dispatch(setPageTheme({ background: color, textcolor: "#000" }));
    } else {
      dispatch(setPageTheme({ background: color, textcolor: "#fff" }));
    }
  };
  //------------------------
  const PageTheme = useSelector((state) => state.doWin.PageTheme);

  const dynamicStyles = useMemo(() => {
    return getDynamicStyles(PageTheme || Theme);
  }, [PageTheme]);

  const Them = (mode) => {
    getTheme(mode, dispatch);
    dispatch(setSidebarTheme({ background: "", textcolor: "" }));
    dispatch(setPageTheme({ background: "", textcolor: "" }));
  };
  const colorNames = [
    "#fff",
    "#347928",
    "#54cfc5",
    "#FF76CE",
    "#df3545",
    "#ff7c29",
    "#ffbf36",
    "#04c89a",
    "#00a3b7",
    "#95628c",
    "#343a40",
    "#2a2a2a",
    "#3e89e8",
    "#4ab13f",
    "#f44336",
    "#c2185b",
  ];
  const colorMappings = {
    "#fff": "rgb(84 93 102)",
    "#347928": "rgb(52 139 37)",
    "#54cfc5": "rgb(16 191 177)",
    "#FF76CE": "rgb(252 95 196)",
    "#df3545": "rgb(255 85 100 / 96%)",
    "#ff7c29": "rgb(233 94 5)",
    "#ffbf36": "rgb(224 157 14)",
    "#04c89a": "rgb(6 182 141)",
    "#00a3b7": "rgb(13 190 211)",
    "#95628c": "rgb(180 132 172)",
    "#343a40": "rgb(84 93 102)",
    "#2a2a2a": "rgb(84 93 102)",
    "#3e89e8": "rgb(26 79 133 / 38%)",
    "#4ab13f": "rgb(15 158 0)",
    "#f44336": "rgb(222 41 28)",
    "#c2185b": "rgb(199 74 123 / 91%)",
  };
  const [sidebarNavBg, setSidebarNavBg] = useState("");
  useEffect(() => {
    setSidebarNavBg(colorMappings[SidebarTheme.background] || "");
  }, [SidebarTheme]);

  // -----------
  const DefaultTheme = () => {
    getTheme("Light", dispatch);
    dispatch(setSidebarTheme({ background: "", textcolor: "" }));
    dispatch(setPageTheme({ background: "", textcolor: "" }));
  };
  const IMGURI = process.env.REACT_APP_IMG_URI;
  const img = ApiAllData?.data?.selfie || "";
  const userProImage = img?.startsWith("/uploads")
    ? `${IMGURI}${img}`
    : profile;
  const closeOpenSubmenu = () => {
    setOpenSubmenu(null);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
    closeOpenSubmenu();
  };

  const hoverColor = sidebarNavBg ? sidebarNavBg : "#4d33f8";
  return (
    <div className="flex h-screen bg-gray-50 ">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <aside
        style={{
          backgroundColor: SidebarTheme.background || Theme.background,
          borderColor: SidebarTheme.background || Theme.bordercolor,
          color: SidebarTheme.textcolor || Theme.textcolor,
        }}
        className={` fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r  transform transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 flex flex-col `}
        onClick={closeModal}
      >
        <div
          className="p-4 flex items-center justify-between"
          style={{
            backgroundColor: SidebarTheme.background || Theme.background,
            borderColor: SidebarTheme.background || Theme.bordercolor,
            color: SidebarTheme.textcolor || Theme.textcolor,
          }}
        >
          <div className="flex items-center gap-2">
            <img src={logo} className="w-16" alt="user image" />
            <span className="font-semibold text-xl capitalize">Exowa</span>
          </div>
          <button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X
              className="h-4 w-4"
              style={{
                color: SidebarTheme.textcolor || Theme.textcolor,
              }}
            />
          </button>
        </div>

        <nav
          className="flex-1 p-4 overflow-auto"
          style={{
            backgroundColor: SidebarTheme.background || Theme.background,
            color: SidebarTheme.textcolor || Theme.textcolor,
          }}
        >
          <div className="space-y-1">
            <NavItem
              href="/"
              icon={<LayoutDashboard className="w-5 h-5" />}
              label="Dashboard"
              active
              mode={sidebarNavBg}
              onClick={closeSidebar}
            />

            {navItems?.map((item, index) => (
              <NavItem
                key={index}
                {...item}
                mode={sidebarNavBg}
                isOpen={openSubmenu === item.label}
                toggleSubmenu={() => toggleSubmenu(item.label)}
                onClick={closeSidebar}
              />
            ))}
          </div>
          <Link
            to="/turbo"
            className={`mybtn flex items-center gap-2 w-full px-2 py-2 rounded-lg text-sm ${`text-gray-700 hover:text-white hover:bg-[${hoverColor}]`}`}
            style={{
              "--hover-color": hoverColor,
            }}
            onClick={closeSidebar}
          >
            <SiTrustpilot className="w-5 h-5" />
            Turbo
          </Link>
          {isexamShow >= isShowExamConditin && Is_Top_Approved && (
            <div className="mt-8 space-y-1">
              <div
                className="text-sm px-2 py-2"
                style={{
                  color: SidebarTheme.textcolor || Theme.textcolor,
                }}
              >
                RECORDS
              </div>

              <Link
                to="/exam"
                className={`mybtn flex items-center gap-2 w-full px-2 py-2 rounded-lg text-sm ${`text-gray-700 hover:text-white hover:bg-[${hoverColor}]`}`}
                style={{
                  "--hover-color": hoverColor,
                }}
                onClick={closeSidebar}
              >
                <Verified className="w-5 h-5" />
                Exam
              </Link>
            </div>
          )}
        </nav>
        <div className="p-4 border-t border-[#f2f0ff]">
          <div className="flex items-center gap-3">
            <img
              src={userProImage}
              className="rounded-full w-10 h-10"
              alt="user image"
            />
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{userName}</div>
              <div className="text-xs  truncate">{useremail}</div>
            </div>
          </div>
        </div>
      </aside>
      <main
        className="flex-1 flex flex-col min-w-0"
        style={{
          backgroundColor: Theme.background,
          borderColor: Theme.background,
          color: Theme.textcolor,
        }}
      >
        <button
          variant="ghost"
          size="icon"
          className="absolute top-6 left-4 md:hidden"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu
            className="h-4 w-4"
            style={{
              color: Theme.textcolor,
            }}
          />
        </button>
        {children}
        {/* ----------------------------- */}
        <div className="absolute top-[40%] bottom-0 sm:right-8 right-4 flex items-center justify-center  w-fit h-fit">
          <button
            className="bg-[#4d33f8] rounded-full p-2"
            style={dynamicStyles}
            onClick={openModal}
          >
            <Settings
              className="animate-spin text-white "
              style={dynamicStyles}
            />
          </button>
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-10 overflow-y-auto"
            style={{ zIndex: 999 }}
          >
            <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
              <div
                className="fixed inset-0 transition-opacity"
                aria-hidden="true"
              >
                <div className="absolute inset-0 bg-gray-950 opacity-80"></div>
              </div>
              <span
                className="hidden sm:inline-block sm:h-screen sm:align-middle"
                aria-hidden="true"
              >
                &#8203;
              </span>
              <div className="inline-block relative transform overflow-hidden rounded-3xl bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[34rem] sm:align-middle">
                <div className="absolute top-3 right-0">
                  <button
                    type="button"
                    className="flex items-center justify-center rounded-full border border-transparent px-4 py-2 text-base font-medium text-[#4d33f8] shadow-sm"
                    onClick={closeModal}
                  >
                    <X
                      className="w-6 h-6"
                      style={{
                        color: Theme.textcolor,
                      }}
                    />
                  </button>
                </div>
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
                        Theme
                      </h3>
                      <div className="my-4">
                        <div className="mb-5">
                          <h6 className="text-gray-700 mb-3">
                            Background Theme
                          </h6>
                          <select
                            className="w-full rounded-lg border border-gray-400 px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none font-normal"
                            onChange={(e) => Them(e.target.value)}
                            value={ThemeMode}
                          >
                            <option value="light">Light</option>
                            <option value="dark">Dark</option>
                          </select>
                        </div>
                        <div className="mb-5">
                          <h6 className="text-gray-700 mb-3">Primary Color</h6>
                          <div className="flex flex-wrap items-center gap-2">
                            {colorNames
                              .filter(
                                (color) =>
                                  !(color === "#fff" && ThemeMode !== "dark")
                              )
                              .map((color, index) => (
                                <button
                                  key={index}
                                  style={{
                                    backgroundColor: color,
                                    position: "relative",
                                  }}
                                  onClick={() => Setpagethem(color)}
                                  className="size-10 rounded-md transition-all flex items-center justify-center"
                                >
                                  {dynamicStyles.background === color && (
                                    <Check
                                      className="size-6 absolute font-bold"
                                      style={{
                                        color:
                                          dynamicStyles.background === "#fff"
                                            ? "#000"
                                            : "#fff",
                                      }}
                                    />
                                  )}
                                </button>
                              ))}
                          </div>
                        </div>
                        <div className="mb-5">
                          <h6 className="text-gray-700 mb-3">Sidebar Color</h6>
                          <div className="flex flex-wrap items-center gap-2">
                            {colorNames.map((color, index) => (
                              <button
                                key={index}
                                aria-label={`Set theme color to ${color}`}
                                style={{
                                  backgroundColor: color,
                                  position: "relative",
                                }}
                                onClick={() => SetSidebarthem(color)}
                                className="size-10 rounded-md transition-all flex items-center justify-center"
                              >
                                {SidebarTheme?.background === color && (
                                  <Check
                                    className={`size-6 absolute font-bold ${
                                      SidebarTheme.background === "#fff"
                                        ? "text-black"
                                        : "text-white"
                                    }`}
                                  />
                                )}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end pt-2">
                          <button
                            className="px-5  w-full text-center flex items-center justify-center gap-3 bg-[#4d33f8] rounded-lg text-white h-[48px] ease-in duration-[0.4s] hover:scale-[0.9]"
                            style={dynamicStyles}
                            onClick={DefaultTheme}
                          >
                            Default Theme
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Layout;

function NavItem({
  href,
  icon,
  label,
  badge,
  submenu,
  isOpen,
  toggleSubmenu,
  active,
  mode,
  onClick,
}) {
  if (submenu) {
    const hoverColor = mode ? mode : "#4d33f8";
    return (
      <div className="space-y-1">
        <button
          onClick={submenu ? toggleSubmenu : undefined}
          className={`mybtn flex items-center gap-2 w-full px-2 py-2 rounded-lg text-sm ${
            isOpen
              ? `text-white bg-[${hoverColor}] font-medium`
              : `text-gray-700 hover:text-white hover:bg-[${hoverColor}]`
          }`}
          style={{
            "--hover-color": hoverColor,
            backgroundColor: isOpen ? hoverColor : undefined,
          }}
        >
          {icon}
          <span className="flex-1 text-left">{label}</span>
          {badge && (
            <span className="bg-indigo-100 text-[#4d33f8] px-2 py-0.5 rounded-full text-xs">
              {badge}
            </span>
          )}
          {submenu &&
            (isOpen ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            ))}
        </button>
        {submenu && (
          <div
            className={`pl-3 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {submenu.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`mybtn flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-gray-700 hover:text-white`}
                style={{
                  "--hover-color": hoverColor,
                }}
                onClick={(e) => {
                  if (toggleSubmenu) toggleSubmenu();
                  if (onClick) onClick(e);
                }}
              >
                <span className="flex-1">{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  }
  const hoverColor = mode ? mode : "#4d33f8";
  return (
    <Link
      to={href}
      className={`mybtn flex items-center gap-2 px-2 py-2 rounded-lg text-sm ${
        active
          ? `text-white bg-[${hoverColor}] font-medium`
          : `text-gray-700 hover:text-white hover:bg-[${hoverColor}]`
      }`}
      style={{
        backgroundColor: active ? hoverColor : undefined,
      }}
      onClick={onClick}
    >
      {icon}
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full text-xs">
          {badge}
        </span>
      )}
    </Link>
  );
}
