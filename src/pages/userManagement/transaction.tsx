import { Box, Avatar, Text } from "@chakra-ui/react";
import React, { useState, lazy, useEffect } from "react";
import { results } from "../../constants";
import { changeHandler } from "../../utils";
import Table from "../../components/table";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getUserTransactions } from "../../store/reducers/users";
import { useParams } from "react-router-dom";
import LoadingTable from "../../components/table-loader";
import EmptyArrayMessage from "../../components/empty";
const Filter = lazy(() => import("../../components/filter"));

const Transaction = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(getUserTransactions(id));
  }, [dispatch, id]);
  const { transactionLoader, transactions, user } = useAppSelector(
    (state) => state.user
  );
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
    { key: "id", label: "Transaction ID" },
    { key: "time", label: "Date" },
    { key: "asset", label: "Asset" },
    { key: "activity", label: "Activity" },
    { key: "from", label: "From" },
    { key: "to", label: "To" },
    { key: "amount", label: "Amount" },
    { key: "price", label: "Market Price ($)" },
  ];

  
  const handleActionClick = (type: "delete", id: number | string) => {
    if (type === "delete") {
      console.log(id);
      // Perform the delete operation here
    }
  };

  const getViewLink = (id: number | string) => `/user-portal/user/${id}`;
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
        <Avatar name={user?.full_name} src={user?.full_name} />
        <div>
          <Text className="font-medium capitalize ">{user?.full_name}</Text>
          <Text fontSize="sm" color="gray.500">
            {user?.email}
          </Text>
        </div>
      </Box>
      {transactionLoader && (
        <LoadingTable
          rows={15}
          columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
        />
      )}
      {!transactionLoader && transactions && transactions.length > 0 ? (
        <Table
          headers={headers}
          data={transactions.map((item, id) => ({
            id: item.reference ? item.reference: id,
            time: item.date,
            asset: item.asset,
            activity: item.activity,
            from: item.from ? item.from : "",
            to: item.to ? item.to: "",
            amount: item.amount,
            price: item.market_price,
          }))}
          onActionClick={handleActionClick}
          viewLink={getViewLink}
        />
      ) : (
        <EmptyArrayMessage
          array={transactions}
          message="No users for now"
          imageAlt="http://via.placeholder.com/500x5000"
        />
      )}{" "}
    </Box>
  );
};

export default Transaction;
