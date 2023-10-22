import React, { Suspense } from "react";
import {
  Box,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Checkbox,
} from "@chakra-ui/react";
import Title from "../../../components/title";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams } from "react-router-dom";
import StaffCard from "../../../components/staff-card";
import { permissions } from "../../../constants";
const Staff = () => {
  const { id } = useParams();
  return (
    <Suspense>
      <Box
        paddingTop={".75rem"}
        paddingBottom={".75rem"}
        paddingLeft={"1rem"}
        paddingRight={"1rem"}
      >
        <Title title="Staff Portal" backBtn />

        <Tabs position="relative" className=" mt-7">
          <Box className="flex items-end justify-between flex-wrap">
            <TabList>
              <Tab className="text-coincard text-xs font-inter">Staffs</Tab>
              <Tab className="text-coincard text-xs font-inter">
                Permissions
              </Tab>
            </TabList>

            <Link
              to={`/manage-staff/staff/edit/${id}`}
              className="block border border-coincard text-secondary rounded-lg px-5 py-3 hover:opacity-90"
            >
              {" "}
              <FontAwesomeIcon icon={faPencil} className="mr-2" /> Edit Profile
            </Link>
          </Box>
          <TabPanels>
            <TabPanel>
              <Box className="flex flex-wrap">
                <Box className="w-full lg:w-[calc(100%-70%)]">
                  <StaffCard
                    code="#234554G"
                    image="http://via.placeholder.com/50x50"
                    joined={"2023-10-11T15:30:00.000Z"}
                    name="cody fisher"
                    gender="male"
                    role="customer 
                  representative"
                    status="active"
                    handleDeactivate={() => console.log("hii")}
                    handleDelete={() => console.log("hii")}
                  />
                </Box>
                <Box className="w-full lg:w-[calc(100%-30%)] p-3 grid grid-cols-1 lg:grid-cols-2 gap-[1rem] font-poppins">
                  <div>
                    <label
                      className="text-xs text-userDetails  font-bold "
                      htmlFor="name"
                    >
                      Full Name
                    </label>
                    <input
                      className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                      aria-label="fullname"
                      placeholder="Cody Fish"
                      type="text"
                      id="name"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs text-userDetails  font-bold "
                      htmlFor="role"
                    >
                      Role
                    </label>
                    <input
                      className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                      aria-label="role"
                      placeholder="Operations Manager"
                      type="text"
                      id="role"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs text-userDetails  font-bold "
                      htmlFor="phone"
                    >
                      Phone Number
                    </label>
                    <input
                      className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                      aria-label="phone"
                      placeholder="+2340 000 000 000"
                      type="text"
                      id="phone"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs text-userDetails  font-bold "
                      htmlFor="dept"
                    >
                      Department
                    </label>
                    <input
                      className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                      aria-label="dept"
                      placeholder="Business Operations"
                      type="text"
                      id="dept"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs text-userDetails  font-bold "
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                      aria-label="email"
                      placeholder="cody@.jupitapp.co"
                      type="email"
                      id="email"
                    />
                  </div>
                  <div>
                    <label
                      className="text-xs text-userDetails  font-bold "
                      htmlFor="report"
                    >
                      Reporting To
                    </label>
                    <input
                      className={`mt-1 w-full border-none text-sm bg-formBg lg:text-base text-textForm p-3 rounded-md outline-none placeholder:text-textForm placeholder:text-sm placeholder:opacity-[.6]`}
                      aria-label="report"
                      placeholder="Bobby Salman"
                      type="text"
                      id="report"
                    />
                  </div>
                </Box>
              </Box>
            </TabPanel>
            <TabPanel>
              <Box className="flex flex-wrap">
                <Box className="w-full lg:w-[calc(100%-70%)]">
                  <StaffCard
                    code="#234554G"
                    image="http://via.placeholder.com/50x50"
                    joined={"2023-10-11T15:30:00.000Z"}
                    name="cody fisher"
                    gender="male"
                    role="customer representative"
                    status="active"
                    handleDeactivate={() => console.log("hii")}
                    handleDelete={() => console.log("hii")}
                  />
                </Box>
                <Box className="w-full lg:w-[calc(100%-30%)] p-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3  gap-[1rem] font-poppins">
                  {permissions.map((item) => (
                    <Checkbox
                      className="capitalize text-coincard border-b  "
                      key={`index-${item}`}
                      defaultChecked
                    >
                      {item}
                    </Checkbox>
                  ))}
                </Box>
              </Box>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Suspense>
  );
};

export default Staff;
