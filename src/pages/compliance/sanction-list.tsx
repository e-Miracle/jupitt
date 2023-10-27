import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import Title from "../../components/title";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import React, { lazy, useState } from "react";
import { changeHandler } from "../../utils";
import { results, data, headers } from "../../constants";
import Table from "../../components/table";
const Filter = lazy(() => import("../../components/filter"));
export default function SanctionList() {
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = React.useState<Array<unknown>>([]);
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

  const getViewLink = (id: number | string) => `/sanction-list/user/${id}`;

  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setSearchResults([]);

    const filteredValue = results.filter((result) =>
      result.name.toLowerCase().startsWith(target.value)
    );

    if (filteredValue) setSearchResults(filteredValue);
  };
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Title title="Sanctioned Users" />
        <Tabs position="relative" className=" mt-3">
          <Box>
            <TabList
              display={"flex"}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Box className=" flex items-center">
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Sanction List
                </Tab>
              </Box>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#0D63D3"
              borderRadius="1px"
            />
          </Box>
          <TabPanels>
            <TabPanel>
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
              <Table
                headers={headers}
                data={data}
                onActionClick={handleActionClick}
                viewLink={getViewLink}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
}
