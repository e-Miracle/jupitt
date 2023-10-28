import { useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getById } from "../../store/reducers/users";
import { useParams } from "react-router-dom";
import LoadingTable from "../../components/table-loader";
export default function SingleUser() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) dispatch(getById(id));
  }, [dispatch, id]);
  const { user, loading } = useAppSelector((state) => state.user);
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
          <Title
            title="User Profile"
            status={
              (user && user.is_suspended === true) ||
              (user && user.is_blacklisted === true)
                ? "inactive"
                : "active"
            }
            backBtn
          />
        </Box>
        {loading && (
          <LoadingTable
            rows={15}
            columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
          />
        )}
        {!loading && user && (
          <Tabs position="relative" className=" mt-7">
            <div className="relative overflow-x-auto whitespace-nowrap">
              <TabList>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Crypto Wallets
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Fiat Wallets
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
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Transactions
                </Tab>
              </TabList>
            </div>
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
        )}
      </Box>
    </Suspense>
  );
}
