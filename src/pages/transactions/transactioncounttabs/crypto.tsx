import React from "react";
import Tcard from "../../../components/tcard";
import { assetImages } from "../../../constants/index";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getCountCrypto } from "../../../store/reducers/transactions";
import { Spinner } from "@chakra-ui/react";
const Crypto = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getCountCrypto());
  }, [dispatch]);
  const { countCrypto, countCryptoLoading } = useAppSelector(
    (state) => state.transactions
  );

  const data = React.useMemo(
    () => countCrypto && countCrypto.length > 0 && countCrypto,
    [countCrypto]
  );
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-[1rem] mb-[2rem]">
      {countCryptoLoading && <Spinner />}

      {!countCryptoLoading &&
        data &&
        data.length > 0 &&
        data.map((item, index) => (
          <Tcard
            key={index}
            type={item._id.activity}
            coinName={item._id.asset}
            value={Number(item.count).toLocaleString()}
            img={assetImages[item._id.asset.toLowerCase()]}
          />
        ))}
    </div>
  );
};

export default Crypto;
