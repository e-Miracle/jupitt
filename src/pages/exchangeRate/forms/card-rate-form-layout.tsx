import React from "react";
import { ICountries } from "../../../utils/types";
import Form from "./card-rate-form";
import { getCountryFlag } from "../../../utils";

const CardRateFormLayout: React.FC<ICountries> = ({ country }) => {
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
      <div className="w-auto mx-auto flex items-center ">
        {flag && (
          <img
            className="w-[25px] h-[25px] rounded-full object-cover"
            src={flag}
            alt={flag}
          />
        )}
        <h2 className="ml-2 capitalize text-xl lg:text-2xl font-inter font-semibold">
          {country}
        </h2>
      </div>
      <Form type="funding" country={country} />
      <Form type="withdrawal" country={country} />
      <Form type="spending" country={country} />
    </div>
  );
};

export default CardRateFormLayout;
