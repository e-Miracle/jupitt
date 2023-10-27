import { Box } from "@chakra-ui/react";
import React, { Suspense } from "react";
import Title from "../../components/title";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { faBriefcase, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Roles from "./rolestab/roles";
import Permission from "./rolestab/permission";
import { Search } from "../../assets";
import StaffAssignCard from "../../components/staff-assign-card";
import CreateRole from "./forms/create-role";
export default function ManageRoles() {
  const [value, setValue] = React.useState("");
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;
    setValue(target.value);
  };
  const {
    isOpen: Modal1IsOpen,
    onOpen: Modal1OnOpen,
    onClose: Modal1OnClose,
  } = useDisclosure();

  const {
    isOpen: Modal2IsOpen,
    onOpen: Modal2OnOpen,
    onClose: Modal2OnClose,
  } = useDisclosure();
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Title title="Staff Management" number={100} />
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
                  All Roles
                </Tab>
                <Tab
                  className=" font-inter font-medium"
                  fontSize={"14px"}
                  color={"#667085"}
                  fontFamily={"Inter"}
                  _selected={{ color: "#0D63D3" }}
                >
                  Permission
                </Tab>
              </Box>
              <Box className="flex items-center">
                <button
                  onClick={Modal1OnOpen}
                  className="  text-xs font-inter  border font-medium text-[#0E2354] rounded-lg px-5 py-3 hover:opacity-90 flex items-center"
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="mr-2 border rounded-full border-dashed p-1"
                  />{" "}
                  Assign
                </button>
                <button
                  onClick={Modal2OnOpen}
                  className="ml-2 text-xs  font-inter   bg-secondary font-medium text-white rounded-lg px-5 py-3 hover:opacity-90 flex items-center"
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="mr-2 border rounded-full border-dashed p-1"
                  />{" "}
                  New Role
                </button>
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
              <Roles />
            </TabPanel>
            <TabPanel>
              <Permission />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Modal isOpen={Modal1IsOpen} onClose={Modal1OnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <button className="text-secondary bg-[#E3F1FB] rounded-full p-1 text-sm lg:text-base w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] flex items-center justify-center">
              <FontAwesomeIcon icon={faBriefcase} />
            </button>
            <h3 className="font-inter text-lg lg:text-xl my-2 ">
              Assign this role
            </h3>
            <p className="text-xs lg:text-sm text-[#666666]">
              Select one or multiple employees to assign to this role{" "}
              <span className="text-secondary">“Senior Design Lead “</span>
            </p>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className=" flex items-center justify-between w-full border  px-5 py-3 text-xs lg:text-sm rounded-[10px] text-black placeholder:text-[#D1D1D1] shadow-[0px 4px 4px rgba(0, 0, 0, 0.1)] focus:border-[#D1D1D1] transition">
              <button className="text-[#667085] cursor-pointer">
                <img src={Search} alt={Search} />
              </button>
              <input
                type="text"
                value={value}
                onChange={handleChange}
                className=" p-0 outline-none transition w-[90%]  focus:border-none focus:outline-none bg-white focus:border-white  border-white border-transparent focus:border-transparent focus:ring-0 "
                placeholder={"Search for a Staff"}
              />
            </div>
            <div className="border p-1 my-2">
              {[1, 2, 3, 4, 5].map((item) => (
                <StaffAssignCard
                  key={item}
                  name="Tassy Omah"
                  imgUrl="TassyOmah"
                  email="Developer Relations, Payments"
                />
              ))}
            </div>
            <button
              type="submit"
              className="w-full bg-[#1C1C93] text-[#FAFAFA] text-sm lg:text-base  p-3  rounded-lg cursor-pointer hover:bg-white hover:text-[#1C1C93] capitalize font-semibold"
            >
              Assign
            </button>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal isOpen={Modal2IsOpen} onClose={Modal2OnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {" "}
            <button className="text-secondary bg-[#E3F1FB] rounded-full p-1 text-sm lg:text-base w-[30px] h-[30px] lg:w-[50px] lg:h-[50px] flex items-center justify-center">
              <FontAwesomeIcon icon={faBriefcase} />
            </button>
            <h3 className="font-inter text-lg lg:text-xl my-2 ">
              Create a role
            </h3>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateRole />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Suspense>
  );
}
