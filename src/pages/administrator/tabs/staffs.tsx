import { lazy, useState } from "react";
import { results, data, headers } from "../../../constants";
import { changeHandler } from "../../../utils";
import Table from "../../../components/table";
const Filter = lazy(() => import("../../../components/filter"));
const Staffs = () => {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<Array<unknown>>([]);
  const handleToggle = () => {};
  const handleFilter = () => {};
  const handleSubmit = () => {
    if (!value) return;
    console.log(value);
  };
  const handleExport = () => {};
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

  const getViewLink = (id: number | string) => `/manage-staff/staff/${id}`;
  return (
    <div>
      {" "}
      <Filter
        data={searchResults}
        handleToggle={handleToggle}
        handleFilter={handleFilter}
        handleSubmit={handleSubmit}
        handleExport={handleExport}
        handleChange={handleChange}
        value={value}
        handleSelect={(item) => setValue(item)}
      />
      <Table
        headers={headers}
        data={data}
        onActionClick={handleActionClick}
        viewLink={getViewLink}
        checkboxes
        moreSection
      />
    </div>
  );
};

export default Staffs;
