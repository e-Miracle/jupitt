import { lazy } from "react";

//auth
const Register = lazy(() => import("./auth/register"));
const Login = lazy(() => import("./auth/login"));
const Success = lazy(() => import("./auth/success"));
const EmailOtp = lazy(() => import("./auth/email-otp"));
const PhoneOtp = lazy(() => import("./auth/phone-otp"));
const SecondAuth = lazy(() => import("./auth/seond-auth"));
const ForgetPassword = lazy(() => import("./auth/forget-password"));
const ResetPassword = lazy(() => import("./auth/reset-password"));


//dashboard
const Dashboard = lazy(() => import("./dashboard"));

//user management
const UserPortal = lazy(() => import("./userManagement/user-portal"));
const ReferalPortal = lazy(() => import("./userManagement/refferal-portal"));
const SingleUser = lazy(() => import("./userManagement/single-user"));

//exchange rate
const RateBoard = lazy(() => import("./exchangeRate/rate-board"))
const RateLog = lazy(() => import("./exchangeRate/rate-log"));

//gift cards
const GiftCardMangement = lazy(() => import("./giftcard/gift-card-managemt"));
const CardFunnel = lazy(() => import("./giftcard/card-funnel"));
const ServiceManagement = lazy(() => import('./giftcard/service-mangement'));
const SingleCard = lazy(() => import("./giftcard/singlePages/card"));

//virtual management
const CardList = lazy(() => import("./virtualcards/card-list"));
const TransactionLogs = lazy(() => import("./virtualcards/transaction-logs"));

//transaction
const TransactionLog = lazy(() => import("./transactions/transaction-log"));
const TransactionCount = lazy(() => import("./transactions/transaction-count"));

//support
const Ticket = lazy(() => import("./support/ticket"));
const Chat = lazy(() => import("./support/chat"));

//compliance
const KycManagement = lazy(() => import("./compliance/kyc-management"));
const AmlManagement = lazy(() => import("./compliance/aml-management"));
const SanctionList = lazy(() => import("./compliance/sanction-list"));


//app management
const NotificationManagement = lazy(
  () => import("./appmanagement/notification-management")
);
const ContentManagement = lazy(
  () => import("./appmanagement/content-management")
);

//administrator
const ManageStaff = lazy(
  () => import("./administrator/manage-staff")
);
const ManageRoles = lazy(() => import("./administrator/manage-roles"));
const ActivityLog = lazy(() => import("./administrator/activity-log"));
const SingleStaff = lazy(() => import("./administrator/singlePage/staff"));
const CreateStaff = lazy(() => import("./administrator/singlePage/createStaff"));

export {
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
  SingleCard,
  ServiceManagement,
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
};
