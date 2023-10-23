import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
  Text,
  Grid,
} from "@chakra-ui/react";
import { Suspense, lazy, useState, useEffect, useMemo } from "react";
import Title from "../../components/title";
import { results, reasons } from "../../constants";
import { changeHandler } from "../../utils";
import Table from "../../components/table";
import RefferalForm from "../../components/refferal-form";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLogs, getCount } from "../../store/reducers/refferals";
import LoadingTable from "../../components/table-loader";
import EmptyArrayMessage from "../../components/empty";
const Filter = lazy(() => import("../../components/filter"));

export default function Portal() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLogs());
    dispatch(getCount());
  }, [dispatch]);

  const {
    referralLogs,
    referralLogsnext_page_url,
    referralLogsprev_page_url,
    referralLogscurrent_page,
    referralLogstotal,
    referralLogsloading,
    referralCount,
    referralCountnext_page_url,
    referralCountprev_page_url,
    referralCountcurrent_page,
    referralCounttotal,
    referralCountloading,
  } = useAppSelector((state) => state.referral);

  const options_logs = useMemo(
    () => [
      { key: "id", label: "ID" },
      { key: "referrer", label: "Referrer" },
      { key: "reffered", label: "Reffered" },
      { key: "claimed", label: "Claimed" },
      { key: "status", label: "Status" },
    ],
    []
  );

  const options_count = useMemo(
    () => [
      { key: "user", label: "User" },
      { key: "referrer", label: "Referrer ID" },
      { key: "count", label: "Referral Count" },
    ],
    []
  );
  const [value, setValue] = useState("");
  const [searchResults, setSearchResults] = useState<Array<unknown>>([]);
  const handleToggle = () => {};
  const handleFilter = () => {};
  const handleSubmit = () => {
    if (!value) return;
    console.log(value);
  };
  const handleExport = () => {};
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setSearchResults([]);

    const filteredValue = results.filter((result) =>
      result.name.toLowerCase().startsWith(target.value)
    );

    if (filteredValue) setSearchResults(filteredValue);
  };

  const handleActionClick = (type: "delete", id: number | string) => {
    if (type === "delete") {
      console.log(id);
      // Perform the delete operation here
    }
  };

  const getViewLink = (id: number | string) => `/refferal/user/${id}`;
  const change = (page: number) => console.log(page);
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Box display={"flex"} alignItems={"center"}>
          <Title title="Referral Portal" />
          <Box className="lg:ml-[15rem] flex justify-end items-end text-secondary font-medium font-inter">
            <Text fontSize="3xl">554</Text>
            <Text fontSize="sm" className="ml-1">
              Total Users
            </Text>
          </Box>
        </Box>
        <Filter
          data={searchResults}
          handleToggle={handleToggle}
          handleFilter={handleFilter}
          handleSubmit={handleSubmit}
          handleExport={handleExport}
          handleChange={handleChange}
          value={value}
          handleSelect={(item) => setValue(item)}
        />
        <Tabs position="relative" className=" mt-7">
          <TabList>
            <Tab className="text-coincard text-xs">Referral Log</Tab>
            <Tab className="text-coincard text-xs">Referral Counter</Tab>
            <Tab className="text-coincard text-xs">Referral Settings</Tab>
          </TabList>
          <TabIndicator
            color="#0D63D3"
            mt="-1.5px"
            height="2px"
            bg="blue.500"
            borderRadius="1px"
          />
          <TabPanels>
            <TabPanel>
              {referralLogsloading && (
                <LoadingTable
                  rows={15}
                  columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
                />
              )}
              {!referralLogsloading &&
              referralLogs &&
              referralLogs.length > 0 ? (
                <Table
                  headers={options_logs}
                  data={referralLogs.map((item) => ({
                    id: item.id,
                    referrer: item.referrer,
                    reffered: item.referred,
                    claimed: Number(item.claimed) ? "claimed" : "unclaimed",
                    status: Number(item.status) ? "active" : "inactive",
                  }))}
                  onActionClick={handleActionClick}
                  viewLink={getViewLink}
                  change={change}
                  total={referralLogstotal}
                  currentPage={referralLogscurrent_page}
                  next_page_url={referralLogsnext_page_url}
                  prev_page_url={referralLogsprev_page_url}
                />
              ) : (
                <EmptyArrayMessage
                  array={referralLogs}
                  message="No users for now"
                  imageAlt="http://via.placeholder.com/500x5000"
                />
              )}
            </TabPanel>
            <TabPanel>
              {referralCountloading && (
                <LoadingTable
                  rows={15}
                  columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
                />
              )}
              {!referralCountloading &&
              referralCount &&
              referralCount.length > 0 ? (
                <Table
                  headers={options_count}
                  data={referralCount.map((item, i) => ({
                    id: i,
                    name: item.user.full_name,
                    email: item.user.email,
                    image: item.user.full_name,
                    referrer: item.referrer,
                    count: Number(item.count),
                  }))}
                  onActionClick={handleActionClick}
                  viewLink={getViewLink}
                  change={change}
                  total={referralCounttotal}
                  currentPage={referralCountcurrent_page}
                  next_page_url={referralCountnext_page_url}
                  prev_page_url={referralCountprev_page_url}
                />
              ) : (
                <EmptyArrayMessage
                  array={referralLogs}
                  message="No users for now"
                  imageAlt="http://via.placeholder.com/500x5000"
                />
              )}
            </TabPanel>
            <TabPanel>
              <Grid
                templateColumns={{
                  sm: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(2, 1fr)",
                  xl: "repeat(2, 1fr)",
                  base: "repeat(1, 1fr)",
                }}
                gridGap="1rem"
              >
                <RefferalForm title="Referrer" currencies={reasons} />
                <RefferalForm title="Referred" currencies={reasons} />
              </Grid>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
}
