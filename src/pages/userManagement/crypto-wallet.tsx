/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import {
  Box,
  Grid,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import React from "react";
import LiveSearch from "../../components/LiveSearch/LiveSearch";
import { results } from "../../constants";
import Button from "../../components/Button/Button";
import { faLockOpen, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCard from "../../components/user-card";
import { Wallet } from "../../assets";
import User from "./user";
import Fields from "./fields";
import ConversionForm from "./conversion-form";


const CryptoWallet = () => {
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

  const [searchResults, setSearchResults] =
    React.useState<
      {
        id: string;
        name: string;
      }[]
    >();
  const [selectedProfile, setSelectedProfile] =
    React.useState<{
      id: string;
      name: string;
    }>();

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setSearchResults([]);

    const filteredValue = results.filter((result) =>
      result.name.toLowerCase().startsWith(target.value)
    );

    setSearchResults(filteredValue);
  };
  return (
    <>
      <Box>
        <Box className="flex items-center justify-between flex-wrap">
          <LiveSearch
            placeholder="Search anything here"
            results={searchResults}
            onChange={handleChange}
            onSelect={(item: any) => {
              console.log(item);
              setSelectedProfile(item);
            }}
            value={selectedProfile?.name}
            onSubmit={() => {
              if (selectedProfile) console.log(selectedProfile);
            }}
            renderItem={(item: any) => (
              <p className="text-black ">{item.name}</p>
            )}
          />
          <Box>
            <Button className=" mt-5 lg:mt-0 w-full lg:w-auto bg-background  text-sm   p-3  rounded-lg cursor-pointer hover:opacity-70 text-[#E24646] border border-[#E24646] border-dashed ">
              <FontAwesomeIcon className="mr-2" icon={faLockOpen} /> Unlock
              Profile
            </Button>

            <Button className=" mt-5 lg:mt-0  w-full lg:w-auto bg-background  text-sm   p-3  rounded-lg cursor-pointer hover:opacity-70 text-[#0D63D3] border border-secondary border-dashed lg:ml-5 ">
              <FontAwesomeIcon className="mr-2" icon={faShield} /> Unlock
              Profile
            </Button>
          </Box>
        </Box>
        <Box className="mt-5">
          <Grid
            templateColumns={{
              sm: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
              base: "repeat(1, 1fr)",
            }}
            gridGap="1rem"
          >
            {[1, 2, 3].map((item) => (
              <UserCard
                key={`index-${item}`}
                image={Wallet}
                coinName="Bitcoin"
                balance={0.5034597}
                amount={Number(3000000).toLocaleString()}
                onOpenCredit={onModal1Open}
                onOpenDebit={onModal2Open}
              />
            ))}
          </Grid>
          <div className="grid grid-cols-1 lg:grid-cols-8 gap-[1rem] mt-[1rem]">
            <div className="col-span-8 lg:col-span-5  grid grid-cols-1 lg:grid-cols-2 gap-[1rem] font-poppins">
              <Fields />
            </div>
            <div className="col-span-8 lg:col-span-3 ">
              <User />
            </div>
          </div>
        </Box>
      </Box>
      <Modal isOpen={isModal1Open} onClose={onModal1Close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-lg lg:text-xl font-bold capitalize text-center">
            Credit User
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ConversionForm />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isModal2Open} onClose={onModal2Close}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="text-lg lg:text-xl font-bold capitalize text-center">
            Debit User
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <ConversionForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CryptoWallet;
