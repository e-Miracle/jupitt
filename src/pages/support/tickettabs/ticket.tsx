import React from 'react'
import { results } from "../../../constants";
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
  
 const headers = [
   { key: "user", label: "Name" },
   { key: "subject", label: "Subject" },
   { key: "message", label: "Message" },
   { key: "time", label: "Time" },
 ];

 const data = [
   {
     id: 1,
     name: "Alice",
     subject: "Lorem ipsum",
     message: "Lorem ipsum dolor sit ipsum ametipsum...",
     email: "alice@example.com",
     image: "https://example.com/alice.jpg",
     time: "2023-10-15 03:28 AM",
   },
   {
     id: 2,
     name: "Alice",
     subject: "Lorem ipsum",
     message: "Lorem ipsum dolor sit ipsum ametipsum...",
     email: "alice@example.com",
     image: "https://example.com/alice.jpg",
     time: "2023-10-15 03:28 AM",
   },
   // Add more data here as needed
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
        onActionClick={handleActionClick}
        viewLink={getViewLink}
        checkboxes
        moreSection
      />
    </div>
  );
}

export default Ticket;