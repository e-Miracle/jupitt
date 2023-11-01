import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ICryptoRateLog,
  IGet,
  ISwapRateLog,
  IPmRateLog,
  IVCRateLog,
} from "../../utils";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type InitialState = {
  crypto_logs: null | Array<ICryptoRateLog>;
  crypto_logs_loading: boolean;
  crypto_current_page: null | number;
  crypto_next_page_url: null | string;
  crypto_per_page: number;
  crypto_prev_page_url: null | string;
  crypto_total: number;
  crypto_last_page: number;
  swap_logs: null | Array<ISwapRateLog>;
  swap_logs_loading: boolean;
  swap_current_page: null | number;
  swap_next_page_url: null | string;
  swap_per_page: number;
  swap_prev_page_url: null | string;
  swap_total: number;
  swap_last_page: number;
  pm_logs: null | Array<IPmRateLog>;
  pm_logs_loading: boolean;
  pm_current_page: null | number;
  pm_next_page_url: null | string;
  pm_per_page: number;
  pm_prev_page_url: null | string;
  pm_total: number;
  pm_last_page: number;
  vc_logs: null | Array<IVCRateLog>;
  vc_logs_loading: boolean;
  vc_current_page: null | number;
  vc_next_page_url: null | string;
  vc_per_page: number;
  vc_prev_page_url: null | string;
  vc_total: number;
  vc_last_page: number;
  error: string[];
};

type CrytoResponse = {
  data: Array<ICryptoRateLog>;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  last_page: number;
};

type SwapResponse = {
  data: Array<ISwapRateLog>;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  last_page: number;
};

type PmResponse = {
  data: Array<IPmRateLog>;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  last_page: number;
};

type VcResponse = {
  data: Array<IVCRateLog>;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  last_page: number;
};

const initialState: InitialState = {
  crypto_current_page: null,
  crypto_next_page_url: null,
  crypto_per_page: 15,
  crypto_prev_page_url: null,
  crypto_total: 0,
  crypto_logs_loading: false,
  crypto_last_page: 0,
  crypto_logs: null,
  swap_current_page: null,
  swap_next_page_url: null,
  swap_per_page: 15,
  swap_prev_page_url: null,
  swap_total: 0,
  swap_logs_loading: false,
  swap_last_page: 0,
  swap_logs: null,
  pm_current_page: null,
  pm_next_page_url: null,
  pm_per_page: 15,
  pm_prev_page_url: null,
  pm_total: 0,
  pm_logs_loading: false,
  pm_last_page: 0,
  pm_logs: null,
  vc_current_page: null,
  vc_next_page_url: null,
  vc_per_page: 15,
  vc_prev_page_url: null,
  vc_total: 0,
  vc_logs_loading: false,
  vc_last_page: 0,
  vc_logs: null,
  error: [],
};

export const getCrypto = createAsyncThunk(
  "log/getCryptoLogs",
  async (values: IGet) => {
    const filter: { [key: string]: string } = {
      ...values,
    };
    const queryString = new URLSearchParams(filter).toString();
    try {
      const res = await axios.get(`${baseUrl}/rate/crypto-log?${queryString}`);
      toast.success(res.data.message);
      return res.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
        err.response.data.message.map((err: string) => toast.error(err));
        return err.response.data.message;
      }
    }
  }
);
export const getSwap = createAsyncThunk(
  "log/getSwapLogs",
  async (values: IGet) => {
    const filter: { [key: string]: string } = {
      ...values,
    };
    const queryString = new URLSearchParams(filter).toString();
    try {
      const res = await axios.get(`${baseUrl}/rate/swap-log?${queryString}`);
      toast.success(res.data.message);
      return res.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
        err.response.data.message.map((err: string) => toast.error(err));
        return err.response.data.message;
      }
    }
  }
);

export const getPm = createAsyncThunk(
  "log/getPmLogs",
  async (values: IGet) => {
    const filter: { [key: string]: string } = {
      ...values,
    };
    const queryString = new URLSearchParams(filter).toString();
    try {
      const res = await axios.get(`${baseUrl}/rate/pm-log?${queryString}`);
      toast.success(res.data.message);
      return res.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
        err.response.data.message.map((err: string) => toast.error(err));
        return err.response.data.message;
      }
    }
  }
);

export const getVc= createAsyncThunk("log/getVcLogs", async (values: IGet) => {
  const filter: { [key: string]: string } = {
    ...values,
  };
  const queryString = new URLSearchParams(filter).toString();
  try {
    const res = await axios.get(`${baseUrl}/rate/vc-log?${queryString}`);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err: unknown) {
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

const Slice = createSlice({
  name: "log",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCrypto.pending, (state) => {
      state.crypto_logs_loading = true;
    });
    builder.addCase(
      getCrypto.fulfilled,
      (state, action: PayloadAction<CrytoResponse>) => {
        state.crypto_logs_loading = false;
        state.crypto_logs = action.payload.data;
        state.crypto_current_page = action.payload.current_page;
        state.crypto_next_page_url = action.payload.next_page_url;
        state.crypto_prev_page_url = action.payload.prev_page_url;
        state.crypto_per_page = action.payload.per_page;
        state.crypto_total = action.payload.last_page;
      }
    );
    builder.addCase(
      getCrypto.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.crypto_logs_loading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );
    builder.addCase(getSwap.pending, (state) => {
      state.swap_logs_loading = true;
    });
    builder.addCase(
      getSwap.fulfilled,
      (state, action: PayloadAction<SwapResponse>) => {
        state.swap_logs_loading = false;
        state.swap_logs = action.payload.data;
        state.swap_current_page = action.payload.current_page;
        state.swap_next_page_url = action.payload.next_page_url;
        state.swap_prev_page_url = action.payload.prev_page_url;
        state.swap_per_page = action.payload.per_page;
        state.swap_total = action.payload.last_page;
      }
    );
    builder.addCase(
      getSwap.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.swap_logs_loading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );
    builder.addCase(getPm.pending, (state) => {
      state.pm_logs_loading = true;
    });
    builder.addCase(
      getPm.fulfilled,
      (state, action: PayloadAction<PmResponse>) => {
        state.pm_logs_loading = false;
        state.pm_logs = action.payload.data;
        state.pm_current_page = action.payload.current_page;
        state.pm_next_page_url = action.payload.next_page_url;
        state.pm_prev_page_url = action.payload.prev_page_url;
        state.pm_per_page = action.payload.per_page;
        state.pm_total = action.payload.last_page;
      }
    );
    builder.addCase(getPm.rejected, (state, action: PayloadAction<unknown>) => {
      state.pm_logs_loading = false;
      if (action?.payload) {
        const error = action.payload as { message?: string[] | undefined };
        state.error = error.message || ["Something went wrong"];
      } else {
        state.error = ["Something went wrong"];
      }
    });
     builder.addCase(getVc.pending, (state) => {
       state.vc_logs_loading = true;
     });
     builder.addCase(
       getVc.fulfilled,
       (state, action: PayloadAction<VcResponse>) => {
         state.vc_logs_loading = false;
         state.vc_logs = action.payload.data;
         state.vc_current_page = action.payload.current_page;
         state.vc_next_page_url = action.payload.next_page_url;
         state.vc_prev_page_url = action.payload.prev_page_url;
         state.vc_per_page = action.payload.per_page;
         state.vc_total = action.payload.last_page;
       }
     );
     builder.addCase(
       getVc.rejected,
       (state, action: PayloadAction<unknown>) => {
         state.vc_logs_loading = false;
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
