import { RouteObject } from "react-router-dom";
import {
  Register,
  Login,
  Success,
  EmailOtp,
  PhoneOtp,
  SecondAuth,
  ForgetPassword,
  ResetPassword,
  Dashboard,
  UserPortal,
  ReferalPortal,
  RateBoard,
  RateLog,
  GiftCardMangement,
  CardFunnel,
  CardList,
  TransactionLogs,
  TransactionLog,
  TransactionCount,
  Ticket,
  Chat,
  KycManagement,
  AmlManagement,
  SanctionList,
  NotificationManagement,
  ContentManagement,
  ManageStaff,
  ManageRoles,
  ActivityLog,
  SingleUser,
  SingleStaff,
  CreateStaff,
} from "./pages";
import NotFound from "./components/NotFound/NotFound";
import { DashboardLayout, FormLayout } from "./layouts";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <FormLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/auth",
        element: <SecondAuth />,
      },
      {
        path: "/phone-otp",
        element: <PhoneOtp />,
      },
      {
        path: "/email-otp",
        element: <EmailOtp />,
      },
      {
        path: "/success",
        element: <Success />,
      },
      {
        path: "/forgot-password",
        element: <ForgetPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
  {
    path: "/user-portal",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <UserPortal />,
      },
      {
        path: "/user-portal/user/:id",
        element: <SingleUser />,
      },
    ],
  },
  {
    path: "/referral-portal",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ReferalPortal />,
      },
    ],
  },
  {
    path: "/crypto-rates",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <RateBoard />,
      },
    ],
  },
  {
    path: "/rate-logs",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <RateLog />,
      },
    ],
  },
  {
    path: "/gift-card-management",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <GiftCardMangement />,
      },
    ],
  },
  {
    path: "/card-funnel",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <CardFunnel />,
      },
    ],
  },
  {
    path: "/card-list",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <CardList />,
      },
    ],
  },
  {
    path: "/card-transaction-logs",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <TransactionLogs />,
      },
    ],
  },
  {
    path: "/transaction-logs",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <TransactionLog />,
      },
    ],
  },
  {
    path: "/transaction-count",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <TransactionCount />,
      },
    ],
  },
  {
    path: "/kyc-management",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <KycManagement />,
      },
    ],
  },
  {
    path: "/aml-management",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <AmlManagement />,
      },
    ],
  },
  {
    path: "/sanction-list",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <SanctionList />,
      },
    ],
  },
  {
    path: "/notification-management",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <NotificationManagement />,
      },
    ],
  },
  {
    path: "/content-management",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ContentManagement />,
      },
    ],
  },
  {
    path: "/manage-staff",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ManageStaff />,
      },
      {
        path: "/manage-staff/staff/:id",
        element: <SingleStaff />,
      },
      {
        path: "/manage-staff/staff/edit/:id",
        element: <SingleStaff />,
      },
      {
        path: "/manage-staff/staff/create",
        element: <CreateStaff />,
      },
    ],
  },
  {
    path: "/manage-roles",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ManageRoles />,
      },
    ],
  },
  {
    path: "/activity-log",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <ActivityLog />,
      },
    ],
  },
  {
    path: "/chat",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Chat />,
      },
    ],
  },
  {
    path: "/ticket",
    element: <DashboardLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Ticket />,
      },
    ],
  },
];

export default routes;
