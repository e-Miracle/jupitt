import React from "react";
import {
  faMinusCircle,
  faTrash,
  faClipboard,
  faCircleDot
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
type Props = {
  code: string;
  image: string;
  name: string;
  gender: string;
  role: string;
  joined: string;
  status: "active" | "inactive" | "flagged";
  handleDelete: () => void;
  handleDeactivate: () => void;
};

const color = {
  active: "#1FCB4F",
  inactive: "#EB5757",
  flagged: "#0D63D3",
};

const background = {
  inactive: "rgba(255, 154, 152, 0.3)",
  active: "rgba(42, 181, 125, 0.3)",
  flagged: "rgb(13, 99, 211,0.3)",
};

const StaffCard: React.FC<Props> = ({
  code,
  image,
  name,
  gender,
  role,
  joined,
  status,
  handleDelete,
  handleDeactivate,
}) => {
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
      <div className="w-full bg-form rounded-lg p-3 flex flex-wrap flex-col items-center font-poppins">
        <h5 className="text-sm lg:text-base text-[#333333]">
          {code} <FontAwesomeIcon icon={faClipboard} className="ml-2" />
        </h5>
        <div className="mt-5  w-[150px] lg:w-[180px] h-[150px] lg:h-[180px]">
          <img
            src={image}
            alt={image}
            className="w-full h-full rounded-full object-cover"
          />
        </div>
        <h3 className="mt-4 capitalize font-semibold text-sm lg:text-base ">
          {name}
        </h3>
        <p className="text-coincard text-xs lg:text-sm mt-2">{gender}</p>
        <p className="text-coincard text-xs lg:text-sm mt-2">{role}</p>
        <p className="text-coincard text-xs lg:text-sm mt-2">
          Joined: {joined}
        </p>
        <p
          className=" text-xs lg:text-sm mt-2 rounded-xl p-1"
          style={{ color: color[status], background: background[status] }}
        >
          <FontAwesomeIcon icon={faCircleDot} className="ml-2" /> {status}
        </p>
        <div className=" flex items-center mt-5" >
          <button
            onClick={onModal1Open}
            className="block border border-darkred text-darkred  rounded-lg px-5 py-3 hover:opacity-90"
          >
            <FontAwesomeIcon icon={faMinusCircle} className="mr-2" />
            Deactivate MFA
          </button>
          <button
            onClick={onModal2Open}
            className="text-2xl hover:opacity-95  text-darkred ml-5"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <Modal isOpen={isModal1Open} onClose={onModal1Close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-lg lg:text-xl font-bold capitalize text-center">
            Are you sure you want to deactivate this user?
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModal1Close}>
              Close
            </Button>
            <Button onClick={handleDeactivate} variant="ghost">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isModal2Open} onClose={onModal2Close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-lg lg:text-xl font-bold capitalize text-center">
            Are you sure you want to delete this user?
          </ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onModal2Close}>
              Close
            </Button>
            <Button onClick={handleDelete} variant="ghost">
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default StaffCard;
