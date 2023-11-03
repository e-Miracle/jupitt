import { lazy, useState, useEffect, useMemo } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getPerfectMoneyLogs } from "../../../store/reducers/aum";
import LoadingTable from "../../../components/table-loader";
import EmptyArrayMessage from "../../../components/empty";
const Filter = lazy(() => import("../../../components/filter"));

const PerfectMoney = () => {
  const dispatch = useAppDispatch();
  const {
    pm_logs,
    pm_logs_loading,
    pm_current_page,
    pm_next_page_url,
    pm_prev_page_url,
    pm_last_page,
  } = useAppSelector((state) => state.aum);

  useEffect(() => {
    if (!pm_logs) dispatch(getPerfectMoneyLogs({}));
  }, [dispatch, pm_logs]);

  const options = useMemo(
    () =>
      pm_logs &&
      pm_logs.length &&
      pm_logs.map((item) => ({
        id: item._id,
        time: item.created_at,
        transaction_id: item.reference,
        user_id: item.user_id,
        activity: item.activity,
        from: item.from,
        to: item.to,
        amount: item.amount,
      })),
    [pm_logs]
  );
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<Array<unknown>>([]);
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
    { key: "transaction_id", label: "Transaction ID" },
    { key: "time", label: "Date" },
    { key: "user_id", label: "User ID" },
    { key: "activity", label: "Activity" },
    { key: "from", label: "From" },
    { key: "to", label: "To" },
    { key: "amount", label: "Amount" },
  ];

   const change = (page: number) => {
     dispatch(getPerfectMoneyLogs({ page: String(page) }));
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
      {pm_logs_loading && (
        <LoadingTable
          rows={15}
          columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
        />
      )}
      {!pm_logs_loading && options && options.length > 0 ? (
        <Table
          headers={headers}
          data={options}
          total={pm_last_page}
          currentPage={pm_current_page}
          next_page_url={pm_next_page_url}
          prev_page_url={pm_prev_page_url}
          change={change}
        />
      ) : (
        <EmptyArrayMessage
          array={pm_logs}
          message="No logs"
          imageAlt="http://via.placeholder.com/500x5000"
        />
      )}
    </div>
  );
};

export default PerfectMoney;
