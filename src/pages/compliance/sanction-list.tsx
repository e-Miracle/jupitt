import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
export default function SanctionList() {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        SanctionList
      </Box>
    </Suspense>
  );
}
