import React from "react";
import Layout from "../layouts/crypto-withdrwa-form-layout";
import { useAppSelector } from "../../../store/hooks";
import { Spinner } from "@chakra-ui/react";
const Crypto = () => {
  const { active_countries, active_countries_loader } = useAppSelector(
    (state) => state.countries
  );
  const countries = React.useMemo(() => active_countries, [active_countries]);
  return (
    <div>
      {active_countries_loader && <Spinner />}
      {!active_countries_loader &&
        countries &&
        countries.length > 0 &&
        countries.map((item, index) => <Layout country={item.name} key={index} id={item.id} />)}
    </div>
  );
};

export default Crypto;
