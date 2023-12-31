import React from "react";
import { INewCountries } from "../../../utils";
import { getCountryFlag } from "../../../utils";
import Form from "../forms/virtual-form";
const VirtualFormLayout: React.FC<INewCountries> = ({ country, id }) => {
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
        Virtual Card Spending
        {flag && (
          <img
            className="mx-2 w-[25px] h-[25px] rounded-full object-cover"
            src={flag}
            alt={flag}
          />
        )}
        <h2 className=" ">{country}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1rem] mt-[1rem]">
        <Form type="ordinary" id={id} />
        <Form type="Tier 1" id={id} />
        <Form type="Tier 2" id={id} />
        <Form type="Tier 3" id={id} />
      </div>
    </div>
  );
};

export default VirtualFormLayout;
