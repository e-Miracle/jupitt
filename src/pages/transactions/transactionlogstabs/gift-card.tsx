import { lazy, useState } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
const Filter = lazy(() => import("../../../components/filter"));

const GiftCard = () => {
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
    { key: "time", label: "Date" },
    { key: "transaction_id", label: "Transaction ID" },
    { key: "customer_id", label: "Customer ID" },
    { key: "card_name", label: "Card Name" },
    { key: "card_country", label: "Card Country" },
    { key: "card_type", label: "Card Type" },
    { key: "value", label: "Value Category" },
    { key: "card_variation", label: "Card Variation" },
  ];

  const data = [
    {
      id: 1,
      time: "2023-10-15 03:28 AM",
      transaction_id: "123456789012",
      customer_id: "J97364",
      card_name: "Amazon",
      card_country: "US",
      card_type: "Physical",
      value: "$10 - $99",
      card_variation: "$10",
    },
    {
      id: 2,
      time: "2023-10-15 03:28 AM",
      transaction_id: "123456789012",
      customer_id: "J97364",
      card_name: "Amazon",
      card_country: "US",
      card_type: "Physical",
      value: "$10 - $99",
      card_variation: "$10",
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
      <Table headers={headers} data={data} />
    </div>
  );
};

export default GiftCard;
