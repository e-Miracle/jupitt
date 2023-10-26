import { useState, Suspense } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import Title from "../../../components/title";
import EditFaceValueForm from "../form/edit-face-value-form";

const Card = () => {
  const { id } = useParams();
  const [checked, setChecked] = useState(false);
  const handleToggle = () => setChecked((k) => !k);
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Title title="Gift Card Details" backBtn={true} />
        </Box>
        <h3 className="text-base lg:text-xl my-3 font-semibold font-poppins">
          Amazon GiftCard
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-[1rem] mt-[1rem]">
          <div className=" lg:col-span-4 border border-[#E6E7EC] rounded-md p-5">
            <img
              src="http://via.placeholder.com/500x500"
              alt="giftcard"
              className="w-full h-[200px] lg:h-[250px] object-cover rounded-xl"
            />

            <h3 className="text-sm lg:text-base uppercase mt-5 font-semibold font-poppins flex items-center">
              Amazon Gift Card{" "}
              <span className="inline ml-2 text-white bg-[#81C868] rounded-sm text-[.5rem]  px-1">
                Active
              </span>
            </h3>

            <p className="mt-3 text-xs lg:text-sm text-[#9DA8B6]">
              Created At:{" "}
              <span className="font-semibold text-[#1D1E2C]">
                12th Feb. 2019
              </span>
            </p>

            <p className="mt-3 text-xs lg:text-sm text-[#9DA8B6]">
              Created By:{" "}
              <span className="font-semibold text-[#1D1E2C]">
                Chris - #234554G
              </span>
            </p>

            <p className="mt-3 text-xs lg:text-sm text-[#9DA8B6]">
              Total Vendor Assigned to:{" "}
              <span className="font-semibold text-[#1D1E2C]">4</span>
            </p>
            <div className="mt-5">
              <Button
                className="text-secondary border border-secondary font-poppins text-xs lg:text-sm hover:opacity-80"
                color={"#0D63D3"}
                background={"none"}
                fontSize={{ base: "0.7rem", md: "0.875rem", lg: "0.875rem" }}
                _hover={{ background: "none" }}
              >
                Edit Card
              </Button>
              <Button
                className=" ml-5 border border-[#F60813] font-poppins text-xs lg:text-sm hover:opacity-80"
                color={"#F60813"}
                background={"none"}
                fontSize={{ base: "0.7rem", md: "0.875rem", lg: "0.875rem" }}
                _hover={{ background: "none" }}
              >
                Suspend
              </Button>
            </div>
          </div>
          <div className=" lg:col-span-5 border border-[#E6E7EC] rounded-md p-5">
            <h2 className="text-sm lg:text-base  font-semibold font-poppins">
              Card Currency Variation
            </h2>

            <div className="mt-5 bg-[#F1F1F1] p-3 rounded-lg grid grid-cols-10 gap-[1rem] font-poppins">
              <h3 className="col-span-2 text-xs lg:text-sm text-[#333333] font-semibold">
                Gift Card
              </h3>
              <h3 className="col-span-4 text-xs lg:text-sm text-[#333333] font-semibold ">
                Country / Currency
              </h3>
              <h3 className="col-span-2 text-xs lg:text-sm text-[#333333] font-semibold">
                Face Value
              </h3>
            </div>

            <div className="mt-5 p-3  grid grid-cols-10 gap-[1rem] font-poppins">
              <h3 className="col-span-2 text-xs lg:text-sm text-[#666666] ">
                Amazon
              </h3>
              <h3 className="col-span-4 text-xs lg:text-sm text-[#666666] ">
                Canada / CAD
              </h3>
              <div className="col-span-2 text-xs lg:text-sm text-[#666666] ">
                <button
                  onClick={onOpen}
                  className="text-secondary hover:opacity-90"
                >
                  Update
                </button>
              </div>

              <label className="relative inline-block w-10 h-5 bg-lightgreen rounded-xl cursor-pointer">
                <input
                  type="checkbox"
                  className="hidden"
                  checked={checked}
                  onChange={handleToggle}
                />
                <span
                  className={`absolute block mt-[.1rem] ml-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 transform ${
                    checked ? "translate-x-4" : ""
                  }`}
                />
              </label>
            </div>
          </div>
        </div>
        Card {id}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="font-poppins text-base lg:text-lg text-center mt-5 font-bold">
            Select Face Value Variation
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditFaceValueForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Suspense>
  );
};

export default Card;
