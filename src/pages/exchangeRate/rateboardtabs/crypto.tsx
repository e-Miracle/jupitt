import { useMemo } from "react";
import Country from "../forms/country";
import { currentCountries } from "../../../constants/index";

const CryptoMania = () => {
  const countries = useMemo(() => currentCountries, []);
  return (
    <div>
      <h2 className="text-center my-5 font-semibold text-xl lg:text-2xl font-inter">
        Crypto Rate
      </h2>
      {countries.map((item, index) => (
        <Country country={item} key={index} />
      ))}
    </div>
  );
};

export default CryptoMania;
