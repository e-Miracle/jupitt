import React from "react";

type Props = {
  coinName: string;
  type: "deposit" | "withdraw" | "buy" | "sell" | "swap" | "funding" |"spending";
  value: string;
  img?: string;
};
const Tcard: React.FC<Props> = ({ img, coinName, type, value }) => {
  return (
    <div className="bg-[#F1F1F1] rounded-[12px] p-3 flex items-center flex-col font-poppins">
      <h3 className="flex items-center capitalize text-xs lg:text-sm font-semibold">
        {img && (
          <img
            src={img}
            alt={img}
            className="mr-2 w-[30px] h-[30px] object-cover rounded-full"
          />
        )}
        {coinName}
      </h3>
      <h4 className="my-5 uppercase text-xs lg:text-sm font-medium tracking-widest text-[#666666]">
        total {type}
      </h4>
      <h2 className="text-xl lg:text-2xl font-semibold">{value}</h2>
    </div>
  );
};

export default Tcard;
