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
import New from "./tickettabs/new";
import Going from "./tickettabs/going";
import Resolved from "./tickettabs/resolved";
import Tick from "./tickettabs/ticket";
import { Link } from "react-router-dom";
export default function Ticket() {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        {" "}
        <Title title="Tickets" number={100} />
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
                  className=" font-montserrat font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  All Tickets
                </Tab>
                <Tab
                  className=" font-montserrat font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  New
                </Tab>
                <Tab
                  className=" font-montserrat font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  On-Going
                </Tab>
                <Tab
                  className=" font-montserrat font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Resolved
                </Tab>
              </Box>
              <Link
                to={"/ticket/add"}
                className=" text-xs  bg-secondary font-medium text-white rounded-lg px-5 py-3 hover:opacity-90 flex items-center"
              >
                {" "}
                <FontAwesomeIcon
                  icon={faPlus}
                  className="mr-2 border rounded-full border-dashed p-1"
                />{" "}
                Add New Ticket
              </Link>
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
              <Tick />
            </TabPanel>
            <TabPanel>
              <New />
            </TabPanel>
            <TabPanel>
              <Going />
            </TabPanel>
            <TabPanel>
              <Resolved />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
}
