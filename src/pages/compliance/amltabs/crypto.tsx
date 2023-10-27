import React from "react";
import { currentCountries } from "../../../constants";
import Layout from "../layouts/crypto-withdrwa-form-layout";
const Crypto = () => {
  const countries = React.useMemo(() => currentCountries, []);
  return (
    <div>
      {countries.map((item, index) => (
        <Layout country={item} key={index} />
      ))}
    </div>
  );
};

export default Crypto;
