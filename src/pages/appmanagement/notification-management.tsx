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
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Banner from "./notificationtabs/banner";
import Faq from "./notificationtabs/faq";
import Message from "./notificationtabs/message";
import Policies from "./notificationtabs/policies"
export default function NotificationManagement() {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        {" "}
        <Title title="Notification Management" />
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
                  App Banner
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  FAQs
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Notification Message
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Policies
                </Tab>
              </Box>
              <button className=" w-[95%] md:w-auto sticky mx-auto md:mx-0  text-xs  bg-secondary font-medium text-white rounded-lg px-5 py-3 hover:opacity-90 flex items-center justify-center">
                {" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2 border rounded-full border-dashed p-1"
                />{" "}
                Add FAQ
              </button>
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
              <Banner />
            </TabPanel>
            <TabPanel>
              <Faq />
            </TabPanel>
            <TabPanel>
              <Message />
            </TabPanel>
            <TabPanel>
              <Policies />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
}
