import {
  Box,
  Text,
  Flex,
  Avatar,
  AvatarGroup,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";



type Props = {
  title: string;
  avatarGroup: Array<{ alt: string; img: string }>;
  content: string;
  tags: Array<string>;
  profileImage: string;
  name: string;
  position: string;
};

const RolesCardComponent: React.FC<Props> = ({
    title,
    avatarGroup,
    content,
    tags,
    profileImage,
    name,
    position
}) => {
  return (
    <div   className="font-inter border rounded-lg p-4">
      <Flex flexWrap={"wrap"} justifyContent="space-between" alignItems="center" mb={2}>
        <Text fontSize={{ base: "16px", lg: "18px" }} color="#091E42">
          {title}
        </Text>
        <Flex gap="10px" alignItems="center">
          <AvatarGroup size="sm" max={5}>
            {avatarGroup.map((item) => (
              <Avatar p={2} name={item.alt} src={item.img} key={item.alt} />
            ))}
          </AvatarGroup>
          <Box
            w="25px"
            h="25px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            border="2px dotted #98A2B3"
            borderRadius="50%"
            cursor="pointer"
          >
            <AiOutlineArrowRight color="#98A2B3" />
          </Box>
        </Flex>
      </Flex>
      <Box mt={1}>
        <Text fontSize="14px" color="gray.500">
          {content}
        </Text>
      </Box>
      <div className=" flex flex-wrap">
        {tags.map((item) => (
          <Box
            key={item}
            p="2px 8px"
            borderRadius="16px"
            bg="#F5F6F7"
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
            mr={2}
          >
            <Text fontSize="12px" fontWeight={500} lineHeight="16px">
              {item}
            </Text>
          </Box>
        ))}
      </div>
      <Flex mt={5} alignItems="center">
        <Avatar name={profileImage} src={profileImage} w="44px" h="44px" />
        <Flex flexDir="column" ml={2}>
          <Text color="#0E2354" fontSize="14px">
            {name}
          </Text>
          <Text fontSize="14px" color="#909DAD">
            {position}
          </Text>
        </Flex>
        <IconButton
          aria-label="right"
          color={"#909DAD"}
          background={"none"}
          ml={2}
          icon={<AiOutlineArrowRight />}
        />
      </Flex>
    </div>
  );
};

export default RolesCardComponent;
