import { lazy, useState, useEffect, useMemo } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFiatLogs } from "../../../store/reducers/aum";
import LoadingTable from "../../../components/table-loader";
import EmptyArrayMessage from "../../../components/empty";
const Filter = lazy(() => import("../../../components/filter"));

const Fiat = () => {
  const dispatch = useAppDispatch();
  const {
    fiat_logs,
    fiat_logs_loading,
    fiat_current_page,
    fiat_next_page_url,
    fiat_prev_page_url,
    fiat_last_page,
  } = useAppSelector((state) => state.aum);

  useEffect(() => {
    if (!fiat_logs) dispatch(getFiatLogs({}));
  }, [dispatch, fiat_logs]);

  const options = useMemo(
    () =>
      fiat_logs &&
      fiat_logs.length &&
      fiat_logs.map((item) => ({
        id: item._id,
        activity: item.activity,
        asset: item.fiat_currency,
        transaction_id: item.reference,
        user_id: item.user_id,
        time: item.created_at,
        fiat_value: item.amount,
        currency: item.fiat_currency,
        status: item.status ? "completed" : "pending",
      })),
    [fiat_logs]
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
    { key: "fiat_value", label: "Fiat Value" },
    { key: "currency", label: "Fiat Currency" },
    { key: "status", label: "Status" },
  ];

  

  const change = (page: number) => {
    dispatch(getFiatLogs({ page: String(page) }));
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
      {fiat_logs_loading && (
        <LoadingTable
          rows={15}
          columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
        />
      )}
      {!fiat_logs_loading && options && options.length > 0 ? (
        <Table
          headers={headers}
          data={options}
          total={fiat_last_page}
          currentPage={fiat_current_page}
          next_page_url={fiat_next_page_url}
          prev_page_url={fiat_prev_page_url}
          change={change}
        />
      ) : (
        <EmptyArrayMessage
          array={fiat_logs}
          message="No logs"
          imageAlt="http://via.placeholder.com/500x5000"
        />
      )}
    </div>
  );
};

export default Fiat;
