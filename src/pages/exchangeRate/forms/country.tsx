import React from "react";
import { getCountryFlag } from "../../../utils";
import { currentCoins } from "../../../constants";
import Form from "./form";
import { ICountries, IFormLayout } from "../../../utils";

const FormLayout: React.FC<IFormLayout> = ({ coinName, country }) => {
  return (
    <div>
      <h2 className=" font-inter text-base lg:text-lg uppercase">{coinName}</h2>
      <Form type="buy" coinName={coinName} country={country} />
      <Form type="sell" coinName={coinName} country={country} />
    </div>
  );
};
const Country: React.FC<ICountries> = ({ country }) => {
  const coins = React.useMemo(() => currentCoins, []);
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] mt-[1rem]">
        {coins.map((item, value) => (
          <FormLayout key={value} coinName={item} country={country} />
        ))}
      </div>
    </div>
  );
};

export default Country;
