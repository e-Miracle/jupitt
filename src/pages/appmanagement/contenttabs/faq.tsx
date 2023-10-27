import React from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import { Copy } from "../../../assets";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box
} from "@chakra-ui/react";
const Filter = React.lazy(() => import("../../../components/filter"));
const Faq = () => {
  const [value, setValue] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<Array<unknown>>([]);
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
  return (
    <div>
      {" "}
      <Filter
        className="mt-2"
        data={searchResults}
        handleFilter={handleFilter}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        value={value}
        handleSelect={(item) => setValue(item)}
        random={false}
        exported={false}
      />
      <div className="flex justify-end items-end my-5 border border-white border-dashed">
        <button className=" text-xs  bg-secondary font-medium text-white rounded-lg px-5 py-3 hover:opacity-90 flex items-center">
          <img src={Copy} alt={Copy} className="mr-2" /> Edit FAQ
        </button>
      </div>
      <Accordion defaultIndex={[0]} allowMultiple>
        <AccordionItem className="border rounded-lg mt-5">
          <h2 className=" font-inter text-xs lg:text-sm">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Accordion
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            className="font-montserrat text-[#84818A] text-xs lg:text-sm"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem className="border rounded-lg mt-5">
          <h2 className=" font-inter text-xs lg:text-sm">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                Accordion
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            pb={4}
            className="font-montserrat text-[#84818A] text-xs lg:text-sm"
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Faq;
