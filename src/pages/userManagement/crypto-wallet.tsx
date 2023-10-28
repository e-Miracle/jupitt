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
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import LiveSearch from "../../components/LiveSearch/LiveSearch";
import { results, userDashboard } from "../../constants";
import { faLockOpen, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserCard from "../../components/user-card";
import User from "./user";
import Fields from "./fields";
import CryptoForm from "./crypto-form";
import FiatForm from "./fiat-form";
import {
  creditCrypto,
  debitCrypto,
  creditFiat,
  debitFiat,
  disable2Fa,
} from "../../store/non-reducer-actions.ts";
import { ISubmitCrypto } from "./crypto-form";
import { ISubmitFiat } from "./fiat-form";
import { useAppSelector } from "../../store/hooks";

const crpytoExchange = async (values: ISubmitCrypto) => {
  const { action, ...rest } = values;
  if (action === "credit") {
    await creditCrypto(rest);
  }
  if (action === "debit") {
    await debitCrypto(rest);
  }
};

const fiatExchange = async (values: ISubmitFiat) => {
  const { action, ...rest } = values;
  console.log("values", values);
  if (action === "credit") {
    await creditFiat(rest);
  }
  if (action === "debit") {
    await debitFiat(rest);
  }
};

const CryptoWallet = () => {
  const { user } = useAppSelector((state) => state.user);
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

  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLoading = () => setLoading((k) => !k);
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
  const disable = async () => {
    handleLoading();
    if (user) await disable2Fa(user?.identifier, () => handleLoading());
  };
  return (
    <>
      <Box>
        <Box className="flex items-center justify-between flex-wrap ">
          <div className="w-full lg:max-w-[300px]">
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
          </div>
          <Box className=" w-full lg:w-auto flex justify-end items-center flex-wrap">
            <Button className=" mt-5 lg:mt-0 w-full lg:w-auto bg-background  text-sm   p-3  rounded-lg cursor-pointer hover:opacity-70 text-[#E24646] border border-[#E24646] border-dashed ">
              <FontAwesomeIcon className="mr-2" icon={faLockOpen} /> Unlock
              Profile
            </Button>

            <Button
              isLoading={loading}
              onClick={disable}
              className=" mt-5 lg:mt-0  w-full lg:w-auto bg-background  text-sm   p-3  rounded-lg cursor-pointer hover:opacity-70 text-[#0D63D3] border border-secondary border-dashed lg:ml-5 "
            >
              <FontAwesomeIcon className="mr-2" icon={faShield} /> disable 2fa
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
            {userDashboard.map((item) => (
              <UserCard
                key={`index-${item.coinName}`}
                type={item.type}
                image={item.image}
                coinName={item.coinName}
                balance={item.balance}
                amount={Number(item.amount).toLocaleString()}
                onOpenCredit={() => {
                  setType(item.type);
                  onModal1Open();
                }}
                onOpenDebit={() => {
                  setType(item.type);
                  onModal2Open();
                }}
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
            {type === "crypto" && (
              <CryptoForm action="credit" handleConvert={crpytoExchange} />
            )}
            {type === "fiat" && (
              <FiatForm action="credit" handleConvert={fiatExchange} />
            )}
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
            {type === "crypto" && (
              <CryptoForm action="debit" handleConvert={crpytoExchange} />
            )}
            {type === "fiat" && (
              <FiatForm action="debit" handleConvert={fiatExchange} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CryptoWallet;
