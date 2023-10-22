/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import React, { lazy, useState, useEffect } from "react";
import { Box, Text } from "@chakra-ui/react";
import { Suspense } from "react";
import Title from "../../components/title";
import Table from "../../components/table";
const Filter = lazy(() => import("../../components/filter"));
import { results } from "../../constants";
import { changeHandler } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { get } from "../../store/reducers/users";
import LoadingTable from "../../components/table-loader";
import EmptyArrayMessage from "../../components/empty";
export default function UserPortal() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(get({}));
  }, [dispatch]);
  const { users, loading } = useAppSelector((state) => state.user);
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = React.useState<Array<any>>([]);
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
    { key: "user", label: "User" },
    { key: "identifier", label: "User ID" },
    { key: "phone", label: "PhoneNumber" },
    { key: "time", label: "Last Activity" },
    { key: "status", label: "Account Status" },
  ];

  const handleActionClick = (type: "delete", id: number) => {
    if (type === "delete") {
      console.log(id);
      // Perform the delete operation here
    }
  };

  const getViewLink = (id: number) => `/user-portal/user/${id}`;
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Title title="User Portal" number={users?.length || 0} />
          <Box className="lg:ml-[15rem] flex justify-end items-end text-secondary font-medium font-inter">
            <Text fontSize="3xl">{users?.length || 0}</Text>
            <Text fontSize="sm" className="ml-1">
              Total Users
            </Text>
          </Box>
        </Box>
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
        {loading && (
          <LoadingTable
            rows={15}
            columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
          />
        )}
        {!loading && users && users.length > 0 ? (
          <Table
            headers={headers}
            data={users.map((item) => ({
              id: item.identifier,
              name: item.full_name,
              email: item.email,
              image: item.full_name,
              identifier: item.identifier,
              phone: item.phone_number,
              time: item.updated_at,
              status: item.email,
            }))}
            onActionClick={handleActionClick}
            viewLink={getViewLink}
          />
        ) : (
          <EmptyArrayMessage
            array={users}
            message="No users for now"
            imageAlt="http://via.placeholder.com/500x5000"
          />
        )}
      </Box>
    </Suspense>
  );
}
