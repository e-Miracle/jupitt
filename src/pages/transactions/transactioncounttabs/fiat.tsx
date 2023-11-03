import React from "react";
import { ICountFiat, getCountryFlag } from "../../../utils";
import Tcard from "../../../components/tcard";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getCountFiat } from "../../../store/reducers/transactions";
import { Spinner } from "@chakra-ui/react";
type Props = {
  name: string;
  data: ICountFiat[];
};
const Layout: React.FC<Props> = ({ name, data }) => {
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
      {data.map((item) => (
        <Tcard
          key={item._id.currency}
          type={item._id.activity}
          coinName={item._id.currency}
          value={Number(item.count).toLocaleString()}
          img={flag}
        />
      ))}
    </div>
  );
};
const Fiat = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getCountFiat());
  }, [dispatch]);
  const { countFiat, countFiatLoading } = useAppSelector(
    (state) => state.transactions
  );

  const data = React.useMemo(
    () => countFiat && countFiat.length > 0 && countFiat,
    [countFiat]
  );
  return (
    <div className="lg:w-[50%] lg:mx-auto">
      {countFiatLoading && <Spinner />}
      {!countFiatLoading && data && data.length > 0 && (
        <Layout name={"nigeria"} data={data} />
      )}
    </div>
  );
};

export default Fiat;
