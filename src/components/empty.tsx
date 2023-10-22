/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import React from "react";
import { Box, Text, Center, Image } from "@chakra-ui/react"; // Replace with your image path

interface EmptyArrayMessageProps {
  array: any[] | null; // The array to check if it's empty
  imageAlt: string; // Alt text for the image
  message: string; // The message to display when the array is empty
}

const EmptyArrayMessage: React.FC<EmptyArrayMessageProps> = ({
  array,
  imageAlt,
  message,
}) => {
  if (array && array.length === 0) {
    return (
      <Center height="200px">
        <Box
          padding="4"
          borderWidth="1px"
          borderRadius="md"
          boxShadow="md"
          textAlign="center"
        >
          <Image src={imageAlt} alt={imageAlt} width="100px" height="100px" />
          <Text fontSize="lg" mt="4">
            {message}
          </Text>
        </Box>
      </Center>
    );
  } else {
    return null; // Render nothing if the array is not empty
  }
};

export default EmptyArrayMessage;
