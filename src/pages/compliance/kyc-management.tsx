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
import { results } from "../../constants";
import Table from "../../components/table";
const Filter = lazy(() => import("../../components/filter"));
export default function KycManagement() {
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

  const getViewLink = (id: number | string) => `/kyc-management/user/${id}`;

  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setSearchResults([]);

    const filteredValue = results.filter((result) =>
      result.name.toLowerCase().startsWith(target.value)
    );

    if (filteredValue) setSearchResults(filteredValue);
  };
  const headers = [
    { key: "user", label: "Name" },
    { key: "status", label: "Status" },
    { key: "user_country", label: "User Country" },
    { key: "kyc_level", label: "KYC Level" },
    { key: "user_id", label: "User ID" },
    { key: "time", label: "Date Submitted" },
  ];

  const data = [
    {
      id: 1,
      name: "Alice",
      status: "active",
      user_country: "Nigeria",
      kyc_level: "Level 1",
      user_id: "J394300",
      email: "alice@example.com",
      image: "https://example.com/alice.jpg",
      time: "2023-10-15 03:28 AM",
    },
    {
      id: 2,
      name: "Alice",
      status: "active",
      user_country: "Nigeria",
      kyc_level: "Level 1",
      user_id: "J394300",
      email: "alice@example.com",
      image: "https://example.com/alice.jpg",
      time: "2023-10-15 03:28 AM",
    },
    // Add more data here as needed
  ];
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Title title="KYC Management" number={100} />
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
                  User Verification List
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
              {" "}
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
                moreSection
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
}
