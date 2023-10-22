import { Suspense } from "react";

type Props = {
  image: string;
  coinName: string;
  action: "sell" | "buy" | "swap";
  amount: number;
  balance: string;
};

const color = {
  sell: "#1FCB4F",
  buy: "#EB5757",
  swap: "#0D63D3",
};

const TransactionItem = (props: Props) => {
  return (
    <Suspense>
      <div className="flex flex-wrap  justify-between font-poppins mt-5">
        <div className="flex flex-wrap">
          <img
            className="w-[50px] h-[50px] object-contain"
            src={props.image}
            alt={props.image}
            loading="lazy"
          />
          <div className="ml-2">
            <h4 className="text-xs lg:text-sm font-bold">{props.coinName}</h4>
            <p
              className="text-xs lg:text-sm mt-2"
              style={{ color: color[props.action] }}
            >
              {props.action}
            </p>
          </div>
        </div>
        <div>
          <h4 className="text-xs lg:text-sm font-bold text-right">
            {props.action === "sell" || props.action === "swap" ? "-" : "+"}{" "}
            {props.amount}
          </h4>
          <p className="text-xs lg:text-sm mt-2 text-right text-coincard">${props.balance}</p>
        </div>
      </div>
    </Suspense>
  );
};

export default TransactionItem;
