import React from 'react'
import Formlayout from "../forms/gift-card-form-layout";
import { currentCountries } from "../../../constants/index";
const RateBoardGiftcard = () => {
   const countries = React.useMemo(() => currentCountries, []);
  return (
    <div>
      <h2 className="text-center my-5 font-semibold text-xl lg:text-2xl font-inter">
        Crypto Rate
      </h2>
      {countries.map((item, index) => (
        <Formlayout country={item} key={index} />
      ))}
    </div>
  );
}

export default RateBoardGiftcard;
