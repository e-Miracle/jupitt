import { lazy, useEffect, useState, useMemo } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import Table from "../../../components/table";
import Tcard from "../../../components/tcard";
import { Btc, Eth, USDT } from "../../../assets";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getCryptoAum, getCryptoLogs } from "../../../store/reducers/aum";
import CardLoader from "../../../components/card-loader";
import LoadingTable from "../../../components/table-loader";
import EmptyArrayMessage from "../../../components/empty";
const Filter = lazy(() => import("../../../components/filter"));
const Crypto = () => {
  const {
    crypto_aum,
    crypto_aum_loading,
    crypto_logs,
    crypto_logs_loading,
    crypto_current_page,
    crypto_next_page_url,
    crypto_prev_page_url,
    crypto_last_page,
  } = useAppSelector((state) => state.aum);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getCryptoAum());
  }, [dispatch]);

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
        aum: item.market_price,
        amount: item.amount,
        value: item.usd_value,
        time: item.created_at,
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
    { key: "aum", label: "AUM Bal b/f" },
    { key: "activity", label: "Activity" },
    { key: "asset", label: "Asset" },
    { key: "amount", label: "Amount" },
    { key: "value", label: "Value (USD)" },
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
      {crypto_aum_loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] mt-5">
          <CardLoader />
          <CardLoader />
          <CardLoader />
        </div>
      )}
      {!crypto_aum_loading && crypto_aum && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] mt-5">
          <Tcard
            optionalString="AUM Balance"
            coinName={"Bitcoin"}
            value={Number(crypto_aum?.BTC).toLocaleString()}
            img={Btc}
            optionalnumber={`$ ${Number(30000).toLocaleString()}`}
          />
          <Tcard
            optionalString="AUM Balance"
            coinName={"Ethereum"}
            value={Number(crypto_aum?.ETH).toLocaleString()}
            img={Eth}
            optionalnumber={`$ ${Number(30000).toLocaleString()}`}
          />

          <Tcard
            optionalString="AUM Balance"
            coinName={"USDT"}
            value={Number(crypto_aum?.USDT).toLocaleString()}
            img={USDT}
            optionalnumber={`$ ${Number(30000).toLocaleString()}`}
          />
        </div>
      )}
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
