import { lazy, useState, useEffect, useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { Suspense } from "react";
import Title from "../../components/title";
import { results } from "../../constants";
import { changeHandler, formatServerTime } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import LoadingTable from "../../components/table-loader";
import EmptyArrayMessage from "../../components/empty";
import { getAllActivities, single } from "../../store/reducers/activity";
import Table from "../../components/table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
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
  const [popup, setPopup] = useState(false);
  const toggle = () => setPopup(k => !k)
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

  const rowClick = (id: string | number) => {
    console.log(id)
    dispatch( single(Number(id)))
    toggle();
  }


  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <div>
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
              rowClick={rowClick}
            />
          ) : (
            <EmptyArrayMessage
              array={activities}
              message="No users for now"
              imageAlt="http://via.placeholder.com/500x5000"
            />
          )}
        </div>
        {popup && (
          <div
            style={{ background: "rgba(0, 0, 0, 0.5)" }}
            className="fixed inset-0  z-[999999999] flex justify-end items-end ease-in duration-300"
          >
            <div className="w-full lg:w-1/2 bg-white h-full overflow-y-auto p-5">
              <div className=" flex items-center ">
                <button
                  onClick={toggle}
                  className="border-2 w-[25px] lg:w-[30px] h-[25px] lg:h-[30px] border-black text-black rounded-full flex items-center justify-center"
                >
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="text-sm lg:text-base"
                  />
                </button>
                <h3 className="ml-5 text-lg lg:text-xl font-poppins font-bold capitalize">
                  Event Details
                </h3>
              </div>
              <div className="mt-[5rem] ">
                <div className="grid grid-cols-2 gap-[1rem] lg:whitespace-nowrap border p-2 rounded-sm font-inter">
                  <h3 className="text-sm lg:text-base  font-bold capitalize">
                    Date:
                  </h3>
                  <h3 className="text-sm lg:text-base ">
                    {" "}
                    {formatServerTime(
                      single_activity?.created_at as unknown as Date
                    )}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-[1rem] lg:whitespace-nowrap border p-2 rounded-sm font-inter mt-5">
                  <h3 className="text-sm lg:text-base  font-bold capitalize">
                    Event:
                  </h3>
                  <h3 className="text-sm lg:text-base ">
                    {" "}
                    {single_activity?.event}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-[1rem]  border p-2 rounded-sm font-inter mt-5">
                  <h3 className="text-sm lg:text-base  font-bold capitalize">
                    Event Description:
                  </h3>
                  <h3 className="text-sm lg:text-base ">
                    {" "}
                    {single_activity?.description}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-[1rem] lg:whitespace-nowrap border p-2 rounded-sm font-inter mt-5">
                  <h3 className="text-sm lg:text-base  font-bold capitalize">
                    Action Performed By:
                  </h3>
                  <h3 className="text-sm lg:text-base ">
                    {" "}
                    {single_activity?.staff?.name}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-[1rem] lg:whitespace-nowrap border p-2 rounded-sm font-inter mt-5">
                  <h3 className="text-sm lg:text-base  font-bold capitalize">
                    Staff Tag Number:
                  </h3>
                  <h3 className="text-sm lg:text-base ">
                    {" "}
                    # {single_activity?.user_id}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-[1rem] lg:whitespace-nowrap border p-2 rounded-sm font-inter my-5">
                  <h3 className="text-sm lg:text-base  font-bold capitalize">
                    Ip Address:
                  </h3>
                  <h3 className="text-sm lg:text-base ">
                    {single_activity?.ip_address}
                  </h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>
    </Suspense>
  );
}
