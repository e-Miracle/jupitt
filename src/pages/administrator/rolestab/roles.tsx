import React, { useState, lazy } from "react";
import { changeHandler } from "../../../utils";
import { results } from "../../../constants";
import {
  Box,
  Button,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import RolesCardComponent from "../../../components/roles-card";
const Filter = lazy(() => import("../../../components/filter"));
const images = [
  { alt: "Avatar 1", img: "image_url1" },
  { alt: "Avatar 2", img: "image_url2" },
  { alt: "Avatar 3", img: "image_url3" },
  { alt: "Avatar 1", img: "image_url1" },
  { alt: "Avatar 2", img: "image_url2" },
  { alt: "Avatar 3", img: "image_url3" },
];
const Roles = () => {
  

  const tableTopButtonStyles = {
    fontSize: "14px",
    borderWidth: "1px",
  };
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
  return (
    <>
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
          exported={false}
        />
        <div className="mt-5 grid lg:grid-cols-2 gap-[1rem]">
          {[1, 2, 3, 4].map((item) => (
            <RolesCardComponent
              avatarGroup={images}
              title="Solution Sales Specialist"
              content="Responsible for driving revenue growth by identifying and pursuing new business opportunities, as well as maintaining relationships with existing clients. working closely with customers to understand their needs and provide solutions that meet or exceed their expectations, while also achieving the company's sales goals."
              tags={["Marketing", "Product", "Engineering", "Design"]}
              profileImage="James campion"
              name="James campion"
              position="Manager"
              key={item}
            />
          ))}
        </div>
        <Box
          my={4}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            size="sm"
            variant="outline"
            sx={tableTopButtonStyles}
            leftIcon={<ArrowBackIcon />}
          >
            Previous
          </Button>
          {/* <Pagination count={10} shape="rounded" hideNextButton hidePrevButton /> */}
          <Button
            size="sm"
            variant="outline"
            sx={tableTopButtonStyles}
            rightIcon={<ArrowForwardIcon />}
          >
            Next
          </Button>
        </Box>
      </div>
      
      
    </>
  );
};

export default Roles;
