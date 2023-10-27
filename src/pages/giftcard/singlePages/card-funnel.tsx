import React, { Suspense } from "react";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getCountryFlag } from "../../../utils";
import CardFunnelCard from "../../../components/card-funnel-card";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Button,
  useDisclosure,
  Text,
  Avatar,
} from "@chakra-ui/react";
import RejectCard from "../form/reject-card";
const CardFunnel = () => {
  const [flag, setFlag] = React.useState("");
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
  React.useEffect(() => {
    const init = async () => {
      const countryFlag = await getCountryFlag("usa");
      if (countryFlag) setFlag(countryFlag);
    };
    init();
  }, []);
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <div className="flex items-center justify-between border-b">
          <h3 className="  font-inter font-medium text-sm lg:text-base text-[#667085]">
            Gift Card Sell
          </h3>
          <Button
            background={"#0D63D3"}
            color={"#fff"}
            _hover={{ opacity: "80" }}
            className=" text-xs  bg-secondary font-light font-inter text-white rounded-lg px-5 py-3 hover:opacity-90 flex items-center"
          >
            {" "}
            <FontAwesomeIcon icon={faLock} className="mr-2 " /> Lock Trade
          </Button>
        </div>
        <div className="flex items-center justify-between mt-2 font-inter">
          <div className="flex items-center bg-[#FAFAFA] py-1 px-3 lg:text-lg text-base font-medium">
            <h3>Amazon</h3>
            <img
              className="w-[25px] h-[25px]  object-contain mx-3"
              src={flag}
              alt={flag}
            />
            <span className="uppercase">usa</span>
          </div>

          <div className="bg-[#FAFAFA] py-1 px-3 lg:text-lg text-base text-[#333333]">
            02-Jan-2023 06:24 AM
          </div>
        </div>
        <div className="grid  lg:grid-cols-10  mt-[1rem] justify-between gap-[1rem]">
          <div className="lg:col-span-7 ">
            <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-[1rem]">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((item) => (
                <CardFunnelCard
                  key={item}
                  higherRange={500}
                  lowerRange={100}
                  currenyShortForm="usd"
                  currency="$"
                  number={500}
                />
              ))}
            </div>
            <div className="flex items-center mt-5 lg:w-1/2 mx-auto">
              <button
                onClick={modal1OnOpen}
                className="bg-[#299063] text-white rounded-lg py-2 px-4 font-inter text-xs lg:text-sm"
              >
                Confirm Card
              </button>
              <button
                onClick={modal2OnOpen}
                className="bg-[#D64848] ml-5 text-white rounded-lg py-2 px-4 font-inter text-xs lg:text-sm"
              >
                Reject Card
              </button>
            </div>
          </div>
          <div className="lg:col-span-3">
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
            <div>
              <label
                className="text-xs text-userDetails  font-bold "
                htmlFor="name"
              >
                User ID
              </label>
              <input
                className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="firstname"
                type="text"
                defaultValue={"J-000000 "}
              />
            </div>
            <div>
              <label
                className="text-xs text-userDetails  font-bold "
                htmlFor="name"
              >
                Phone Number
              </label>
              <input
                className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="lastname"
                type="text"
                defaultValue={"+234 000 000 0000"}
              />
            </div>
            <div>
              <label
                className="text-xs text-userDetails  font-bold "
                htmlFor="name"
              >
                Fiat Wallet
              </label>
              <input
                className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                aria-label="identifier"
                type="text"
                defaultValue={"NGN"}
              />
            </div>

            <div className="bg-formBg mt-5 rounded-lg p-3 font-poppins">
              <h3 className="text-center text-base lg:text-lg ">
                Transaction Summary
              </h3>

              <div className="mt-5 grid grid-cols-3 gap-[1rem] text-[#032041] font-medium text-xs ">
                <h4>Card value</h4>
                <h4>Quantity</h4>
                <h4>Rate</h4>
              </div>

              <div className="mt-2 grid grid-cols-3 gap-[1rem] text-[#032041]  text-xs ">
                <h4>100 USD</h4>
                <h4>1</h4>
                <h4>270.00</h4>
              </div>

              <div className="border border-dashed my-5 border-coincard"/>

              <div className="mt-2 grid grid-cols-3 gap-[1rem] text-[#032041]  text-xs ">
                <h4 className="col-span-1">Payout</h4>
                <h4 className="col-span-1 text-right">72,672.00</h4>
                <h4 className="col-span-1 text-left border-l-[1px] border-coincard pl-1">NGN</h4>
              </div>

              <button className="w-full bg-submit text-white text-xs   p-3 mt-5 rounded-lg cursor-pointer hover:bg-transparent hover:text-textForm   hover:bg-formBg">
                Approve Payout
              </button>
            </div>
          </div>
        </div>
      </Box>
      <Modal isOpen={modal1IsOpen} onClose={modal1OnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="mt-5 font-poppins text-base lg:text-lg text-center">
            Confirm Card
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RejectCard />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={modal2IsOpen} onClose={modal2OnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="mt-5 font-poppins text-base lg:text-lg text-center">
            Reject Card
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <RejectCard />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Suspense>
  );
};

export default CardFunnel;
