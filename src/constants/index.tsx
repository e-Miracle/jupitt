import { Btc, Eth, USDT } from "../assets";
import { Link } from "../utils";
import {
  faCog,
  faCircleDot,
  faUsers,
  faMoneyBill,
  faGift,
  faCaravan,
  faTimesCircle,
  faMessage,
  faPhone,
  faGrin,
  faTicket,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

export const results = [
  { id: "1", name: "Allie becker" },
  { id: "2", name: "Binge watch" },
  { id: "3", name: "Black bond" },
  { id: "4", name: "Becker james" },
  { id: "5", name: "lyold praise" },
  { id: "6", name: "George bush" },
  { id: "7", name: "Man zanga" },
  { id: "8", name: "George orwell" },
  { id: "9", name: "Bell braid" },
  { id: "10", name: "John Doe" },
];
export const dashBoardLinks: Link[] = [
  {
    path: "/dashboard",
    title: "Dashboard",
    icon: faGrin,
  },
  {
    path: "",
    title: "User Management",
    icon: faUsers,
    subLinks: [
      {
        path: "/user-portal",
        title: "User Portal",
        icon: faCircleDot,
      },
      {
        path: "/referral-portal",
        title: "Referral Portal",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "Exchange Rate",
    icon: faMoneyBill,
    subLinks: [
      {
        path: "/crypto-rates",
        title: "Rate Board",
        icon: faCircleDot,
      },
      {
        path: "/rate-logs",
        title: "Rate Log",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "Gift Cards",
    icon: faGift,
    subLinks: [
      {
        path: "/gift-card-management",
        title: "Gift Card Management",
        icon: faCircleDot,
      },
      {
        path: "/service-management",
        title: "Service Management",
        icon: faCircleDot,
      },
      {
        path: "/card-funnel",
        title: "Card Funnel",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "Virtual Cards",
    icon: faCaravan,
    subLinks: [
      {
        path: "/card-list",
        title: "Card List",
        icon: faCircleDot,
      },
      {
        path: "/card-transaction-logs",
        title: "Transaction Logs",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "Finance",
    icon: faClockRotateLeft,
    subLinks: [
      {
        path: "/aum",
        title: "AUM",
        icon: faCircleDot,
      },
      {
        path: "/finance-ledger",
        title: "Ledger",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "Transactions",
    icon: faTimesCircle,
    subLinks: [
      {
        path: "/transaction-logs",
        title: "Transaction Log",
        icon: faCircleDot,
      },
      {
        path: "/transaction-count",
        title: "Transaction Count",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "Support",
    icon: faMessage,
    subLinks: [
      {
        path: "/chat",
        title: "Chat",
        icon: faCircleDot,
      },
      {
        path: "/ticket",
        title: "Ticket",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "Compliance",
    icon: faTicket,
    subLinks: [
      {
        path: "/kyc-management",
        title: "KYC Management",
        icon: faCircleDot,
      },
      {
        path: "/aml-management",
        title: "AML Management",
        icon: faCircleDot,
      },
      {
        path: "/sanction-list",
        title: "Sanction List",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "App Management",
    icon: faPhone,
    subLinks: [
      {
        path: "/notification-management",
        title: "Notification Management",
        icon: faCircleDot,
      },
      {
        path: "/content-management",
        title: "Content Management",
        icon: faCircleDot,
      },
    ],
  },
  {
    path: "",
    title: "Administration",
    icon: faCog,
    subLinks: [
      {
        path: "/manage-staff",
        title: "Manage Staff",
        icon: faCircleDot,
      },
      {
        path: "/manage-roles",
        title: "Manage Roles",
        icon: faCircleDot,
      },
      {
        path: "/activity-log",
        title: "Activity Log",
        icon: faCircleDot,
      },
    ],
  },
];
export const baseUrl = "http://143.198.139.193/api/v1";

export const headers = [
  { key: "id", label: "ID" },
  { key: "user", label: "User" },
  { key: "age", label: "Age" },
  { key: "status", label: "Status" },
  { key: "time", label: "Time" },
];

export const data = [
  {
    id: 1,
    name: "Alice",
    age: 25,
    status: "active",
    email: "alice@example.com",
    image: "https://example.com/alice.jpg",
    time: "2023-10-15 03:28 AM",
  },
  {
    id: 2,
    name: "Bob",
    age: 30,
    status: "flagged",
    email: "bob@example.com",
    image: "https://example.com/bob.jpg",
    time: "2023-10-14 09:15 PM",
  },
  {
    id: 3,
    name: "Charlie",
    age: 35,
    status: "inactive",
    email: "charlie@example.com",
    image: "https://example.com/charlie.jpg",
    time: "2023-10-13 10:45 AM",
  },

  // Add more data here as needed
];

export const steps = [
  { title: "KYC LEVEL 1" },
  { title: "KYC LEVEL 2" },
  { title: "KYC LEVEL 3" },
];

export const reasons = ["BTC", "ETH", "UDST"];

export const USER_TOKEN = "token";

export const routes = {
  home: "/",
  register: "/register",
  secondAuth: "/auth",
  forgotpassword: "/forgot-password",
  resetpassword: "/reset-password",
};

export const permissions = [
  "transaction history 1",
  "transaction history 2",
  "transaction history 3",
  "transaction history 4",
  "transaction history 5",
  "transaction history 6",
  "transaction history 7",
  "transaction history 8",
  "transaction history 9",
];

export const genders = ["Male", "Female"];
export const reports = ["you"];

export const userDashboard = [
  {
    type: "crypto",
    image: Btc,
    coinName: "Bitcoin",
    balance: 0.5034597,
    amount: 3000000,
  },
  {
    type: "crypto",
    image: Eth,
    coinName: "Ethereum",
    balance: 0.5034597,
    amount: 3000000,
  },
  {
    type: "fiat",
    image: USDT,
    coinName: "USDT",
    balance: 0.5034597,
    amount: 3000000,
  },
];
export const currentCoins = ["btc", "eth", "usdt"];
export const currentCountries = ["nigeria", "ghana", "South Africa"];
export const ticketStatus = ["new", "onGoing", "resolved"];
export const ticketColors: Record<string, string> = {
  new: "#0D63D3",
  resolved: "#FAC885",
  ongoing: "#54C104",
};

export const tableStatusColors: Record<string, string> = {
  active: "#027A48",
  flagged: "#0D63D3",
  inactive: "#F15046",
  completed: "#027A48",
  pending: "#F15046",
};

export const tableClaims: Record<string, string> = {
  claimed: "#027A48",
  unclaimed: "#0D63D3",
};

export const tableBackgroundColors: Record<string, string> = {
  active: "rgba(42, 181, 125, 0.3)",
  flagged: "rgba(13, 99, 211, 0.3)",
  inactive: "rgba(255, 154, 152, 0.3)",
  completed: "rgba(42, 181, 125, 0.3)",
  pending: "rgba(255, 154, 152, 0.3)",
};

export const assetImages: Record<string, string> = {
  fiat: USDT,
  usdt: USDT,
  btc: Btc,
  eth: Eth,
};
//FOR YOU USING  USEMEMO
// const options = useMemo(() => countryList().getData(), []);
