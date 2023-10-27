import React from 'react'
import { results, data, headers } from "../../../constants";
import { changeHandler } from "../../../utils";
import Table from "../../../components/table";
const Filter = React.lazy(() => import("../../../components/filter"));
const Ticket = () => {
    const [value, setValue] = React.useState("");
    const [searchResults, setSearchResults] = React.useState<Array<unknown>>(
      []
    );
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

    const handleActionClick = (type: "delete", id: number | string) => {
      if (type === "delete") {
        console.log(id);
      }
    };

    const getViewLink = (id: number | string) => `/ticket/${id}`;
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

export default Ticket;