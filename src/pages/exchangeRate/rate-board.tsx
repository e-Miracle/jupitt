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
import Crypto from "./rateboardtabs/crypto";
import RateBoardGiftcard from "./rateboardtabs/giftcard"
import Swap from "./rateboardtabs/swap";
import PerfectRate from "./rateboardtabs/perfect-rate";
import VirtualBoard from "./rateboardtabs/virtual-board";
export default function RateBoard() {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Title title="RateBoard" />
        </Box>

        <Tabs position="relative" className=" mt-3">
          <div className="relative overflow-x-auto whitespace-nowrap">
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
                  Gift Card
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Swap
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Perfect Rate
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Virtual Card
                </Tab>
              </Box>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="#0D63D3"
              borderRadius="1px"
            />
          </div>
          <TabPanels>
            <TabPanel>
              <Crypto />
            </TabPanel>
            <TabPanel>
              <RateBoardGiftcard />
            </TabPanel>
            <TabPanel>
              <Swap />
            </TabPanel>
            <TabPanel>
              <PerfectRate />
            </TabPanel>
            <TabPanel>
              <VirtualBoard />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
}
