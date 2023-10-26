import React from 'react'
import Tcard from "../../../components/tcard";
const VirtualDebitCard = () => {
  return (
    <div className="lg:w-[80%] lg:mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] mb-[2rem] ">
        <Tcard
          type="funding"
          coinName={"virtual debit card"}
          value={Number(10405).toLocaleString()}
        />
        <Tcard
          type="withdraw"
          coinName={"virtual debit card"}
          value={Number(10405).toLocaleString()}
        />
        <Tcard
          type="spending"
          coinName={"virtual debit card"}
          value={Number(10405).toLocaleString()}
        />
      </div>
    </div>
  );
}

export default VirtualDebitCard;