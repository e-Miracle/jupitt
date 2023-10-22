import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import { Suspense } from "react";
import Title from "../../components/title";
import Transaction from "./transaction";
import CryptoWallet from "./crypto-wallet";
export default function SingleUser() {
  return (
    <Suspense>
      <Box
        className="font-inter"
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Box display={"flex "} alignItems={"center"}>
          <Title title="User Profile" status="active" backBtn />
        </Box>
        <Tabs position="relative" className=" mt-7">
          <TabList>
            <Tab className="text-coincard text-xs">Crypto Wallets</Tab>
            <Tab>Fiat Wallets</Tab>
            <Tab>Virtual Debit Card</Tab>
            <Tab>Transactions</Tab>
          </TabList>
          <TabIndicator
            color="#0D63D3"
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              <CryptoWallet />
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
            <TabPanel>
              <p>three!</p>
            </TabPanel>
            <TabPanel>
              <Transaction />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
}
