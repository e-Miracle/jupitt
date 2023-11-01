import React from "react";
import { useAppSelector } from "../../../store/hooks";
import SwapFormLayout from "../forms/swap-form-layout";
import { Spinner } from "@chakra-ui/react";

const Swap = () => {
  const { active_countries, active_countries_loader } = useAppSelector(
    (state) => state.countries
  );
  const countries = React.useMemo(() => active_countries, [active_countries]);
  return (
    <div>
      <h2 className="text-center my-5 font-semibold text-xl lg:text-2xl font-inter">
        Crypto Swap Rate
      </h2>
      {active_countries_loader && <Spinner />}
      {!active_countries_loader && countries && countries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[1rem] mt-[1rem]">
          {countries.map((item, index) => (
            <SwapFormLayout country={item.name} id={item.id} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Swap;
