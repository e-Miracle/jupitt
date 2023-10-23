import { configureStore } from "@reduxjs/toolkit";
import cakeReducer from "./reducers/cake-reducer";
import authReducer from "./reducers/auth"
import genderReducer from "./reducers/gender";
import rolesReducer from "./reducers/roles";
import departmentReducer from "./reducers/department";
import permssionsReducer from "./reducers/permssions";
import reportsReducer from "./reducers/reports"
import userReducer from "./reducers/users"
import refferalReducer from "./reducers/refferals"
import dashBoardReducer from "./reducers/dashboard"
const store = configureStore({
  reducer: {
    auth: authReducer,
    cake: cakeReducer,
    gender: genderReducer,
    roles: rolesReducer,
    permission: permssionsReducer,
    department: departmentReducer,
    reports: reportsReducer,
    user: userReducer,
    referral: refferalReducer,
    dashBoard: dashBoardReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
