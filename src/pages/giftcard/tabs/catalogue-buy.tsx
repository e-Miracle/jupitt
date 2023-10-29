import React, { useState, lazy } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import GiftCard from "../../../components/gift-card";
const Filter = lazy(() => import("../../../components/filter"));

const CatalogueBuy = () => {
  const [currentState, setCurrentState] = useState("active");
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

  const suspend = (id: string | number) => {
    console.log(id)
  }

   const deleted = (id: string | number) => {
     console.log(id);
   };
  return (
    <div>
      <div className="font-inter">
        <button
          onClick={() => setCurrentState("active")}
          className={` w-full md:w-auto mt-5 md:mt-0  md:max-w-[200px] ${
            currentState === "active"
              ? "text-secondary border border-secondary"
              : "text-[#9DA8B6] border border-[#EFF2F7]"
          } text-sm lg:text-base rounded-[10px]  md:rounded-l-[10px] md:rounded-r-[0px] lg:py-2 lg:px-7 px-5 py-3 capitalize`}
        >
          active
        </button>
        <button
          onClick={() => setCurrentState("inactive")}
          className={`w-full md:w-auto my-5 md:my-0  md:max-w-[200px] ${
            currentState === "inactive"
              ? "text-secondary border border-secondary"
              : "text-[#9DA8B6] border border-[#EFF2F7]"
          }  text-sm lg:text-base rounded-[10px] md:rounded-r-[10px] md:rounded-l-[0px] lg:py-2 lg:px-7 px-5 py-3 capitalize`}
        >
          inactive
        </button>
      </div>
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
        exported={false}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-[1rem] mt-[1rem]">
        {[1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => (
          <GiftCard
            id={item}
            key={item}
            name="test"
            img={"http://via.placeholder.com/500x500"}
            suspend={suspend}
            deleted={deleted}
          />
        ))}
      </div>
    </div>
  );
};

export default CatalogueBuy;
