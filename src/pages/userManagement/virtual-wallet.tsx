/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import { Box, Grid, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LiveSearch from "../../components/LiveSearch/LiveSearch";
import { results } from "../../constants";
import { faLockOpen, faShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import User from "./user";
import Fields from "./fields";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { getVcDetails } from "../../store/reducers/users.ts";
import { useParams } from "react-router-dom";
import CardLoader from "../../components/card-loader.tsx";
import { WhiteLogo } from "../../assets/index.ts";

const CryptoWallet = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getVcDetails(String(id)));
  }, [dispatch, id]);
  const { userVc, userVcLoading } = useAppSelector((state) => state.user);
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
            {userVcLoading && <CardLoader />}
            {!userVcLoading && userVc && (
              <div
                style={{
                  background:
                    "linear-gradient(99.84deg, #15AF94 0.47%, #2D3306 55.82%, #031D07 85.51%)",
                }}
                className="p-5  rounded-xl font-poppins text-white"
              >
                <img src={WhiteLogo} alt={WhiteLogo} />
                <h3 className="my-5 text-lg lg:text-xl font-semibold">
                  {userVc?.masked_card_number}
                </h3>

                <div>
                  <h5 className="capitalize text-[0.7rem] lg:text-xs font-medium">
                    balance
                  </h5>
                  <p className="text-xs lg:text-sm font-bold mt-1">
                    ${userVc?.balance}
                  </p>
                </div>
              </div>
            )}
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
    </>
  );
};

export default CryptoWallet;
