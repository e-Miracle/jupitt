import React, { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import Title from "../../../components/title";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import UserData from "../sanctiontabs/user-data";
import BankAccount from "../sanctiontabs/bank-account";
import CryptoAddress from "../sanctiontabs/crypto-address";
const Sanction = () => {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        {" "}
        <Title backBtn={true} title="User Profile" />
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
                  User Data
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Bank Account
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Crypto Address
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
          <div className="border-b"></div>
          <TabPanels>
            <TabPanel>
              <UserData />
            </TabPanel>
            <TabPanel>
              <BankAccount />
            </TabPanel>
            <TabPanel>
              <CryptoAddress />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
};

export default Sanction;
