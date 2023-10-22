import { Suspense } from "react";
import { Select } from "@chakra-ui/react";

const Calculator = () => {
  return (
    <Suspense>
      <div className="bg-white rounded-lg p-5 font-poppins  cursor-pointer">
        <h3 className="capitalize text-base lg:text-lg font-semibold">
          calculator
        </h3>
        <div>
          <div className="relative mt-5">
            <input
              className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="convert"
              placeholder="100"
              type={"number"}
            />
            <Select
              bg="rgba(42, 181, 125, 0.3)"
              color="#2AB57D"
              width="80px"
              position={"absolute"}
              right={".25rem"}
              bottom={"0.25rem"}
              borderColor="#666666"
            >
              <option value="option1">USD</option>
              <option value="option2">BTC</option>
              <option value="option3">ETH</option>
            </Select>
          </div>
          <div className="relative mt-5">
            <input
              className={`mt-3 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
              aria-label="convert"
              placeholder="100"
              type={"number"}
            />
            <Select
              bg="rgb(255, 174, 88, 0.3)"
              color="#FF7C04"
              width="80px"
              position={"absolute"}
              right={".25rem"}
              bottom={"0.25rem"}
              borderColor="#666666"
            >
              <option value="option1">USD</option>
              <option value="option2">BTC</option>
              <option value="option3">ETH</option>
            </Select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-secondary text-white text-sm lg:text-base  p-3 mt-10 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg"
        >
          Convert
        </button>
      </div>
    </Suspense>
  );
};

export default Calculator;
