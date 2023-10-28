import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RefferalLog, RefferalCount, IReferralSettingMain } from "../../utils";
import {  baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type Response = {
  data: RefferalLog[];
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  last_page: number;
};

type Response2 = {
  data: RefferalCount[];
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  last_page: number;
};
type InitialState = {
  referralLogs: null | RefferalLog[];
  referralLogsnext_page_url: null | string;
  referralLogsper_page: number;
  referralLogsprev_page_url: null | string;
  referralLogscurrent_page: null | number;
  referralLogsto: number;
  referralLogstotal: number;
  referralLogsloading: boolean;
  referralCount: null | RefferalCount[];
  referralCountnext_page_url: null | string;
  referralCountper_page: number;
  referralCountprev_page_url: null | string;
  referralCountcurrent_page: null | number;
  referralCountto: number;
  referralCounttotal: number;
  referralCountloading: boolean;
  settingsLoader: boolean;
  settings: IReferralSettingMain[] | null;
  error: string[];
};

const initialState: InitialState = {
  referralLogs: null,
  referralLogsnext_page_url: null,
  referralLogsper_page: 0,
  referralLogsprev_page_url: null,
  referralLogscurrent_page: null,
  referralLogsto: 0,
  referralLogstotal: 0,
  referralLogsloading: false,
  referralCount: null,
  referralCountnext_page_url: null,
  referralCountper_page: 0,
  referralCountprev_page_url: null,
  referralCountcurrent_page: null,
  referralCountto: 0,
  referralCounttotal: 0,
  referralCountloading: false,
  settingsLoader: false,
  settings: null,
  error: [],
};

export const getLogs = createAsyncThunk("referral/getLogs", async () => {
  try {
    const res = await axios.get(`${baseUrl}/referral/log`);
    toast.success(res.data.message);
    return res.data.data.referrals;
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
      return err.response.data.message;
    }
  }
});

export const getSettings = createAsyncThunk("referral/getSettings", async () => {
  try {
    const res = await axios.get(`${baseUrl}/referral/setting`);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
      return err.response.data.message;
    }
  }
});

export const getCount = createAsyncThunk("referral/getCount", async () => {
  try {
    const res = await axios.get(`${baseUrl}/referral/count`);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
      return err.response.data.message;
    }
  }
});

const Slice = createSlice({
  name: "referral",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getLogs.pending, (state) => {
      state.referralLogsloading = true;
    });
    builder.addCase(
      getLogs.fulfilled,
      (state, action: PayloadAction<Response>) => {
        state.referralLogsloading = false;
        state.referralLogs = action.payload.data;
        state.referralLogscurrent_page = action.payload.current_page;
        state.referralLogsnext_page_url = action.payload.next_page_url;
        state.referralLogsprev_page_url = action.payload.prev_page_url;
        state.referralLogsper_page = action.payload.per_page;
        state.referralLogsto = action.payload.to;
        state.referralLogstotal = action.payload.last_page;
      }
    );
    builder.addCase(
      getLogs.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.referralLogsloading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );builder.addCase(getCount.pending, (state) => {
      state.referralCountloading = true;
    });
    builder.addCase(
      getCount.fulfilled,
      (state, action: PayloadAction<Response2>) => {
        state.referralCountloading = false;
        state.referralCount = action.payload.data;
        state.referralCountcurrent_page = action.payload.current_page;
        state.referralCountnext_page_url = action.payload.next_page_url;
        state.referralCountprev_page_url = action.payload.prev_page_url;
        state.referralCountper_page = action.payload.per_page;
        state.referralCountto = action.payload.to;
        state.referralCounttotal = action.payload.last_page;
      }
    );
    builder.addCase(
      getCount.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.referralLogsloading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );
    builder.addCase(getSettings.pending, (state) => {
      state.settingsLoader = true;
    });
    builder.addCase(
      getSettings.fulfilled,
      (state, action: PayloadAction<IReferralSettingMain[]>) => {
        state.settingsLoader = false;
        state.settings = action.payload;
      }
    );
    builder.addCase(
      getSettings.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.settingsLoader = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );
  },
});

export default Slice.reducer;
