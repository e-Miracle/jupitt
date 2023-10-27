import { Box, Text, Image } from "@chakra-ui/react";
import { VerticalLine } from "../assets";
import { faQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const UserVerification = () => {
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

  const StatusIcon = ({ status = "active" }) => {
    if (status !== "active") return (
      <div className={"w-[14px] h-[14px] rounded-full ml-2 bg-[#ff0000]"} />
    );
    return (
      <div className={"w-[14px] h-[14px] rounded-full ml-2 bg-[#1ba27a]"} />
    );
  };

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
              <Box sx={itemStyles} my={2}>
                <Text
                  className="font-poppins font-medium"
                  fontSize="12px"
                  color="#000"
                >
                  KYC LEVEL 1
                </Text>
                <StatusIcon />
              </Box>
              <Box sx={itemStyles} my={2}>
                <Image src={VerticalLine} alt="line" />
              </Box>
              <Box sx={itemStyles} my={2}>
                <Text
                  className="font-poppins font-medium"
                  fontSize="12px"
                  color="#000"
                >
                  KYC LEVEL 2
                </Text>
                <StatusIcon />
              </Box>
              <Box sx={itemStyles} my={2}>
                <Image src={VerticalLine} alt="line" />
              </Box>
              <Box sx={itemStyles} my={2}>
                <Text
                  className="font-poppins font-medium"
                  fontSize="12px"
                  color="#000"
                >
                  KYC LEVEL 3
                </Text>
                <StatusIcon status="error" />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
  );
};

export default UserVerification;
