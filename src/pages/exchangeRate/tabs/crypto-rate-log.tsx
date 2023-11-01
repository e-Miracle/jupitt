import React, { lazy, useEffect, useState, useMemo } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCrypto } from "../../../store/reducers/ratelogs";
import LoadingTable from "../../../components/table-loader";
import EmptyArrayMessage from "../../../components/empty";
const Filter = lazy(() => import("../../../components/filter"));

const CryptoRateLog = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCrypto({}));
  }, [dispatch]);
  const {
    crypto_logs_loading,
    crypto_logs,
    crypto_current_page,
    crypto_next_page_url,
    crypto_total,
    crypto_prev_page_url,
  } = useAppSelector((state) => state.logs);
  const options = useMemo(
    () =>
      crypto_logs &&
      crypto_logs.length &&
      crypto_logs.map((item) => ({
        id: item.id,
        activity: item.activity,
        asset: item.asset.toLocaleLowerCase(),
        rate: item.rate,
        currency: item.fiat_currency,
        authorize: item.authorizer?.name,
        authorized_szn: item.authorizer?.identifier,
        time: item.created_at,
      })),
    [crypto_logs]
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
    { key: "asset", label: "Coin Type" },
    { key: "rate", label: "Rate" },
    { key: "currency", label: "Fiat Currency" },
    { key: "time", label: "Time Stamp" },
    { key: "authorize", label: "Authorize" },
    { key: "authorized_szn", label: "Authorizer STN" },
  ];
  const change = (page: number) => {
    dispatch(getCrypto({ page: String(page) }));
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
      {!crypto_logs_loading && crypto_logs && crypto_logs.length > 0 ? (
        <Table
          headers={headers}
          data={options || []}
          total={crypto_total}
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

export default CryptoRateLog;
