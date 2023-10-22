import { Box, Grid } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { Wallet, Graph } from "../assets";
const CoinCard = lazy(() => import("../components/coincard"));
const Transaction = lazy(() => import("../components/transactions"));
const Calculator = lazy(() => import("../components/calculator"));
const PieChart = lazy(() => import("../components/pie-chart"));
const LineChartContainer = lazy(() => import("../components/line-chart-con"));
export default function Dashboard() {
  return (
    <Suspense>
      <Box background={"#F2F2F2"} padding={".75rem"}>
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
          <CoinCard
            logo={Wallet}
            title="Estimated Balance"
            price={853000}
            graph={Graph}
            gain={"+$2560.78"}
            appValue={"+2.95%"}
            currency="$"
          />
          <CoinCard
            logo={Wallet}
            title="Total Trades"
            price={6493}
            graph={Graph}
            loss={"-29 Trades"}
          />
          <CoinCard
            logo={Wallet}
            title="Total Users"
            price={6493}
            graph={Graph}
            gain={"+29 Users"}
          />
        </Grid>
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-[1rem] mt-[1rem]">
          <div className="col-span-8 lg:col-span-6  grid grid-cols-1 lg:grid-cols-8 gap-[1rem]">
            <div className="col-span-8 ">
              <LineChartContainer />
            </div>
            <div className="col-span-8 lg:col-span-4 w-full h-[19.7rem]">
              <PieChart />
            </div>
            <div className="col-span-8 lg:col-span-4">
              <Calculator />
            </div>
          </div>
          <div className="col-span-8 lg:col-span-2 ">
            <Transaction />
          </div>
        </div>
      </Box>
    </Suspense>
  );
}
