import { lazy, useState, useEffect, useMemo } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCryptoLogs } from "../../../store/reducers/aum";
import LoadingTable from "../../../components/table-loader";
import EmptyArrayMessage from "../../../components/empty";
const Filter = lazy(() => import("../../../components/filter"));
const Crypto = () => {
  const {
    crypto_logs,
    crypto_logs_loading,
    crypto_current_page,
    crypto_next_page_url,
    crypto_prev_page_url,
    crypto_last_page,
  } = useAppSelector((state) => state.aum);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!crypto_logs) dispatch(getCryptoLogs({}));
  }, [dispatch, crypto_logs]);

  const options = useMemo(
    () =>
      crypto_logs &&
      crypto_logs.length &&
      crypto_logs.map((item) => ({
        id: item.id,
        activity: item.activity,
        asset: item.asset.toLowerCase(),
        transaction_id: item.reference,
        user_id: item.user_id,
        time: item.created_at,
        from: item.from ? item.from : "",
        to: item.to ? item.to : "",
      })),
    [crypto_logs]
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
    { key: "asset", label: "Asset" },
    { key: "from", label: "from" },
    { key: "to", label: "To" },
  ];

  const change = (page: number) => {
    dispatch(getCryptoLogs({ page: String(page) }));
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
      {crypto_logs_loading && (
        <LoadingTable
          rows={15}
          columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
        />
      )}
      {!crypto_logs_loading && options && options.length > 0 ? (
        <Table
          headers={headers}
          data={options}
          total={crypto_last_page}
          currentPage={crypto_current_page}
          next_page_url={crypto_next_page_url}
          prev_page_url={crypto_prev_page_url}
          change={change}
        />
      ) : (
        <EmptyArrayMessage
          array={crypto_logs}
          message="No logs"
          imageAlt="http://via.placeholder.com/500x5000"
        />
      )}
    </div>
  );
};

export default Crypto;
