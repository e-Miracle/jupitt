import React, { lazy, useState } from "react";
import { changeHandler } from "../../../utils";
import { results, data, headers } from "../../../constants";
import Table from "../../../components/table";
const Filter = lazy(() => import("../../../components/filter"));
const VirtualCard = () => {
   const [value, setValue] = useState("");
   const [searchResults, setSearchResults] = React.useState<Array<unknown>>([]);
   const handleToggle = () => {};
   const handleFilter = () => {};
   const handleSubmit = () => {
     if (!value) return;
     console.log(value);
   };
   const handleActionClick = (type: "delete", id: number | string) => {
     if (type === "delete") {
       console.log(id);
     }
   };

   const getViewLink = (id: number | string) => `/manage-staff/staff/${id}`;

   const handleChange: changeHandler = (e) => {
     const { target } = e;
     if (!target.value.trim()) return setSearchResults([]);

     const filteredValue = results.filter((result) =>
       result.name.toLowerCase().startsWith(target.value)
     );

     if (filteredValue) setSearchResults(filteredValue);
   };
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
        onActionClick={handleActionClick}
        viewLink={getViewLink}
      />
    </div>
  );
}

export default VirtualCard;
