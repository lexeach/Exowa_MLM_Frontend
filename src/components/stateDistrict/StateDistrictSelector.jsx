// import React, { useState } from "react";
// import indiaStatesDistricts from "./StateDistrict.json";

// const StateDistrictSelector = () => {
//   const [selectedState, setSelectedState] = useState("");
//   const [districts, setDistricts] = useState([]);
//   const [selectedDistrict, setSelectedDistrict] = useState("");

//   const handleStateChange = (e) => {
//     const state = e.target.value;
//     setSelectedState(state);
//     setDistricts(indiaStatesDistricts[state] || []);
//     setSelectedDistrict(""); // reset district
//   };

//   const handleDistrictChange = (e) => {
//     setSelectedDistrict(e.target.value);
//   };

//   return (
//     <div className="flex justify-start items-center flex-wrap gap-5 w-full">
//       <div>
//         <label className="block  ">Select State:</label>
//         <select
//           value={selectedState}
//           onChange={handleStateChange}
//           className="w-full p-2 border rounded mt-3"
//         >
//           <option value="">-- Select State --</option>
//           {Object.keys(indiaStatesDistricts)?.map((state) => (
//             <option key={state} value={state}>
//               {state}
//             </option>
//           ))}
//         </select>
//       </div>
//       <div>
//         <label className="block">Select District:</label>
//         <select
//           value={selectedDistrict}
//           onChange={handleDistrictChange}
//           className="w-full p-2 border rounded mt-3"
//           disabled={!selectedState}
//         >
//           <option value="">-- Select District --</option>
//           {districts?.map((district) => (
//             <option key={district} value={district}>
//               {district}
//             </option>
//           ))}
//         </select>
//       </div>
//     </div>
//   );
// };

// export default StateDistrictSelector;
import React, { useMemo } from "react";
import indiaStatesDistricts from "./StateDistrict.json";
import { useSelector } from "react-redux";
import { getDynamicStyles, getdynamicStylesInput } from "../dashboard/GlobalApi/Global";

const StateDistrictSelector = ({ state, district, setProfileData }) => {
    const PageTheme = useSelector((state) => state.doWin.PageTheme);
    const Theme = useSelector((state) => state.doWin.Theme);
    const dynamicStylesInput = useMemo(() => {
      return getdynamicStylesInput(Theme);
    }, [Theme, PageTheme]);
    const dynamicStyles = useMemo(() => {
      return getDynamicStyles(PageTheme || Theme);
    }, [PageTheme, Theme]);
  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setProfileData((prev) => ({
      ...prev,
      state: selectedState,
      district: "", // reset district when state changes
    }));
  };

  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setProfileData((prev) => ({
      ...prev,
      district: selectedDistrict,
    }));
  };

  const districts = indiaStatesDistricts[state] || [];

  return (
    <div className="flex justify-start items-center flex-wrap gap-5 w-full">
      <div>
        <label className="block"     style={{ color: Theme.textcolor }}>Select State:</label>
        <select
          value={state}
          onChange={handleStateChange}
          className="w-full p-2 border rounded mt-3"
          style={dynamicStylesInput}
        >
          <option value=""     style={{ color: Theme.textcolor }}>-- Select State --</option>
          {Object.keys(indiaStatesDistricts)?.map((stateName) => (
            <option key={stateName} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="block"     style={{ color: Theme.textcolor }}>Select District:</label>
        <select
          value={district}
          onChange={handleDistrictChange}
          className="w-full p-2 border rounded mt-3"
          disabled={!state}
          style={dynamicStylesInput}
        >
          <option value=""     style={{ color: Theme.textcolor }}>-- Select District --</option>
          {districts?.map((districtName) => (
            <option key={districtName} value={districtName}>
              {districtName}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StateDistrictSelector;

