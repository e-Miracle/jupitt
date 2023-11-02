import { Suspense, lazy, useState, useMemo } from "react";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wallet } from "../assets";
import { useAppSelector } from "../store/hooks";
import CardLoader from "./card-loader";
const TransactionItem = lazy(() => import("./transaction-item"));
const Transactions = () => {
  const [popup, setPopup] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const toggle = () => setPopup((k) => !k);
 
  const { transactions, loading } = useAppSelector(
    (state) => state.transactions
  );
   const options =
     transactions &&
     transactions.length > 0 &&
     Array.from(new Set(transactions.map((item) => item.activity)));
   const filter = (item: string) => {
     setFilterValue(item);
   };
  const filteredTransactions = useMemo(() => {
    if (transactions && transactions.length > 0) {
      if (filterValue) {
        const filteredArr = transactions.filter((transaction) => {
          return (
            transaction.activity.toLowerCase() === filterValue.toLowerCase()
          );
        });
        return filteredArr;
      }

      return transactions;
    }
  }, [transactions, filterValue]);
  return (
    <Suspense>
      {loading && <CardLoader />}
      {!loading && filteredTransactions && filteredTransactions.length > 0 && (
        <div className="bg-white rounded-lg p-5 font-poppins  cursor-pointer">
          <div className="flex flex-wrap items-center justify-between relative">
            <h3 className="capitalize text-base lg:text-lg font-semibold">
              {" "}
              transactions
            </h3>
            <button onClick={toggle}>
              <FontAwesomeIcon
                className="text-2xl text-coincard"
                icon={faEllipsisH}
              />
            </button>

            {popup && (
              <div className="w-[5rem] absolute right-0 top-[1.5rem] bg-white rounded-lg p-2 shadow-lg">
                {options &&
                  options.length > 0 && options.map((opt) => (
                    <button
                      onClick={() => {
                        filter(opt);
                        toggle();
                      }}
                      key={`index-${opt}`}
                      className=" w-full text-left text-xs text-coincard capitalize hover:opacity-90 hover:text-secondary "
                    >
                      {opt}
                    </button>
                  ))}
              </div>
            )}
          </div>
          <div className="mt-5">
            {filteredTransactions.slice(0, 21).map((item) => (
              <TransactionItem
                key={item.id}
                image={Wallet}
                coinName={item.asset}
                action={item.activity.toLowerCase()}
                amount={Number(item.amount)}
                balance={Number(90510).toLocaleString()}
              />
            ))}
          </div>

          {/* <TransactionItem
              image={Wallet}
              coinName="Bitcoin"
              action="sell"
              amount={0.84756}
              balance={Number(90510).toLocaleString()}
            />
            <TransactionItem
              image={Wallet}
              coinName="Bitcoin"
              action="swap"
              amount={0.84756}
              balance={Number(90510).toLocaleString()}
            /> */}
        </div>
      )}
    </Suspense>
  );
};

export default Transactions;
