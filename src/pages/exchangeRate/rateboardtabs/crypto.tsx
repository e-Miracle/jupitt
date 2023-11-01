import { useMemo } from "react";
import Country from "../forms/country";
import { useAppSelector } from "../../../store/hooks";
import { Spinner } from "@chakra-ui/react";
const CryptoMania = () => {
  const { active_countries, active_countries_loader } = useAppSelector(
    (state) => state.countries
  );
  const countries = useMemo(
    () => active_countries,
    [active_countries]
  );
  return (
    <div>
      <h2 className="text-center my-5 font-semibold text-xl lg:text-2xl font-inter">
        Crypto Rate
      </h2>
      {active_countries_loader && <Spinner />}

      {!active_countries_loader &&
        countries &&
        countries.length > 0 &&
        countries.map((item, index) => <Country id={item.id} country={item.name.toLocaleLowerCase()} key={index} />)}
    </div>
  );
};

export default CryptoMania;
