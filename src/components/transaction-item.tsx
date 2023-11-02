import { Suspense } from "react";

type Props = {
  image: string;
  coinName: string;
  action: "sell" | "buy" | "swap" | "send" | "receive" | "withdraw" | string;
  amount: number;
  balance: string;
};

const color: Record<string, string> = {
  sell: "#EB5757",
  buy: "#EB5757",
  swap: "#0D63D3",
  send: "#EB5757",
  receive: "#1FCB4F",
  withdraw: "#1FCB4F",
};

const TransactionItem = (props: Props) => {
  return (
    <Suspense>
      <div className="flex   justify-between font-poppins mt-5 ">
        <div className="flex flex-wrap justify-between ">
          <img
            className="lg:w-[50px] lg:h-[50px] object-contain"
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
            {props.action === "sell" ||
            props.action === "swap" ||
            props.action === "withdraw" ||
            props.action === "send"
              ? "-"
              : "+"}{" "}
            {props.amount}
          </h4>
          <p className="text-xs lg:text-sm mt-2 text-right text-coincard">
            ${props.balance}
          </p>
        </div>
      </div>
    </Suspense>
  );
};

export default TransactionItem;
