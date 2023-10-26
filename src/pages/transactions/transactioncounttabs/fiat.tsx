import React from "react";
import { currentCountries } from "../../../constants/index";
import { getCountryFlag } from "../../../utils";
import Tcard from "../../../components/tcard";
type Props = {
  name: string;
};
const Layout: React.FC<Props> = ({ name }) => {
  const [flag, setFlag] = React.useState("");
  React.useEffect(() => {
    const init = async () => {
      const countryFlag = await getCountryFlag(name);
      if (countryFlag) setFlag(countryFlag);
    };
    init();
  }, [name]);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1rem] mb-[2rem] ">
      <Tcard
        type="deposit"
        coinName={name}
        value={Number(10405).toLocaleString()}
        img={flag}
      />
      <Tcard
        type="withdraw"
        coinName={name}
        value={Number(10405).toLocaleString()}
        img={flag}
      />
    </div>
  );
};
const Fiat = () => {
  const countries = React.useMemo(() => currentCountries, []);
  return (
    <div className="lg:w-[50%] lg:mx-auto">
      {countries.map((item, index) => (
        <Layout name={item} key={index} />
      ))}
    </div>
  );
};

export default Fiat;
