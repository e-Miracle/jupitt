import React from "react";
import { ICountries } from "../../../utils";
import { getCountryFlag } from "../../../utils";
import Form from "../forms/fiat-form";

type Layout = {
  country: string;
  tier: "tier 1" | "tier 2" | "tier 3" | "ordinary";
};
const FiatFormLayout: React.FC<Layout> = ({ country, tier }) => {
  return (
    <div>
      <h3 className="mt-3 text-base lg:text-lg font-inter capitalize text-[#333333]">
        {tier} User
      </h3>
      <Form type="deposit" tier={tier} country={country} />
      <Form type="withdrawal" tier={tier} country={country} />
    </div>
  );
};

const Main: React.FC<ICountries> = ({ country }) => {
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
      <div className="w-auto mx-auto mt-5  capitalize text-xl lg:text-2xl font-inter font-semibold text-center flex items-center justify-center">
        Fiat Deposit & Withdraw
        {flag && (
          <img
            className="mx-2 w-[25px] h-[25px] rounded-full object-cover"
            src={flag}
            alt={flag}
          />
        )}
        {country}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1rem] mt-[1rem]">
        <FiatFormLayout tier="ordinary" country={country} />
        <FiatFormLayout tier="tier 1" country={country} />
        <FiatFormLayout tier="tier 2" country={country} />
        <FiatFormLayout tier="tier 3" country={country} />
      </div>
    </div>
  );
};

export default Main;
