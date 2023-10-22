import React, { Suspense } from "react";
import { Logo } from "../../assets";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dashBoardLinks } from "../../constants";
const SideBarLink = React.lazy(() => import("../SideBarLink/SideBarLink"));
type Props = {
  mobileNav: boolean;
  expand: boolean;
  onclick: () => void;
  handleLogout?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleMobileNav?: () => void;
};

const Index: React.FC<Props> = ({
  mobileNav,
  expand,
  onclick,
  handleMobileNav
}): JSX.Element => {
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  return (
    <Suspense>
      <div
        className={
          isMobile
            ? mobileNav
              ? " bottom-0 overflow-x-hidden overflow-y-scroll -translate-x-[30%] md:-translate-x-[100%]  absolute right-0 top-0 h-screen bg-white   justify-evenly items-center w-[calc(100%-20vw)] md:w-[calc(100%-50vw)] lg:w-full ease-in duration-300 z-[99]"
              : "-translate-x-[100%] lg:translate-x-[0%] w-[18rem] bg-white  fixed top-0 bottom-0 overflow-x-hidden overflow-y-auto ease-in duration-300 z-[99]"
            : expand
            ? "  w-[4rem] bg-white overflow-x-hidden fixed top-0 bottom-0  overflow-y-auto ease-in duration-300 z-[99] "
            : "-translate-x-[100%] lg:translate-x-[0%] w-[18rem] bg-white  fixed top-0 bottom-0 overflow-x-hidden overflow-y-auto ease-in duration-300 z-[99]"
        }
      >
        <div
          className={
            expand
              ? " flex justify-center items-center"
              : "flex justify-between items-center mx-5 "
          }
        >
          {!expand && (
            <Link to="/dashboard" className={""}>
              <img
                className={`"w-[70px] lg:w-[100px] h-[30px] my-[1rem] lg:h-[50px] object-contain "
              `}
                src={Logo}
                alt="Jupit"
              />
            </Link>
          )}
          <button
            className={` hidden lg:block  hover:opacity-80 ease-in duration-300   text-secondary ${
              expand && "p-2 mt-3"
            }`}
            onClick={onclick}
          >
            <FontAwesomeIcon
              className={expand ? "text-base " : "text-xl"}
              icon={faBars}
            />
          </button>
        </div>

        <div
          className={`flex flex-col justify-center items-center w-full flex-grow ${
            expand && "mt-5"
          } `}
        >
          {dashBoardLinks &&
            dashBoardLinks.map((link, i) => (
              <SideBarLink
                key={i}
                isIconMode={expand}
                {...link}
                handleMobileNav={handleMobileNav}
              />
            ))}
        </div>
      </div>
    </Suspense>
  );
};

export default Index;
