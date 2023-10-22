/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import React, { Suspense, lazy } from "react";
import {
  faBell,
  faBars,
  faTimes,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { results } from "../../constants";
const LiveSearch = lazy(() => import("../LiveSearch/LiveSearch"));
type Props = {
  mobileNav: boolean;
  handleMobileNav?: () => void;
  handleLogout: () => void;
};

type Profile = {
  name: string;
  profileImage: string;
};

const Index: React.FC<Props> = ({
  mobileNav,
  handleMobileNav,
  handleLogout,
}) => {
  const [profile, setProfile] = React.useState<Profile>({
    name: "",
    profileImage: "",
  });
  const [searchResults, setSearchResults] =
    React.useState<
      {
        id: string;
        name: string;
      }[]
    >();
  const [selectedProfile, setSelectedProfile] =
    React.useState<{
      id: string;
      name: string;
    }>();
  const [popup, setPopup] = React.useState<boolean>(false);

  type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
  const handleChange: changeHandler = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setSearchResults([]);

    const filteredValue = results.filter((result) =>
      result.name.toLowerCase().startsWith(target.value)
    );

    setSearchResults(filteredValue);
  };
  React.useEffect(() => {
    //mimicking network request
    setTimeout(() => {
      setProfile((profile) => ({
        ...profile,
        name: "Andy Warhol",
        profileImage: "https://via.placeholder.com/500x500",
      }));
    }, 3000);
  }, []);
  return (
    <Suspense>
      <div className="flex justify-between items-center py-3 bg-white px-3  lg:px-5 ">
        <LiveSearch
          placeholder="Search anything here"
          results={searchResults}
          onChange={handleChange}
          onSelect={(item: any) => {
            console.log(item);
            setSelectedProfile(item);
          }}
          value={selectedProfile?.name}
          onSubmit={() => {
            if (selectedProfile) console.log(selectedProfile);
          }}
          renderItem={(item: any) => <p className="text-black ">{item.name}</p>}
        />

        <div className="flex items-center bg-user rounded-lg p-1 ">
          <div className="flex items-center relative">
            <Link
              to={`/dashboard/notifications`}
              className="hidden lg:inline-block mr-5 text-black lg:text-base text-sm hover:opacity-80 ease-in duration-300 relative"
            >
              <FontAwesomeIcon icon={faBell} />
              <span className="absolute bg-[#FF3B30] rounded-full w-[4px] h-[4px]"></span>
            </Link>

            <Link
              to={`/my/dashboard/account`}
              className="hidden lg:inline-block mr-5 text-icon lg:text-2xl text-xl hover:opacity-80 ease-in duration-300 relative "
            >
              <img
                src={
                  profile.profileImage || "https://via.placeholder.com/500x500"
                }
                alt={profile.profileImage}
                className="rounded-full w-[40px] h-[40px] object-contain hover:border hover:border-black"
              />
              <span className="absolute bg-[green] right-[.1rem] bottom-[.1rem] rounded-full w-[10px] h-[10px] border-2 border-white"></span>
            </Link>

            <div className="hidden lg:block mr-5">
              <h1 className=" text-black text-sm capitalize hover:opacity-80 ease-in duration-300 font-medium">
                {profile.name ? profile.name : "Anon..."}
              </h1>

              <p className="text-black text-sm capitalize hover:opacity-80 ease-in duration-300">
                iAm Super Admin
              </p>
            </div>

            <button
              className="text-black hover:opacity-80 hover:secondary ease-in duration-300 mr-5 lg:mr-0"
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
                      src={
                        profile.profileImage ||
                        "https://via.placeholder.com/500x500"
                      }
                      alt={profile.profileImage}
                      className="rounded-full w-[30px] h-[30px] object-contain hover:border hover:border-black"
                    />
                    <span className="absolute bg-[green] right-[.1rem] bottom-[.1rem] rounded-full w-[8px] h-[8px] border-2 border-white"></span>
                  </Link>
                  <div className="w-[60%] ml-2 whitespace-wrap">
                    <h1 className=" text-black text-xs capitalize hover:opacity-80 ease-in duration-300 font-medium">
                      {profile.name ? profile.name : "Anon..."}
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
