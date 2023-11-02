import { Box, Grid } from "@chakra-ui/react";
import { Suspense, lazy, useEffect } from "react";
import { Wallet, Graph } from "../assets";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getBalance, getUserCount } from "../store/reducers/dashboard";
import { getTransactions } from "../store/reducers/transactions";
import CardLoader from "../components/card-loader";
import Spinner from "../components/spinner/Spinner";
const CoinCard = lazy(() => import("../components/coincard"));
const Transaction = lazy(() => import("../components/transactions"));
const Calculator = lazy(() => import("../components/calculator"));
const PieChart = lazy(() => import("../components/pie-chart"));
const LineChartContainer = lazy(() => import("../components/line-chart-con"));
export default function Dashboard() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getBalance());
    dispatch(getUserCount());
    dispatch(getTransactions({}));
  }, [dispatch]);
  const {
    users_loading,
    users_this_week,
    users_totalUsers,
    balance_loading,
    balance_this_week,
    balance_last_week,
    balance_totalUsers,
  } = useAppSelector((state) => state.dashBoard);
  return (
    <Suspense fallback={<Spinner/>}>
      <Box background={"#F2F2F2"} padding={".75rem"}>
        <Grid
          templateColumns={{
            sm: "repeat(1, 1fr)",
            md: "repeat(1, 1fr)",
            lg: "repeat(2, 1fr)",
            xl: "repeat(3, 1fr)",
            base: "repeat(1, 1fr)",
          }}
          gridGap="1rem"
        >
          {balance_loading ? (
            <CardLoader />
          ) : (
            <CoinCard
              logo={Wallet}
              title="Estimated Balance"
              price={balance_totalUsers ? balance_totalUsers : 0}
              graph={Graph}
              gain={balance_this_week ? `+${String(balance_this_week)}` : `${String(0)}`}
              appValue={
                balance_last_week ? String(balance_last_week) : String(0)
              }
              currency="$"
            />
          )}

          <CoinCard
            logo={Wallet}
            title="Total Trades"
            price={6493}
            graph={Graph}
            loss={"-29 Trades"}
          />
          {users_loading ? (
            <CardLoader />
          ) : (
            <CoinCard
              logo={Wallet}
              title="Total Users"
              price={users_totalUsers ? users_totalUsers : 0}
              graph={Graph}
              gain={users_this_week ? `+ ${String(users_this_week)}` : `+${String(0)}`}
            />
          )}
        </Grid>
        <div className="grid grid-cols-1 lg:grid-cols-9 gap-[1rem] mt-[1rem]">
          <div className="col-span-8 lg:col-span-6  grid grid-cols-1 lg:grid-cols-8 gap-[1rem] place-content-start">
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
          <div className="col-span-8 lg:col-span-3 ">
            <Transaction />
          </div>
        </div>
      </Box>
    </Suspense>
  );
}
