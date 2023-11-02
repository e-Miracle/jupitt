import { Box, Text, Image } from "@chakra-ui/react";
import { VerticalLine } from "../assets";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../store/hooks";
import React from "react";

const UserVerification = () => {
  const { user } = useAppSelector((state) => state.user);
  const cardStyles = {
    background: "#F1F1F1",
    borderRadius: "12px",
  };

  const itemStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  };

  const StatusIcon = ({ level = 1, tier }: { level: number; tier: number }) => {
    console.log(level, tier);
    // Check the value of the level prop and determine the icon color accordingly
    if (level >= tier) {
      return <div className="w-4 h-4 rounded-full ml-2 bg-[#1ba27a]" />;
    } else {
      return <div className="w-4 h-4 rounded-full ml-2 bg-[#ff0000]" />;
    }
  };

  const levels = [
    { id: 1, name: "KYC LEVEL 1" },
    { id: 2, name: "KYC LEVEL 2" },
    { id: 3, name: "KYC LEVEL 3" },
  ];

  return (
    <Box sx={cardStyles} className="p-5">
      <Box>
        <Box
          width="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Box className="flex items-center mb-5 ">
              <Text
                className="text-lg lg:text-xl font-poppins capitalize font-semibold "
                color={"#101828"}
              >
                User Verification
              </Text>{" "}
              <FontAwesomeIcon
                className="text-[.2rem]  text-[#98A2B3] mx-2 rounded-full border p-[0.1rem] border-[#98A2B3] w-[0.75rem] h-[0.75rem]"
                icon={faQuestion}
              />
            </Box>
            {levels.map((item) => (
              <React.Fragment key={item.id}>
                <Box sx={itemStyles} my={2}>
                  <Text
                    className="font-poppins font-medium"
                    fontSize="12px"
                    color="#000"
                  >
                    {item.name}
                  </Text>
                  <StatusIcon
                    level={user?.kyc_level ? user?.kyc_level : 0}
                    tier={item.id}
                  />
                </Box>
                <Box sx={itemStyles} my={2}>
                  <Image src={VerticalLine} alt="line" />
                </Box>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserVerification;
