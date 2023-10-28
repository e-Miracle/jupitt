import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { reasons } from "../../constants";
import CaseForm from "./case-form";
import UserVerification from "../../components/user-verification";

const User = () => {
  const {
    isOpen: isModal1Open,
    onOpen: onModal1Open,
    onClose: onModal1Close,
  } = useDisclosure();
  const {
    isOpen: isModal2Open,
    onOpen: onModal2Open,
    onClose: onModal2Close,
  } = useDisclosure();
  return (
    <>
      <UserVerification />
      {/* <div className="bg-formBg rounded-lg p-5">
        <h3 className="capitalize text-base lg:text-lg font-semibold text-center">
          {" "}
          User Verification{" "}
          <FontAwesomeIcon
            className="text-sm lg:text-base text-secondary mx-2"
            icon={faQuestionCircle}
          />
        </h3>
        <Box className="flex justify-center items-center mt-3">
          <Stepper
            index={activeStep}
            orientation="vertical"
            height="200px"
            width={"150px"}
            size="sm"
            gap="0"
          >
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>

                <Box flexShrink="0">
                  <StepTitle className="text-xs font-inter">
                    {step.title}
                  </StepTitle>
                </Box>

                <StepSeparator />
              </Step>
            ))}
          </Stepper>
        </Box>
      </div> */}
      <div className="flex  flex-wrap justify-between items-center mt-5">
        <button
          onClick={onModal1Open}
          className=" w-full  lg:w-[48%] bg-background  text-sm   p-3  rounded-lg cursor-pointer hover:opacity-70 text-[#0E2354] border border-[#E24646] border-dashed "
        >
          <FontAwesomeIcon className="mr-2" icon={faMinusCircle} />
          Suspend User
        </button>
        <button
          onClick={onModal2Open}
          className=" mt-5 lg:mt-0 w-full lg:w-[48%] bg-background  text-sm   p-3  rounded-lg cursor-pointer hover:opacity-70 text-[#0E2354] border border-black border-dashed "
        >
          <FontAwesomeIcon className="mr-2" icon={faMinusCircle} />
          Blacklist User
        </button>
      </div>
      <Modal isOpen={isModal1Open} onClose={onModal1Close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-lg lg:text-xl font-bold capitalize text-center">
            Suspend User
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CaseForm reasons={reasons} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isModal2Open} onClose={onModal2Close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-lg lg:text-xl font-bold capitalize text-center">
            Blacklist User
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <CaseForm reasons={reasons} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default User;
