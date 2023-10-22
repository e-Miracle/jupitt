import React, { Suspense } from "react";
import { Box } from "@chakra-ui/react";
import Title from "../../../components/title";
import { MultiStepForm } from "../multi-form";
const CreateStaff = () => {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Title title="Create Staff" backBtn />
        <MultiStepForm />
      </Box>
    </Suspense>
  );
};

export default CreateStaff;
