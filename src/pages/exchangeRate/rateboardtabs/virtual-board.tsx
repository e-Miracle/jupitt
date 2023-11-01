import React from "react";
import FormLayout from "../forms/card-rate-form-layout";
import { useAppSelector } from "../../../store/hooks";
import { Spinner } from "@chakra-ui/react";
const VirtualBoard = () => {
  const { active_countries, active_countries_loader } = useAppSelector(
    (state) => state.countries
  );
  const countries = React.useMemo(
    () => active_countries && active_countries.length > 0 && active_countries,
    [active_countries]
  );
  return (
    <div>
      <h2 className="text-center text-[#101828]  my-5 font-semibold text-xl lg:text-2xl font-inter">
        Virtual Card Rate
      </h2>
      {active_countries_loader && <Spinner />}
      {!active_countries_loader && countries && countries.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-[1rem] mt-[1rem]">
          {countries.map((item, index) => (
            <FormLayout country={item.name} id={item.id} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VirtualBoard;
