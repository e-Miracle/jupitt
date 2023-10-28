import { Suspense, lazy, useState } from "react";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Wallet } from "../assets";
const TransactionItem = lazy(() => import("./transaction-item"));
const Transactions = () => {
  const [popup, setPopup] = useState(false);
  const toggle = () => setPopup((k) => !k);
  const options = ["sell", "buy", "swap"];
  const filter = (item: string) => {
    console.log(item);
  };
  return (
    <Suspense>
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
              {options.map((opt) => (
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
          <TransactionItem
            image={Wallet}
            coinName="Bitcoin"
            action="buy"
            amount={0.84756}
            balance={Number(90510).toLocaleString()}
          />

          <TransactionItem
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
          />
        </div>
      </div>
    </Suspense>
  );
};

export default Transactions;
