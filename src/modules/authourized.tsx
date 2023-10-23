/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import React from "react";
import { useAppSelector } from "../store/hooks";
import { Navigate } from "react-router-dom";
import { routes } from "../constants";
import toast from "react-hot-toast";

type Props = {
  children: any
};
export const Authourized = ({ children }: Props) => {
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);
  React.useEffect(() => {
    if (!isAuthenticated && !loading)
      toast.error("Server Error...Expired/No token", {
        icon: "❌",
      });
  }, [isAuthenticated, loading]);

  return !isAuthenticated && !loading ? (
    <Navigate to={routes.home} />
  ) : (
    children
  );
};
