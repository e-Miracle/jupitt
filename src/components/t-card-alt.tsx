import React from "react";
import { getCountryFlag } from "../utils";
type Props = {
  country: string;
  currency: string;
  value: string;
};
const TCardAlt: React.FC<Props> = ({ country, currency, value }) => {
  const [flag, setFlag] = React.useState("");
  React.useEffect(() => {
    const init = async () => {
      const countryFlag = await getCountryFlag(country);
      if (countryFlag) setFlag(countryFlag);
    };
    init();
  }, [country]);
  return (
    <div className="bg-[#F1F1F1] rounded-[12px] p-5  font-poppins">
      <div className="w-auto mx-auto flex items-center ">
        {flag && (
          <img
            className="w-[20px] h-[20px] rounded-full object-cover"
            src={flag}
            alt={flag}
          />
        )}
        <h2 className="ml-2 capitalize text-xs lg:text-sm font-inter font-semibold">
          {currency}
        </h2>
      </div>
      <h4 className="mt-5 mb-3 uppercase text-xs lg:text-sm font-medium tracking-widest text-[#666666]">
        AVAILABLE BALANCE
      </h4>
      <h2 className="text-xl lg:text-2xl font-semibold">{value}</h2>
    </div>
  );
};

export default TCardAlt;
