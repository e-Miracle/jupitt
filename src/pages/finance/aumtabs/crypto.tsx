import { lazy, useState } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import Tcard from "../../../components/tcard";
import { Btc, Eth, USDT } from "../../../assets";
const Filter = lazy(() => import("../../../components/filter"));
const Crypto = () => {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<Array<unknown>>([]);
  const handleToggle = () => {};
  const handleFilter = () => {};
  const handleSubmit = () => {
    if (!value) return;
    console.log(value);
  };

  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setSearchResults([]);

    const filteredValue = results.filter((result) =>
      result.name.toLowerCase().startsWith(target.value)
    );

    if (filteredValue) setSearchResults(filteredValue);
  };
   const headers = [
     { key: "transaction_id", label: "Transaction ID" },
     { key: "time", label: "Date" },
     { key: "user_id", label: "User ID" },
     { key: "aum", label: "AUM Bal b/f" },
     { key: "activity", label: "Activity" },
     { key: "asset", label: "Asset" },
     { key: "amount", label: "Amount" },
     { key: "value", label: "Value (USD)" },
   ];

   const data = [
     {
       id: 1,
       activity: "Buy",
       asset: "btc",
       transaction_id: "123456789012",
       user_id: "J394300",
       aum: "27,000.30",
       amount: "0.004959",
       value: "1,000.00",
       time: "2023-10-15 03:28 AM",
     },
     {
       id: 2,
       activity: "Buy",
       asset: "btc",
       transaction_id: "123456789012",
       user_id: "J394300",
       aum: "27,000.30",
       amount: "0.004959",
       value: "1,000.00",
       time: "2023-10-15 03:28 AM",
     },
   ];
  return (
    <div>
      <Filter
        className="mt-2"
        data={searchResults}
        handleToggle={handleToggle}
        handleFilter={handleFilter}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        handleSelect={(item) => setValue(item)}
        random={false}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] mt-5">
        <Tcard
          optionalString="AUM Balance"
          coinName={"Bitcoin"}
          value={Number(10405).toLocaleString()}
          img={Btc}
          optionalnumber={`$ ${Number(30000).toLocaleString()}`}
        />
        <Tcard
          optionalString="AUM Balance"
          coinName={"Ethereum"}
          value={Number(10405).toLocaleString()}
          img={Eth}
          optionalnumber={`$ ${Number(30000).toLocaleString()}`}
        />

        <Tcard
          optionalString="AUM Balance"
          coinName={"USDT"}
          value={Number(10405).toLocaleString()}
          img={USDT}
          optionalnumber={`$ ${Number(30000).toLocaleString()}`}
        />
      </div>
      <Table
        headers={headers}
        data={data}
      />
    </div>
  );
};

export default Crypto;
