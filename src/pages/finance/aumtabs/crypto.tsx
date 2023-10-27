import { lazy, useState } from "react";
import { changeHandler } from "../../../utils";
import { results, data, headers } from "../../../constants";
import Table from "../../../components/table";
import Tcard from "../../../components/tcard";
import { Btc, Eth, USDT } from "../../../assets";
const Filter = lazy(() => import("../../../components/filter"));
const Crypto = () => {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<Array<unknown>>([]);
  const handleToggle = () => {};
  const handleFilter = () => {};
  const handleSubmit = () => {
    if (!value) return;
    console.log(value);
  };
  const handleActionClick = (type: "delete", id: number | string) => {
    if (type === "delete") {
      console.log(id);
    }
  };

  const getViewLink = (id: number | string) => `/manage-staff/staff/${id}`;

  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setSearchResults([]);

    const filteredValue = results.filter((result) =>
      result.name.toLowerCase().startsWith(target.value)
    );

    if (filteredValue) setSearchResults(filteredValue);
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1rem] mt-5">
        <Tcard
          optionalString="AUM Balance"
          coinName={"Bitcoin"}
          value={Number(10405).toLocaleString()}
          img={Btc}
          optionalnumber={`$ ${Number(30000).toLocaleString()}`}
        />
        <Tcard
          optionalString="AUM Balance"
          coinName={"Ethereum"}
          value={Number(10405).toLocaleString()}
          img={Eth}
          optionalnumber={`$ ${Number(30000).toLocaleString()}`}
        />

        <Tcard
          optionalString="AUM Balance"
          coinName={"USDT"}
          value={Number(10405).toLocaleString()}
          img={USDT}
          optionalnumber={`$ ${Number(30000).toLocaleString()}`}
        />
      </div>
      <Table
        headers={headers}
        data={data}
        onActionClick={handleActionClick}
        viewLink={getViewLink}
      />
    </div>
  );
};

export default Crypto;
