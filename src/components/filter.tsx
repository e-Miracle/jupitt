/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import React, { lazy, Suspense } from "react";
import { FilterLines, Download, UpDownArrow } from "../assets";
const LiveSearch = lazy(() => import("./LiveSearch/LiveSearch"));
type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
type Props = {
  data: Array<any>;
  handleExport?: () => void;
  handleChange: changeHandler;
  handleSubmit: () => void;
  handleFilter?: () => void;
  handleToggle?: () => void;
  handleSelect: (item: string) => void;
  value: string;
  className?: string;
  exported?: boolean;
  filter?: boolean;
  random?: boolean;
};

const Filter: React.FC<Props> = ({
  exported = true,
  filter = true,
  random = true,
  data,
  handleExport,
  handleSubmit,
  handleChange,
  value,
  handleToggle,
  handleFilter,
  handleSelect,
  className,
}) => {
  return (
    <Suspense>
      <div
        className={`flex flex-wrap items-center justify-between ${className} `}
      >
        <div className="w-full  lg:max-w-[300px]">
          <LiveSearch
            placeholder="Search with any related keyword"
            results={data}
            onChange={handleChange}
            onSelect={(item: any) => {
              console.log(item);
              handleSelect(item);
            }}
            value={value}
            onSubmit={handleSubmit}
            renderItem={(item: any) => (
              <p className="text-black ">{item.name}</p>
            )}
          />
        </div>
        <div className=" flex items-center flex-wrap mt-5 lg:mt-0 w-full md:w-auto">
          {random && (
            <button
              onClick={handleToggle}
              className="w-full  md:w-auto rounded-md py-2 px-5 text-xs lg:text-base  outline-none border-none hover:opacity-90 flex items-center justify-center"
            >
              {" "}
              <img src={UpDownArrow} alt={UpDownArrow} />
            </button>
          )}
          {filter && (
            <button
              onClick={handleFilter}
              className="w-full  md:w-auto rounded-md py-2 px-5 text-xs lg:text-base text-gray outline-none border border-[#E6E7EC] hover:opacity-70 md:ml-5 mt-5 md:mt-0 flex items-center justify-center"
            >
              <img src={FilterLines} alt={FilterLines} className="mr-2" />
              Filter
            </button>
          )}
          {exported && (
            <button
              onClick={handleExport}
              className="w-full md:w-auto text-center rounded-md py-2 px-5 text-xs lg:text-base text-gray outline-none border border-[#E6E7EC] hover:opacity-70 md:ml-5 mt-5 md:mt-0 flex items-center justify-center"
            >
              {" "}
              <img src={Download} alt={Download} className="mr-2" />
              Export
            </button>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default Filter;
