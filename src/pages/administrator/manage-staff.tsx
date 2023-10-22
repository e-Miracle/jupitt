import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import Title from "../../components/title";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Staffs from "./tabs/staffs";
import Permissions from "./tabs/permissions";

export default function ManageStaff() {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        {" "}
        <Title title="Staff Management" number={100} />
        <Box>
          <Tabs position="relative" className=" mt-7">
            <Box className="flex items-end justify-between flex-wrap">
              <TabList>
                <Tab className="text-coincard text-xs font-inter">Staffs</Tab>
                <Tab className="text-coincard text-xs font-inter">
                  Permissions
                </Tab>
              </TabList>

              <Link
                to="/manage-staff/staff/create"
                className="block bg-secondary text-white rounded-lg px-5 py-3 hover:opacity-90"
              >
                {" "}
                <FontAwesomeIcon icon={faPlusCircle} className="mr-2" /> New
                Staff
              </Link>
            </Box>
            <TabPanels>
              <TabPanel>
                <Staffs />
              </TabPanel>
              <TabPanel>
                <Permissions />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Suspense>
  );
}
