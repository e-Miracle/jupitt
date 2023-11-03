import { Suspense, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "../../utils";
type Icon = {
  isIconMode?: boolean;
  onClick?: () => void;
  handleMobileNav?: () => void;
};

type Props = Link & Icon;

function SidebarLink({
  path,
  title,
  icon,
  isIconMode = false,
  subLinks,
  handleMobileNav,
}: //   subLinkState = false,
Props) {
  const location = useLocation();

  const [subLinksState, setSubLinksState] = useState<boolean>(false);
  const toggleSublinks = (): void => setSubLinksState((k) => !k);
  const body = (
    <div className={"relative"}>
      <span>
        {isIconMode ? (
          <FontAwesomeIcon className="text-base " icon={icon} />
        ) : (
          <FontAwesomeIcon className="text-sm" icon={icon} />
        )}
      </span>
      {isIconMode ? null : (
        <>
          <span className="inline-block ml-5 text-sm lg:text-base font-poppins">
            {title}
          </span>
        </>
      )}
    </div>
  );

  return (
    <Suspense>
      {subLinks && subLinks.length > 0 ? (
        <div
          className={
            location.pathname === path ||
            subLinks.map((item) => item.path).includes(location.pathname)
              ? isIconMode
                ? "w-full"
                : "w-full  px-2 flex relative justify-between items-center"
              : isIconMode
              ? ""
              : "w-full px-2 flex relative justify-between items-center hover:bg-background hover:text-activeLink"
          }
          onClick={toggleSublinks}
        >
          <div
            className={
              location.pathname === path ||
              subLinks.map((item) => item.path).includes(location.pathname)
                ? isIconMode
                  ? "bg-hoverLink relative w-full  text-secondary   my-1  flex justify-center items-center  p-2"
                  : "my-1 py-3 px-3  w-[95%] text-secondary bg-hoverLink rounded-lg  hover:bg-background hover:text-activeLink  flex items-center  justify-between "
                : isIconMode
                ? " my-1   w-full text-link  hover:bg-background hover:text-activeLink  flex justify-center items-center   p-2"
                : " my-1 py-3 px-3 w-[95%] text-link     flex items-center justify-between "
            }
          >
            <NavLink
              className={({ isActive }) =>
                isActive ? (isIconMode ? "" : " ") : isIconMode ? " " : " "
              }
              to={path}
              data-tooltip-target="tooltip-hover"
              data-tooltip-trigger="hover"
            >
              {body}
            </NavLink>
            {!isIconMode && (
              <FontAwesomeIcon
                className="text-base inline ml-5"
                icon={subLinksState ? faChevronDown : faChevronRight}
              />
            )}
          </div>
          <div
            className={
              location.pathname === path ||
              subLinks.map((item) => item.path).includes(location.pathname)
                ? isIconMode
                  ? "hidden"
                  : " absolute right-0 border-l-[4px] border-secondary h-[calc(100%-0.5rem)] rounded-l-[10px]"
                : isIconMode
                ? "hidden"
                : ""
            }
          ></div>
        </div>
      ) : (
        <div
          className={
            location.pathname === path
              ? isIconMode
                ? "w-full"
                : "w-full  px-2 flex relative justify-between items-center"
              : isIconMode
              ? ""
              : "w-full"
          }
        >
          <NavLink
            onClick={handleMobileNav}
            className={
              location.pathname === path
                ? isIconMode
                  ? "text-secondary relative w-full    my-1 flex justify-center items-center  p-2 "
                  : "my-1  py-3  w-[95%] text-secondary rounded-lg pl-3 bg-hoverLink   hover:bg-background hover:text-activeLink  flex items-center "
                : isIconMode
                ? " my-1   w-full text-link  hover:bg-background hover:text-activeLink  flex justify-center items-center  p-2"
                : "my-1 py-3 px-5 w-full text-link  hover:bg-background hover:text-activeLink  flex items-center"
            }
            to={path}
            data-tooltip-target="tooltip-hover"
            data-tooltip-trigger="hover"
          >
            {body}
          </NavLink>
          <div
            className={
              location.pathname === path
                ? isIconMode
                  ? "hidden"
                  : " absolute right-0 border-l-[4px] border-secondary h-[calc(100%-0.5rem)] rounded-l-[10px]"
                : isIconMode
                ? "hidden"
                : ""
            }
          ></div>
        </div>
      )}

      {subLinksState &&
        subLinks?.map(({ title, path, icon }, i: number) => (
          <NavLink
            key={i}
            onClick={() => {
              toggleSublinks();
              handleMobileNav && handleMobileNav();
            }}
            className={
              location.pathname === path
                ? isIconMode
                  ? "text-secondary relative w-full    my-1 flex justify-center items-center  p-2"
                  : "my-1  py-3 px-5 w-full text-secondary   hover:bg-background hover:text-activeLink  flex items-center"
                : isIconMode
                ? " my-1   w-full text-link  hover:bg-background hover:text-activeLink  flex justify-center items-center  p-2"
                : " my-1 py-3 px-5 w-full text-link  hover:bg-background hover:text-activeLink  flex items-center"
            }
            to={path}
          >
            <div>
              <span>
                {isIconMode ? (
                  <FontAwesomeIcon className="text-sm " icon={icon} />
                ) : (
                  <FontAwesomeIcon className="text-xs" icon={icon} />
                )}
              </span>
              {isIconMode ? null : (
                <span className="inline-block ml-5 text-xs lg:text-sm font-poppins">
                  {title}
                </span>
              )}
            </div>
          </NavLink>
        ))}
    </Suspense>
  );
}

export default SidebarLink;
