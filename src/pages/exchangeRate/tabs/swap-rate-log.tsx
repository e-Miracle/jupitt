import React, { lazy, useState } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
const Filter = lazy(() => import("../../../components/filter"));
const SwapRateLog = () => {
   const [value, setValue] = useState("");
   const [searchResults, setSearchResults] = React.useState<Array<unknown>>([]);
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
    { key: "activity", label: "Activity" },
    { key: "rate", label: "Rate" },
    { key: "currency", label: "Rate Currency" },
    { key: "time", label: "Time Stamp" },
    { key: "authorize", label: "Authorize" },
    { key: "authorized_szn", label: "Authorizer STN" },
  ];

  const data = [
    {
      id: 1,
      activity: "Buy",
      rate: "750",
      currency: "NGN",
      authorize: "Chris",
      authorized_szn: "#234554G",
      time: "2023-10-15 03:28 AM",
    },
    {
      id: 2,
      activity: "Buy",
      rate: "750",
      currency: "NGN",
      authorize: "Chris",
      authorized_szn: "#234554G",
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
      <Table
        headers={headers}
        data={data}
      />
    </div>
  );
}

export default SwapRateLog;
