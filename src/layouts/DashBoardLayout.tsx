import React, { Suspense, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Outlet, useNavigate } from "react-router-dom";
import { Authourized } from "../modules";
import Spinner from "../components/spinner/Spinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/reducers/auth";
import { getCountries, getActiveCountries } from "../store/reducers/countries";

const SideBar = React.lazy(() => import("../components/SideBar/SideBar"));
const Header = React.lazy(() => import("../components/Header/Header"));
const ConfirmDialogue = React.lazy(
  () => import("../components/ConfirmDialog/ConfirmDialog")
);

const item: boolean =
  localStorage.getItem("expand") && JSON.parse(localStorage.expand);
console.log(typeof item);
const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const { countries, active_countries } = useAppSelector(
    (state) => state.countries
  );
  useEffect(() => {
    if (!countries) dispatch(getCountries());
    if (!active_countries) dispatch(getActiveCountries());
  }, [dispatch, countries, active_countries]);
  const navigate = useNavigate();
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
    <Suspense fallback={<Spinner />}>
      <Authourized>
        <div className={"max-w-screen-2xl mx-auto"}>
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
                ? ` bg-background lg:overflow-hidden`
                : expand
                ? "relative lg:left-[4rem] min-h-full bg-background h-screen ease-in duration-300 lg:w-[calc(100%-4rem)]  lg:overflow-hidden"
                : "relative lg:left-[18rem] min-h-full bg-background h-screen ease-in duration-300 lg:w-[calc(100%-18rem)] lg:overflow-hidden "
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
              <div className="bg-white lg:h-[calc(100vh-50px)] overflow-y-auto pb-7 ">
                <ConfirmDialogue
                  title=":( Logout?"
                  open={modal}
                  onClose={() => setModal(false)}
                  onConfirm={() => {
                    dispatch(logout());
                    navigate("/");
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
