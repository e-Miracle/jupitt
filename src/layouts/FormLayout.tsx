import React from "react";
import { FormImage } from "../assets";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";
const Spinner = React.lazy(() => import("../components/spinner/Spinner"));

const Index = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <React.Suspense fallback={<Spinner />}>
      <div className="lg:flex  justify-between items-center block overflow-hidden  w-screen h-screen ">
        <div className=" hidden  lg:w-2/4  lg:h-full lg:flex lg:justify-center lg:items-center  ">
          <img
            src={FormImage}
            className="w-full h-full object-cover"
            alt="Jupit"
          />
        </div>
        <div className="w-full lg:w-2/4  grid place-items-center  bg-[#fff]  overflow-auto px-[1rem] lg:px-[4rem] h-full  ">
          <div className="w-full  mx-auto max-w-[400px] lg:max-w-[800px]">
            <Outlet />
          </div>
        </div>
      </div>
    </React.Suspense>
  );
};

export default Index;
