import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { User, ILogin, LoginResponse } from "../../utils";
import { USER_TOKEN, baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";
// import { data } from "../../constants/index";
const cookieConfig: Cookies.CookieAttributes = {
  expires: 7,
  secure: true,
  sameSite: "Lax",
  path: "/",
};

type InitialState = {
  token: string | null;
  isAuthenticated: null | boolean;
  user: null | User;
  loading: boolean;
  error: string[];
};

const initialState: InitialState = {
  token: Cookies.get(USER_TOKEN)! || null,
  isAuthenticated: null,
  loading: true,
  user: null,
  error: [],
};

export const getUser = createAsyncThunk("auth/getuser", async () => {
  try {
    const res = await axios.get(`${baseUrl}/user`);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message)
    }
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      toast.error(err.response.data.message);
      err.response.data.message.map((err: string) => toast.error(err));
      return err.response.data.message;
    }
  }
});

export const login = createAsyncThunk("auth/login", async (values: ILogin) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/login`, body, config);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err) {
    console.log();

    if (err instanceof Error) {
     console.log(err.message);
    }
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      toast.error(err.response.data.message);
      err.response.data.message.map((err: string) => toast.error(err));
      return err.response.data.message;
    }
  }
});

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove(USER_TOKEN);
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action: PayloadAction<User>) => {
      state.loading = false;
      state.isAuthenticated = action.payload ? true : null;
      state.user = action.payload;
    });
    builder.addCase(getUser.rejected, (state) => {
      Cookies.remove(USER_TOKEN);
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        Cookies.set(USER_TOKEN, action.payload.token, cookieConfig);
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.admin;
      }
    );
    builder.addCase(login.rejected, (state) => {
      Cookies.remove(USER_TOKEN);
      state.loading = false;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    });
  },
});
export const { logout } = AuthSlice.actions;
export default AuthSlice.reducer;
