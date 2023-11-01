import React, { lazy, useState, useEffect, useMemo } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getSwap } from "../../../store/reducers/ratelogs";
import LoadingTable from "../../../components/table-loader";
import EmptyArrayMessage from "../../../components/empty";
const Filter = lazy(() => import("../../../components/filter"));
const SwapRateLog = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getSwap({}));
  }, [dispatch]);
  const {
    swap_logs_loading,
    swap_logs,
    swap_current_page,
    swap_next_page_url,
    swap_total,
    swap_prev_page_url,
  } = useAppSelector((state) => state.logs);
  const options = useMemo(
    () =>
      swap_logs &&
      swap_logs.length > 0 &&
      swap_logs.map((item) => ({
        id: item.id,
        activity: item.activity,
        rate: item.rate,
        currency: item.rate_currency,
        authorize: item.authorizer.name,
        authorized_szn: item.authorizer.identifier,
        time: item.created_at,
      })),
    [swap_logs]
  );
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

  const change = (page: number) => dispatch(getSwap({ page: String(page) }));
  
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
      {swap_logs_loading && (
        <LoadingTable
          rows={15}
          columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
        />
      )}
      {!swap_logs_loading && options && options.length > 0 ? (
        <Table
          headers={headers}
          data={options}
          total={swap_total}
          currentPage={swap_current_page}
          next_page_url={swap_next_page_url}
          prev_page_url={swap_prev_page_url}
          change={change}
        />
      ) : (
        <EmptyArrayMessage
          array={swap_logs}
          message="No logs"
          imageAlt="http://via.placeholder.com/500x5000"
        />
      )}
    </div>
  );
};

export default SwapRateLog;
