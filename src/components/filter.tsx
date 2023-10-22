/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import { lazy, Suspense } from "react";
import {
  faArrowsUpDown,
  faBarcode,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const LiveSearch = lazy(() => import("./LiveSearch/LiveSearch"));
 type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
type Props = {
  data: Array<any>;
  handleExport: () => void;
  handleChange: changeHandler;
  handleSubmit: () => void;
  handleFilter: () => void;
    handleToggle: () => void;
    handleSelect: (item: string) => void;
  value: string;
};

const filter = ({
  data,
  handleExport,
  handleSubmit,
  handleChange,
  value,
  handleToggle,
  handleFilter,
  handleSelect,
}: Props) => {
  return (
    <Suspense>
      <div className="flex flex-wrap items-center justify-between mt-5">
        {" "}
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
          renderItem={(item: any) => <p className="text-black ">{item.name}</p>}
        />
        <div className="mt-5">
          <button
            onClick={handleToggle}
            className="rounded-md p-2 text-xs lg:text-base text-gray outline-none border-none hover:opacity-90 "
          >
            {" "}
            <FontAwesomeIcon icon={faArrowsUpDown} />
          </button>
          <button
            onClick={handleFilter}
            className="rounded-md p-2 text-xs lg:text-base text-gray outline-none border border-coincard hover:bg-coincard ml-5"
          >
            {" "}
            <FontAwesomeIcon className="mr-2" icon={faBarcode} />
            Filter
          </button>
          <button
            onClick={handleExport}
            className="rounded-md p-2 text-xs lg:text-base text-gray outline-none border border-coincard hover:bg-coincard ml-5"
          >
            {" "}
            <FontAwesomeIcon className="mr-2" icon={faArrowDown} />
            Export
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default filter;
