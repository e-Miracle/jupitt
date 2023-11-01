/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import React, { Suspense, lazy } from "react";
import {
  faBell,
  faBars,
  faTimes,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useNavigate } from "react-router-dom";
import { dashBoardLinks } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import { Res } from "../../utils";
const LiveSearch = lazy(() => import("../LiveSearch/LiveSearch"));
type Props = {
  mobileNav: boolean;
  handleMobileNav?: () => void;
  handleLogout: () => void;
};

const rizz: Array<Res> = [
  dashBoardLinks[0],
  ...dashBoardLinks.flatMap((link) => link.subLinks || []),
];
const Index: React.FC<Props> = ({
  mobileNav,
  handleMobileNav,
  handleLogout,
}) => {
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [searchResults, setSearchResults] = React.useState<Array<Res>>([]);
  const [selectedLink, setSelectedLink] = React.useState<Res>();
  const [popup, setPopup] = React.useState<boolean>(false);

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setSearchResults([]);
    const lowercase = target.value.toLowerCase();
    const filteredValue = rizz.filter(({ title }) =>
      title.toLowerCase().startsWith(lowercase)
    );

    setSearchResults(filteredValue);
  };
  return (
    <Suspense>
      <div className="flex justify-between items-center py-3 bg-white px-3  lg:px-5 ">
        <div className="w-full mr-5 lg:mr-0 lg:max-w-[380px]">
          <LiveSearch
            placeholder="Search anything here"
            results={searchResults}
            onChange={handleChange}
            onSelect={(item: any) => {
              navigate(item.path);
              setSelectedLink(item);
            }}
            value={selectedLink?.title}
            onSubmit={() => {
              if (selectedLink) console.log(selectedLink);
            }}
            renderItem={(item: any) => (
              <p className="text-black font-poppins capitalize w-full">
                {item.title}
              </p>
            )}
          />
        </div>

        <div className="flex items-center bg-user rounded-lg p-2 px-4 ">
          <div className="flex items-center relative">
            <Link
              to={`/dashboard/notifications`}
              className="hidden lg:inline-block mr-5 text-[#667085] lg:text-base text-sm hover:opacity-80 ease-in duration-300 relative"
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="absolute bg-[#FF3B30] rounded-full w-[4px] h-[4px]"></span>
            </Link>

            <Link
              to={`/my/dashboard/account`}
              className="hidden lg:inline-block mr-5 text-icon lg:text-2xl text-xl hover:opacity-80 ease-in duration-300 relative "
            >
              <img
                src={"https://via.placeholder.com/500x500"}
                alt={""}
                className="rounded-full w-[40px] h-[40px] object-contain hover:border hover:border-black"
              />
              <span className="absolute bg-[green] right-[.1rem] bottom-[.1rem] rounded-full w-[10px] h-[10px] border-2 border-white"></span>
            </Link>

            <div className="hidden lg:block mr-5">
              <h1 className=" text-black text-sm capitalize hover:opacity-80 ease-in duration-300 font-medium">
                {user ? user?.name : "Anon..."}
              </h1>

              <p className="text-black text-sm capitalize hover:opacity-80 ease-in duration-300">
                iAm Super Admin
              </p>
            </div>

            <button
              className="text-[#667085] hover:opacity-80 hover:secondary ease-in duration-300 mr-5 lg:mr-0"
              onClick={() => setPopup(!popup)}
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>

            {popup && (
              <div className="absolute right-0 top-[3rem] lg:top-[4rem] w-[200px] font-poppins p-3 bg-white text-black shadow-lg rounded-b-[20px]   overflow-y-auto z-[999] ease-in duration-300">
                <Link
                  to={`/dashboard/account`}
                  className=" block  lg:text-base text-xs hover:opacity-80  ease-in duration-300 f  mb-1 "
                >
                  Account
                </Link>
                <Link
                  to={`/dashboard/settings`}
                  className=" block  lg:text-base text-xs hover:opacity-80 s ease-in duration-300   mb-1"
                >
                  Settings
                </Link>
                <Link
                  to={`/dashboard/notifications`}
                  className=" lg:hidden block  lg:text-base text-xs hover:opacity-80 s ease-in duration-300   mb-1"
                >
                  Notifications
                </Link>
                <Link
                  to={``}
                  onClick={handleLogout}
                  className=" block  lg:text-base text-xs hover:opacity-80 ease-in duration-300   "
                >
                  Log out
                </Link>
                <hr className="my-3" />
                <div className="flex items-center w-full">
                  <Link className="block relative" to={`/my/dashboard/account`}>
                    <img
                      src={"https://via.placeholder.com/500x500"}
                      alt={""}
                      className="rounded-full w-[30px] h-[30px] object-contain hover:border hover:border-black"
                    />
                    <span className="absolute bg-[green] right-[.1rem] bottom-[.1rem] rounded-full w-[8px] h-[8px] border-2 border-white"></span>
                  </Link>
                  <div className="w-[60%] ml-2 whitespace-wrap">
                    <h1 className=" text-black text-xs capitalize hover:opacity-80 ease-in duration-300 font-medium">
                      {user ? user?.name : "Anon..."}
                    </h1>

                    <p className="text-black text-xs capitalize hover:opacity-80 ease-in duration-300">
                      iAm Super Admin
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <button
            role="button"
            onClick={() => {
              setPopup(false);
              handleMobileNav && handleMobileNav();
            }}
            className={`block lg:hidden ${
              mobileNav ? "text-secondary" : "text-black"
            }   text-xl lg:text-2xl mr-0 hover:opacity-80 ease-in duration-300`}
          >
            <FontAwesomeIcon icon={mobileNav ? faTimes : faBars} />
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default Index;
