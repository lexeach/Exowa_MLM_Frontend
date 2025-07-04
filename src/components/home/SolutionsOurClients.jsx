import { CheckCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const SolutionsOurClients = () => {
  const tiers = [
    {
      name: "Garnet",
      level: "Entry level",
      icon: require("../../assets/images/Garnet.png"),
      investment: "$ 100-499",
      profit: "15%",
      color: "from-amber-400 to-amber-300",
    },
    {
      name: "Sapphire",
      level: "Mid tier",
      icon: require("../../assets/images/Sapphire.png"),
      investment: "$ 100-499",
      profit: "15%",
      color: "from-blue-400 to-blue-300",
    },
    {
      name: "Ruby",
      level: "Premium",
      icon: require("../../assets/images/Ruby.png"),
      investment: "$ 100-499",
      profit: "15%",
      color: "from-green-400 to-green-300",
    },
    {
      name: "Diamond",
      level: "Elite",
      icon: require("../../assets/images/Diamond.png"),
      investment: "$ 2000+",
      profit: "50%",
      color: "from-rose-400 to-rose-300",
    },
  ];
  const naviget = useNavigate();
  const handleGoAcc = () => {
    naviget("/registration");
  };
  return (
    <div className="bg-[#0B0126] lg:py-36">
      <div className="container max-w-7xl m-auto px-4 sm:px-0">
        <div className="pb-12">
          <h2 className="text-5xl font-bold pb-8 text-white text-center">
            The Best Solutions for Our Clients
          </h2>
          <p className="text-white text-center font-normal">
            Explore our flexible pricing plans designed to provide the best
            value and <br /> tailored solutions for every trader's needs.
          </p>
        </div>
        <div className="lg:p-10">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className="rounded-2xl border border-[#534775] p-6 shadow-xl transition-transform duration-300 ease-in-out hover:-translate-y-2 cursor-pointer"
              >
                <div className="mb-6 flex flex-col items-center space-y-2">
                  <div>
                    <img
                      src={tier.icon}
                      className="w-[50px] object-cover m-auto"
                      alt=""
                    />
                  </div>
                  <h3 className="text-xl font-medium text-white">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-gray-400">{tier.level}</p>
                </div>
                <div className="w-full h-[1px] bg-[#534775] my-3" />
                <div className="mb-6">
                  <p className="text-center text-gray-400">Investment</p>
                  <p className="text-center text-2xl font-bold text-white">
                    {tier.investment}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <CheckCircle className="text-white w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-300">
                      Profit: Up to {tier.profit}/month
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-[#534775]/20 my-2" />
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <CheckCircle className="text-white w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-300">24x5 Support</p>
                  </div>
                  <div className="w-full h-[1px] bg-[#534775]/20 my-2" />
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <CheckCircle className="text-white w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-300">Live Trading on MT5</p>
                  </div>
                  <div className="w-full h-[1px] bg-[#534775]/20 my-2" />
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <CheckCircle className="text-white w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-300">
                      Instant Deposit & Withdrawal
                    </p>
                  </div>
                  <div className="w-full h-[1px] bg-[#534775]/20 my-2" />
                  <div className="flex items-center space-x-3">
                    <div className="">
                      <CheckCircle className="text-white w-5 h-5" />
                    </div>
                    <p className="text-sm text-gray-300">
                      Multiple Income types
                    </p>
                  </div>
                </div>

                <button
                  className="mt-6 w-full rounded-lg bg-[#541AFF] py-3 text-sm font-medium text-white hover:bg-indigo-700"
                  onClick={handleGoAcc}
                >
                  Open Account
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolutionsOurClients;
