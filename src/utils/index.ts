import Cookies from "js-cookie";
import { USER_TOKEN } from "../constants";
import axios from "axios";
export * from "./types";

export function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  const item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol
    : "0";
}

export function formatServerTime(serverTime: Date): string {
  const date = new Date(serverTime);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  const formattedDate: string = date.toLocaleDateString("en-US", options);
  // const ampm: string = date.getHours() >= 12 ? "PM" : "AM";
  return `${formattedDate}`;
}

export const setAuthToken = () => {
  const token = Cookies.get(USER_TOKEN);
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    return;
  }
  delete axios.defaults.headers.common["Authorization"];
};
