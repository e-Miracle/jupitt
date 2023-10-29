import { lazy, useState } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import Tcard from "../../../components/t-card-alt";
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
    { key: "aum", label: "AUM Bal b/f" },
    { key: "activity", label: "Activity" },
    { key: "amount", label: "Amount" },
    { key: "credit", label: "Debit" },
    { key: "debit", label: "Credit" },
  ];

  const data = [
    {
      id: 1,
      activity: "Buy",
      credit: "1,000.00",
      transaction_id: "123456789012",
      user_id: "J394300",
      aum: "27,000.30",
      amount: "0.004959",
      debit: "1,000.00",
      time: "2023-10-15 03:28 AM",
    },
    {
      id: 2,
      activity: "Buy",
      credit: "1,000.00",
      transaction_id: "123456789012",
      user_id: "J394300",
      aum: "27,000.30",
      amount: "0.004959",
      debit: "1,000.00",
      time: "2023-10-15 03:28 AM",
    },
  ];
  return (
    <div>
      {" "}
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
          country="nigeria"
          currency="Nigeria Naira"
          value={`#${Number(45000000000).toLocaleString()}`}
        />
        <Tcard
          country="ghana"
          currency="Ghana Cedis"
          value={`#${Number(45000000000).toLocaleString()}`}
        />

        <Tcard
          country="kenya"
          currency="Kenya Shillings"
          value={`#${Number(45000000000).toLocaleString()}`}
        />
      </div>
      <Table
        headers={headers}
        data={data}
      />
    </div>
  );
};

export default Fiat;
