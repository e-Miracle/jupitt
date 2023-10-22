import { Box, Avatar, Text } from "@chakra-ui/react";
import React, { useState, lazy } from "react";
import { results } from "../../constants";
import { changeHandler } from "../../utils";
import Table from "../../components/table";
const Filter = lazy(() => import("../../components/filter"));
const Transaction = () => {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = React.useState<Array<unknown>>([]);
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

  const headers = [
    { key: "id", label: "ID" },
    { key: "user", label: "User" },
    { key: "age", label: "Age" },
    { key: "status", label: "Status" },
    { key: "time", label: "Time" },
  ];

  const data = [
    {
      id: 1,
      name: "Alice",
      age: 25,
      status: "active",
      email: "alice@example.com",
      image: "https://example.com/alice.jpg",
      time: "2023-10-15 03:28 AM",
    },
    {
      id: 2,
      name: "Bob",
      age: 30,
      status: "flagged",
      email: "bob@example.com",
      image: "https://example.com/bob.jpg",
      time: "2023-10-14 09:15 PM",
    },
    {
      id: 3,
      name: "Charlie",
      age: 35,
      status: "inactive",
      email: "charlie@example.com",
      image: "https://example.com/charlie.jpg",
      time: "2023-10-13 10:45 AM",
    },

    // Add more data here as needed
  ];
  const handleActionClick = (type: "delete", id: number) => {
    if (type === "delete") {
      console.log(id);
      // Perform the delete operation here
    }
  };

  const getViewLink = (id: number) => `/user-portal/user/${id}`;
  return (
    <Box>
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
      <Box className="flex items-center space-x-2 font-inter my-5">
        <Avatar
          name={"john doe"}
          src={"http://via.plcaeholder.com/100x100" as string}
        />
        <div>
          <Text className="font-medium capitalize ">{"john doe"}</Text>
          <Text fontSize="sm" color="gray.500">
            {"johndoe@gmail.com"}
          </Text>
        </div>
      </Box>
      <Table
        headers={headers}
        data={data}
        onActionClick={handleActionClick}
        viewLink={getViewLink}
      />
    </Box>
  );
};

export default Transaction;
