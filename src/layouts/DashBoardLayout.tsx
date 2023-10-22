import React, { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet } from "react-router-dom";
import { Authourized } from "../modules";
const SideBar = React.lazy(() => import("../components/SideBar/SideBar"));
const Header = React.lazy(() => import("../components/Header/Header"));
const ConfirmDialogue = React.lazy(
  () => import("../components/ConfirmDialog/ConfirmDialog")
);

const item: boolean =
  localStorage.getItem("expand") && JSON.parse(localStorage.expand);
console.log(typeof item);
const DashboardLayout = () => {
  const [modal, setModal] = React.useState<boolean>(false);
  const [expand, setExpand] = React.useState<boolean>(item);
  const [mobileNav, setmobileNav] = React.useState<boolean>(false);
  const toggleExpand = (): void =>
    setExpand((prev) => {
      localStorage.setItem("expand", JSON.stringify(!prev));
      return JSON.parse(localStorage.expand);
    });
  const toggleModal = (): void => setModal(!modal);
  const isMobile: boolean = useMediaQuery({ query: `(max-width: 768px)` });
  const handleMobileNav = () => {
    if (isMobile) {
      setmobileNav(!mobileNav);
    }
  };
  return (
    <Suspense>
      <Authourized>
      <div className={""}>
        <SideBar
          onclick={toggleExpand}
          expand={expand}
          mobileNav={mobileNav}
          handleLogout={toggleModal}
          handleMobileNav={handleMobileNav}
        />
        <div
          className={
            isMobile
              ? ` bg-background`
              : expand
              ? "relative left-[4rem] min-h-full bg-background h-screen ease-in duration-300 w-[calc(100%-4rem)] overflow-auto"
              : "relative left-[18rem] min-h-full bg-background h-screen ease-in duration-300 w-[calc(100%-18rem)] overflow-auto"
          }
        >
          <div
            className={`${
              expand
                ? "w-full mx-auto  md:px-5 xl:px-0"
                : "w-full mx-auto  md:px-5 xl:px-0 "
            }`}
          >
            <Header
              mobileNav={mobileNav}
              handleMobileNav={handleMobileNav}
              handleLogout={toggleModal}
            />{" "}
            <div className="bg-white">
              <ConfirmDialogue
                title=":( Logout?"
                open={modal}
                onClose={() => setModal(false)}
                onConfirm={() => {
                  //call the function to logout the user
                }}
              >
                Are you sure you want to log out?
              </ConfirmDialogue>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </Authourized>
    </Suspense>
  );
};

export default DashboardLayout;
