import React from 'react'
import FormLayout from "../forms/card-rate-form-layout";
import { currentCountries } from "../../../constants/index";
const VirtualBoard = () => {
   const countries = React.useMemo(() => currentCountries, []);
  return (
    <div>
      <h2 className="text-center text-[#101828]  my-5 font-semibold text-xl lg:text-2xl font-inter">
        Virtual Card Rate
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[1rem] mt-[1rem]">
        {countries.map((item, index) => (
          <FormLayout country={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default VirtualBoard;
