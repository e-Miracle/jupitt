import { Suspense } from "react";
import Title from "../../components/title";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Box,
} from "@chakra-ui/react";
import Crypto from "./transactionlogstabs/crypto";
import Fiat from "./transactionlogstabs/fiat";
import GiftCard from "./transactionlogstabs/gift-card";
import VirtualDebitCard from "./transactionlogstabs/virtual-debit-card";
import PerfectMoney from "./transactionlogstabs/perfect-money"
export default function TransactionLog() {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Title title="Transaction Log" />
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
                  Crypto
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Fiat
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Gift Card
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Perfect Money
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Virtual Debit Card
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
              <Crypto/>
            </TabPanel>
            <TabPanel>
              <Fiat/>
            </TabPanel>
            <TabPanel>
             <GiftCard/>
            </TabPanel>
            <TabPanel>
              <PerfectMoney/>
            </TabPanel>
            <TabPanel>
             <VirtualDebitCard/>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
}
