import React from "react";
import { currentCountries } from "../../../constants/index";
import FormLayout from "../forms/perfect-money-rate-layout";
const PerfectRate = () => {
  const countries = React.useMemo(() => currentCountries, []);
  return (
    <div>
      <h2 className="text-center my-5 font-semibold text-xl lg:text-2xl font-inter">
        Perfect Money Rate
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[1rem] mt-[1rem]">
        {countries.map((item, index) => (
          <FormLayout country={item} key={index} />
        ))}
      </div>
    </div>
  );
};

export default PerfectRate;
