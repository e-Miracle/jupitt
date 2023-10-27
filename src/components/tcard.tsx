import React from "react";

type Props = {
  coinName: string;
  type?: "deposit" | "withdraw" | "buy" | "sell" | "swap" | "funding" |"spending";
  value: string;
  img?: string;
  optionalString?: string
  optionalnumber?: string
};
const Tcard: React.FC<Props> = ({
  img,
  coinName,
  type,
  value,
  optionalString,
  optionalnumber,
}) => {
  return (
    <div className="bg-[#F1F1F1] rounded-[12px] p-5 flex items-center flex-col font-poppins">
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
      {type && (
        <h4 className="my-5 uppercase text-xs lg:text-sm font-medium tracking-widest text-[#666666]">
          total {type}
        </h4>
      )}

      {optionalString && (
        <h4 className="my-5 uppercase text-xs lg:text-sm font-medium tracking-widest text-[#666666]">
          {optionalString}
        </h4>
      )}
      <h2 className="text-xl lg:text-2xl font-semibold">{value}</h2>

      {optionalnumber && (
        <h5 className="mt-3 text-xs lg:text-sm font-medium tracking-widest text-[#666666]">
          {optionalnumber}
        </h5>
      )}
    </div>
  );
};

export default Tcard;
