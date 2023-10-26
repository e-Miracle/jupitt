import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
export default function ServiceManagement() {
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        Service Management
      </Box>
    </Suspense>
  );
}
