import { lazy, useState, useEffect, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import Title from "../../components/title";
import { results } from "../../constants";
import { changeHandler } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LoadingTable from "../../components/table-loader";
import EmptyArrayMessage from "../../components/empty";
import { getAllActivities } from "../../store/reducers/activity";
import Table from "../../components/table";
const Filter = lazy(() => import("../../components/filter"));
export default function ActivityLog() {
  const dispatch = useAppDispatch();
  const {
    activities,
    single_activity,
    loading,
    current_page,
    next_page_url,
    prev_page_url,
    total,
  } = useAppSelector((state) => state.activity);
  useEffect(() => {
    if (!activities) dispatch(getAllActivities({}));
  }, [dispatch, activities]);
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

  const headers = [
    { key: "time", label: "Date" },
    { key: "event", label: "Event" },
    { key: "user", label: "Performed By" },
    { key: "tag_no", label: "Staff Tag No" },
    { key: "ip_address", label: "Ip Address" },
  ];

  const options = useMemo(
    () =>
      activities &&
      activities.length > 0 &&
      activities.map((item) => ({
        id: item.id,
        time: item.created_at,
        event: item.event,
        name: item.staff?.name,
        email: item.staff?.email,
        image: item.staff?.name,
        tag_no: `# ${item.user_id}`,
        ip_address: item.ip_address,
      })),
    [activities]
  );

  const change = (page: number) => {
    dispatch(getAllActivities({ page: String(page) }));
  };

  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        {" "}
        <Title title="Activity Log" number={100} />
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
        {loading && (
          <LoadingTable
            rows={15}
            columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
          />
        )}
        {!loading && options && options.length > 0 ? (
          <Table
            headers={headers}
            data={options}
            change={change}
            total={total}
            currentPage={current_page}
            next_page_url={next_page_url}
            prev_page_url={prev_page_url}
          />
        ) : (
          <EmptyArrayMessage
            array={activities}
            message="No users for now"
            imageAlt="http://via.placeholder.com/500x5000"
          />
        )}
      </Box>
    </Suspense>
  );
}
