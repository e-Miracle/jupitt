import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import Title from "../../../components/title";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Avatar,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import ViewDownload from "../../../components/view-download";
export default function SanctionList() {
  const handleDownload = async () => {};
  const {
    isOpen: modal1IsOpen,
    onOpen: modal1OnOpen,
    onClose: modal1OnClose,
  } = useDisclosure();
  const {
    isOpen: modal2IsOpen,
    onOpen: modal2OnOpen,
    onClose: modal2OnClose,
  } = useDisclosure();
  const {
    isOpen: modal3IsOpen,
    onOpen: modal3OnOpen,
    onClose: modal3OnClose,
  } = useDisclosure();
  const {
    isOpen: modal4IsOpen,
    onOpen: modal4OnOpen,
    onClose: modal4OnClose,
  } = useDisclosure();
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Title backBtn title="KYC Management" />
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
                  User Verification Document
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
              <div className="flex items-center space-x-2 border-b pb-5">
                <Avatar
                  name={"Tanner Finsha"}
                  src={"http://via.placeholder.com/500x500"}
                />
                <div>
                  <Text className="font-medium">Tanner Finsha</Text>
                  <Text fontSize="sm" color="gray.500">
                    Tannerfisher@gmail.com
                  </Text>
                </div>
              </div>
              <ViewDownload
                title="Selfie"
                handleView={modal1OnOpen}
                handleDownload={handleDownload}
              />
              <ViewDownload
                title="Identity Document"
                handleView={modal2OnOpen}
                handleDownload={handleDownload}
              />
              <ViewDownload
                title="Proof of Address"
                handleView={modal3OnOpen}
                handleDownload={handleDownload}
              />
              <ViewDownload
                title="Proof of Income"
                handleView={modal4OnOpen}
                handleDownload={handleDownload}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
      <Modal isOpen={modal1IsOpen} onClose={modal1OnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-base lg:text-lg font-semibold text-center">
            Document
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid lg:grid-cols-2 gap-[1rem] ">
              <div>
                {" "}
                <div className="w-full h-[180px] rounded-xl border border-secondary">
                  <img
                    className="w-full rounded-xl object-contain  h-full"
                    src="http://via.placeholder.com/100x100"
                    alt="http://via.placeholder.com/100x100"
                  />
                </div>
                <h3 className="text-center mt-2 text-sm lg:text-base font-semibold">
                  Front of Card
                </h3>
              </div>
              <div>
                {" "}
                <div className="w-full h-[180px] rounded-xl border border-secondary">
                  <img
                    className="w-full rounded-xl object-contain  h-full"
                    src="http://via.placeholder.com/100x100"
                    alt="http://via.placeholder.com/100x100"
                  />
                </div>
                <h3 className="text-center mt-2 text-sm lg:text-base font-semibold">
                  Back of Card
                </h3>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={modal2IsOpen} onClose={modal2OnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid lg:grid-cols-2 gap-[1rem] ">
              <div>
                {" "}
                <div className="w-full h-[180px] rounded-xl border border-secondary">
                  <img
                    className="w-full rounded-xl object-contain  h-full"
                    src="http://via.placeholder.com/100x100"
                    alt="http://via.placeholder.com/100x100"
                  />
                </div>
                <h3 className="text-center mt-2 text-sm lg:text-base font-semibold">
                  Front of Card
                </h3>
              </div>
              <div>
                {" "}
                <div className="w-full h-[180px] rounded-xl border border-secondary">
                  <img
                    className="w-full rounded-xl object-contain  h-full"
                    src="http://via.placeholder.com/100x100"
                    alt="http://via.placeholder.com/100x100"
                  />
                </div>
                <h3 className="text-center mt-2 text-sm lg:text-base font-semibold">
                  Back of Card
                </h3>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={modal3IsOpen} onClose={modal3OnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid lg:grid-cols-2 gap-[1rem] ">
              <div>
                {" "}
                <div className="w-full h-[180px] rounded-xl border border-secondary">
                  <img
                    className="w-full rounded-xl object-contain  h-full"
                    src="http://via.placeholder.com/100x100"
                    alt="http://via.placeholder.com/100x100"
                  />
                </div>
                <h3 className="text-center mt-2 text-sm lg:text-base font-semibold">
                  Front of Card
                </h3>
              </div>
              <div>
                {" "}
                <div className="w-full h-[180px] rounded-xl border border-secondary">
                  <img
                    className="w-full rounded-xl object-contain  h-full"
                    src="http://via.placeholder.com/100x100"
                    alt="http://via.placeholder.com/100x100"
                  />
                </div>
                <h3 className="text-center mt-2 text-sm lg:text-base font-semibold">
                  Back of Card
                </h3>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={modal4IsOpen} onClose={modal4OnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <div className="grid lg:grid-cols-2 gap-[1rem] ">
              <div>
                {" "}
                <div className="w-full h-[180px] rounded-xl border border-secondary">
                  <img
                    className="w-full rounded-xl object-contain  h-full"
                    src="http://via.placeholder.com/100x100"
                    alt="http://via.placeholder.com/100x100"
                  />
                </div>
                <h3 className="text-center mt-2 text-sm lg:text-base font-semibold">
                  Front of Card
                </h3>
              </div>
              <div>
                {" "}
                <div className="w-full h-[180px] rounded-xl border border-secondary">
                  <img
                    className="w-full rounded-xl object-contain  h-full"
                    src="http://via.placeholder.com/100x100"
                    alt="http://via.placeholder.com/100x100"
                  />
                </div>
                <h3 className="text-center mt-2 text-sm lg:text-base font-semibold">
                  Back of Card
                </h3>
              </div>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Suspense>
  );
}
