import React, { lazy, useState, useEffect, useMemo } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getVc } from "../../../store/reducers/ratelogs";
import LoadingTable from "../../../components/table-loader";
import EmptyArrayMessage from "../../../components/empty";
const Filter = lazy(() => import("../../../components/filter"));
const VirtualDebitCardRateLog = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getVc({}));
  }, [dispatch]);
  const {
    vc_logs_loading,
    vc_logs,
    vc_current_page,
    vc_next_page_url,
    vc_total,
    vc_prev_page_url,
  } = useAppSelector((state) => state.logs);
   const options = useMemo(
     () =>
       vc_logs &&
       vc_logs.length &&
       vc_logs.map((item) => ({
         id: item.id,
         activity: item.activity,
         rate: item.rate,
         currency:item.rate_currency,
         authorize: item.authorizer?.name,
         authorized_szn: item.authorizer?.identifier,
         time: item.created_at,
       })),
     [vc_logs]
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
  const change = (page: number) => 
    dispatch(getVc({ page: String(page) }));
  
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
      {vc_logs_loading && (
        <LoadingTable
          rows={15}
          columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
        />
      )}
      {!vc_logs_loading && options && options.length > 0 ? (
        <Table
          headers={headers}
          data={options}
          total={vc_total}
          currentPage={vc_current_page}
          next_page_url={vc_next_page_url}
          prev_page_url={vc_prev_page_url}
          change={change}
        />
      ) : (
        <EmptyArrayMessage
          array={vc_logs}
          message="No logs"
          imageAlt="http://via.placeholder.com/500x5000"
        />
      )}
    </div>
  );
};

export default VirtualDebitCardRateLog;
