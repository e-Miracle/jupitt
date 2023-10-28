import { Box } from "@chakra-ui/react";
import { Suspense, useRef } from "react";
import Title from "../../components/title";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
} from "@chakra-ui/react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AddCardForm from "./form/add-Card";
import CatalogueBuy from "./tabs/catalogue-buy";
export default function GiftCardManagement() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Title title="Manage Gift Cards" number={100} />
        </Box>
        <Box>
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
                    ref={finalRef}
                  >
                    Catalog (Buy)
                  </Tab>
                  <Tab
                    className=" font-inter font-medium"
                    fontSize={"14px"}
                    color={"#667085"}
                    fontFamily={"Inter"}
                    _selected={{ color: "#0D63D3" }}
                  >
                    Catalog (Sell)
                  </Tab>
                </Box>
                <Button
                  onClick={onOpen}
                  background={"#0D63D3"}
                  color={"#fff"}
                  className=" text-xs  bg-secondary font-medium text-white rounded-lg px-5 py-3 hover:opacity-90 flex items-center"
                >
                  {" "}
                  <FontAwesomeIcon
                    icon={faPlus}
                    className="mr-2 border rounded-full border-dashed p-1"
                  />{" "}
                  Add New Card
                </Button>
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
                <CatalogueBuy />
              </TabPanel>
              <TabPanel>two</TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
      <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="font-poppins text-base lg:text-lg text-center mt-5 font-bold">
            Add New Gift Card
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AddCardForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Suspense>
  );
}
