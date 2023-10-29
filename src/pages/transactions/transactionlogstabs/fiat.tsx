import { lazy, useState } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
const Filter = lazy(() => import("../../../components/filter"));

const Fiat = () => {
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
     { key: "activity", label: "Activity" },
     { key: "fiat_value", label: "Fiat Value" },
     { key: "currency", label: "Fiat Currency" },
     { key: "status", label: "Status" },
   ];

   const data = [
     {
       id: 1,
       activity: "Buy",
       asset: "btc",
       transaction_id: "123456789012",
       user_id: "J394300",
       time: "2023-10-15 03:28 AM",
       fiat_value: "71,000.00",
       currency: "NGN",
       status: "active",
     },
     {
       id: 2,
       activity: "Buy",
       asset: "btc",
       transaction_id: "123456789012",
       user_id: "J394300",
       time: "2023-10-15 03:28 AM",
       fiat_value: "71,000.00",
       currency: "NGN",
       status: "active",
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
      <Table
        headers={headers}
        data={data}
      />
    </div>
  );
};

export default Fiat;
