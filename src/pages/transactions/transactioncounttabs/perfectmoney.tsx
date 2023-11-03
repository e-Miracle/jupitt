import React from "react";
import Tcard from "../../../components/tcard";
import { useAppSelector, useAppDispatch } from "../../../store/hooks";
import { getCountPerfectMoney } from "../../../store/reducers/transactions";
import { Spinner } from "@chakra-ui/react";
const PerfectMoney = () => {
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getCountPerfectMoney());
  }, [dispatch]);
  const { countPm, countPmLoading } = useAppSelector(
    (state) => state.transactions
  );

  const data = React.useMemo(
    () => countPm && countPm.length > 0 && countPm,
    [countPm]
  );
  return (
    <div className="lg:w-[50%] lg:mx-auto">
      {countPmLoading && <Spinner />}
      {!countPmLoading && data && data.length && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[1rem] mb-[2rem] ">
          {data.map((item) => (
            <Tcard
              key={item.count}
              type={item._id.activity}
              coinName={"perfect money"}
              value={Number(item.count).toLocaleString()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PerfectMoney;
