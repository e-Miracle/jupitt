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
          onClick={toggleSublinks}
          className={
            location.pathname === path ||
            subLinks.map((item) => item.path).includes(location.pathname)
              ? isIconMode
                ? "bg-hoverLink relative w-full  text-secondary   my-1  flex justify-center items-center  p-2"
                : "my-1 py-3 px-5 w-full text-secondary bg-hoverLink  hover:bg-background hover:text-activeLink  flex items-center  "
              : isIconMode
              ? " my-1   w-full text-link  hover:bg-background hover:text-activeLink  flex justify-center items-center  p-2"
              : " my-1 py-3 px-5 w-full text-link  hover:bg-background hover:text-activeLink  flex items-center "
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
      ) : (
        <NavLink
          onClick={handleMobileNav}
          className={
            location.pathname === path
              ? isIconMode
                ? "text-secondary relative w-full    my-1 flex justify-center items-center  p-2 "
                : "my-1  py-3 px-5 w-full text-secondary bg-hoverLink  hover:bg-background hover:text-activeLink  flex items-center "
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
                <span className="inline-block ml-5 text-sm lg:text-base font-poppins">
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
