import { Suspense, useState } from "react";
import { Select } from "@chakra-ui/react";
import { Convert } from "../assets";
import { faLevelUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LineChart from "./line-chart";
const LineChartCon = () => {
  const [current, setCurrent] =
    useState<"1h" | "3h" | "1d" | "1w" | "1m">("1h");
  const buttons: Array<"1h" | "3h" | "1d" | "1w" | "1m"> = [
    "1h",
    "3h",
    "1d",
    "1w",
    "1m",
  ];
  const handleIntervalSelection = (
    interval: "1h" | "3h" | "1d" | "1w" | "1m"
  ) => {
    setCurrent(interval);
    console.log(interval);
  };
  return (
    <Suspense>
      <div className="bg-white rounded-lg  font-poppins  cursor-pointer p-5">
        <div className="flex items-center flex-wrap justify-between">
          <div className="flex items-center">
            <h6 className="text-xs font-semibold ">BTC</h6>
            <img
              className="w-[.75rem] h-[1.75rem] object-contain ml-5"
              src={Convert}
              alt={Convert}
              loading="lazy"
            />
            <Select
              variant="unstyled"
              width="80px"
              fontSize={".75rem"}
              className="text-xs font-semibold ml-5"
            >
              <option value=""></option>
              <option value="option1">USDT</option>
              <option value="option2">BNB</option>
              <option value="option3">ETH </option>
            </Select>
          </div>
          <div className="flex items-center ">
            <button className="border border-coincard rounded-lg py-1 px-2 lg:py-2 lg:px-4 mr-5">
              {" "}
              <FontAwesomeIcon
                className="text-xs text-coincard"
                icon={faLevelUp}
              />
            </button>
            <Select
              bg="rgb(255, 174, 88, 0.3)"
              color="#FF7C04"
              width="100px"
              fontSize={".75rem"}
              borderColor="#666666"
              className="py-1 px-2 lg:py-2 lg:px-4"
            >
              <option value="option1">USD</option>
              <option value="option2">BTC</option>
              <option value="option3">ETH</option>
            </Select>
          </div>
        </div>
        <h3 className="text-base lg:text-lg font-extrabold my-3">$35,353.02</h3>

        <div className="flex items-center flex-wrap lg:justify-end">
          {buttons.map((btn) => (
            <button
              key={`index-${btn}`}
              className={`border border-black text-coincard text-xs rounded-[100px] w-[40px] lg:w-[60px] h-[30px] hover:bg-secondary mr-2 lg:mr-0 lg:ml-5 hover:text-white hover:border-none ${
                btn === current && " bg-secondary text-white border-none"
              }`}
              onClick={() => handleIntervalSelection(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
        <LineChart />
      </div>
    </Suspense>
  );
};

export default LineChartCon;
