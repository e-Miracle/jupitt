import { Suspense } from "react";
import { nFormatter } from "../utils";

type Props = {
  logo: string;
  title: string;
  price: number;
  graph: string;
  gain?: string;
  loss?: string;
  appValue?: string;
  currency?: string;
};

const CoinCard = (props: Props) => {
  const isGain = props.gain !== undefined;
  const isLoss = props.loss !== undefined;

  return (
    <Suspense>
      <div className="bg-white rounded-lg p-5 font-poppins  cursor-pointer">
        <div className="flex items-center">
          <img
            className="w-[1.3rem] h-[1.3rem] object-contain"
            src={props.logo}
            alt={props.logo}
            loading="lazy"
          />
          <h4 className="ml-2 text-sm lg:text-base font-semibold capitalize">
            {props.title}
          </h4>
        </div>
        <div className="flex items-center my-5 justify-between">
          <h2 className=" text-xl lg:text-2xl font-semibold">
            {props.currency && props.currency}
            {nFormatter(props.price, 2)}
          </h2>

          <img
            className="w-[165px] h-[50px] object-contain"
            src={props.graph}
            alt={props.graph}
            loading="lazy"
          />
        </div>
        <div className="flex flex-wrap items-center justify-between">
          <div>
            {isGain && (
              <p className="text-xs lg:text-sm text-coincard">
                Since last week{" "}
                <span className="text-darkGreen font-medium">
                  {" "}
                  {props.gain}
                </span>
              </p>
            )}
            {isLoss && (
              <p className="text-xs lg:text-sm text-coincard">
                {" "}
                <span className="bg-lightred text-darkred rounded-md p-1">
                  {props.loss}
                </span>{" "}
                This week
              </p>
            )}
          </div>
          {isGain && !isLoss && props.appValue && (
            <span className="text-xs lg:text-sm bg-lightgreen text-darkGreen rounded-md p-1">
              {props.appValue}
            </span>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default CoinCard;
