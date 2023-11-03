import { lazy, useState, useEffect, useMemo } from "react";
import { results} from "../../../constants";
import { changeHandler } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getStaffs } from "../../../store/reducers/staff";
import Table from "../../../components/table";
import LoadingTable from "../../../components/table-loader";
import EmptyArrayMessage from "../../../components/empty";
const Filter = lazy(() => import("../../../components/filter"));
const Staffs = () => {
 const dispatch = useAppDispatch();
 const {
   staff,
   staff_loading,
   staff_current_page,
   staff_next_page_url,
   staff_prev_page_url,
   staff_last_page,
 } = useAppSelector((state) => state.staff);
 useEffect(() => {
   if (!staff) dispatch(getStaffs({}));
 }, [dispatch, staff]);
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
   }
 };
 const getViewLink = (id: number | string) => `/manage-staff/staff/${id}`;

 const headers = [
   { key: "user", label: "Name" },
   { key: "tag_no", label: "Staff Tag No" },
   { key: "role", label: "Role" },
   { key: "status", label: "Status" },
 ];

 const options = useMemo(
   () =>
     staff &&
     staff.length &&
     staff.map((item) => ({
       id: item.identifier,
       name: item.name,
       status: item.status ? "active" : "inactive",
       email: item.email,
       image: item.name,
       tag_no: item.identifier,
       role: item.roles ? item.roles[0].name : "",
     })),
   [staff]
 );
 const change = (page: number) => {
   dispatch(getStaffs({ page: String(page) }));
 };
  return (
    <div>
      {" "}
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
      {staff_loading && (
        <LoadingTable
          rows={15}
          columns={[{ width: 100 }, { width: 150 }, { width: 80 }]}
        />
      )}
      {!staff_loading && options && options.length > 0 ? (
        <Table
          headers={headers}
          data={options}
          total={staff_last_page}
          currentPage={staff_current_page}
          next_page_url={staff_next_page_url}
          prev_page_url={staff_prev_page_url}
          change={change}
          onActionClick={handleActionClick}
          viewLink={getViewLink}
          moreSection
          checkboxes
        />
      ) : (
        <EmptyArrayMessage
          array={staff}
          message="No logs"
          imageAlt="http://via.placeholder.com/500x5000"
        />
      )}
    </div>
  );
};

export default Staffs;
