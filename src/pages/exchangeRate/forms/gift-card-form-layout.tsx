import React from "react";
import { ICountries } from "../../../utils";
import { getCountryFlag } from "../../../utils";
import Form from "./gitft-card-form";

const GiftCardFormLayout: React.FC<ICountries> = ({ country }) => {
  const [flag, setFlag] = React.useState("");
  React.useEffect(() => {
    const init = async () => {
      const countryFlag = await getCountryFlag(country);
      if (countryFlag) setFlag(countryFlag);
    };
    init();
  }, [country]);
  return (
    <div>
      <div className="flex items-center justify-center mt-5">
        <div className="w-auto mx-auto flex items-center text-xl lg:text-2xl font-inter font-semibold capitalize">
          Gift Card Rate
          {flag && (
            <img
              className="ml-2 w-[25px] h-[25px] rounded-full object-cover"
              src={flag}
              alt={flag}
            />
          )}
          <span className="ml-2">{country}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1rem] mt-[1rem]">
        <Form type="buy" country={country} />
        <Form type="sell" country={country} />
      </div>
    </div>
  );
};

export default GiftCardFormLayout;
