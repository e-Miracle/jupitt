import React from "react";
import { INewCountries } from "../../../utils/types";
import Form from "./perfect-money-rate-form";
import { getCountryFlag } from "../../../utils";

const FormLayout: React.FC<INewCountries> = ({ country, id }) => {
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
      <Form type="buy" id={id} />
      <Form type="sell" id={id} />
    </div>
  );
};


export default FormLayout;
