import React from "react";
import { Share, Check } from "../assets";

type Props = {
  lowerRange: number;
  higherRange: number;
  number: number;
  currency: string;
  currenyShortForm: string;
  handleShare?: () => void;
};
const CardFunnelCard: React.FC<Props> = ({
  lowerRange,
  higherRange,
  number,
  currency,
  currenyShortForm,
  handleShare,
}) => {
  return (
    <div>
      <div className="bg-[#ECFDF3] text-[#027A48] text-xs lg:text-sm py-1 px-2 rounded-[16px] uppercase max-w-[110px] mx-auto">
        <span>{lowerRange}</span> - <span>{higherRange}</span>{" "}
        <span>{currenyShortForm}</span>
      </div>
      <div className="bg-[#002147] rounded-[15px] p-3 mt-2">
        <img src={Check} alt={Check} />
        <h2 className="my-5 text-white font-poppins text-3xl lg:text-4xl text-center font-normal">
          {currency} {number}
        </h2>
        <div className="flex justify-end items-end">
          <button onClick={handleShare} className="hover:opacity-80">
            {" "}
            <img src={Share} alt={Share} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardFunnelCard;
