import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ICryptoAum,
  IFiatAum,
  ITransactions,
  IGet,
  IFiatTransactions,
} from "../../utils";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type InitialState = {
  fiat_aum_loading: boolean;
  fiat_aum: null | Array<IFiatAum>;
  crypto_aum: null | ICryptoAum;
  crypto_aum_loading: boolean;
  error: string[];
  crypto_logs: null | Array<ITransactions>;
  crypto_logs_loading: boolean;
  crypto_current_page: null | number;
  crypto_next_page_url: null | string;
  crypto_per_page: number;
  crypto_prev_page_url: null | string;
  crypto_last_page: number;
  fiat_logs: null | Array<IFiatTransactions>;
  fiat_logs_loading: boolean;
  fiat_current_page: null | number;
  fiat_next_page_url: null | string;
  fiat_per_page: number;
  fiat_prev_page_url: null | string;
  fiat_last_page: number;
};

const initialState: InitialState = {
  fiat_aum: null,
  fiat_aum_loading: false,
  crypto_aum_loading: false,
  crypto_aum: null,
  error: [],
  crypto_logs: null,
  crypto_logs_loading: false,
  crypto_current_page: null,
  crypto_next_page_url: null,
  crypto_per_page: 15,
  crypto_prev_page_url: null,
  crypto_last_page: 0,
  fiat_logs: null,
  fiat_logs_loading: false,
  fiat_current_page: null,
  fiat_next_page_url: null,
  fiat_per_page: 15,
  fiat_prev_page_url: null,
  fiat_last_page: 0,
};

type Response = {
  data: Array<ITransactions>;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  last_page: number;
};


type Response2 = {
  data: Array<IFiatTransactions>;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  last_page: number;
};


export const getCryptoAum = createAsyncThunk("aum/getCryptoAum", async () => {
  try {
    const res = await axios.get(`${baseUrl}/aum/crypto`);
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

export const getFiatAum = createAsyncThunk("aum/getFiatAum", async () => {
  try {
    const res = await axios.get(`${baseUrl}/aum/fiat`);
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

export const getCryptoLogs = createAsyncThunk(
  "aum/getcryptoLogs",
  async (values: IGet) => {
    const filter: { [key: string]: string } = {
      ...values,
    };
    const queryString = new URLSearchParams(filter).toString();
    try {
      const res = await axios.get(
        `${baseUrl}/transactions/crypto?${queryString}`
      );
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

export const getFiatLogs = createAsyncThunk(
  "aum/getfiatLogs",
  async (values: IGet) => {
    const filter: { [key: string]: string } = {
      ...values,
    };
    const queryString = new URLSearchParams(filter).toString();
    try {
      const res = await axios.get(
        `${baseUrl}/transactions/fiat?${queryString}`
      );
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

const AuthSlice = createSlice({
  name: "aum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCryptoAum.pending, (state) => {
      state.crypto_aum_loading = true;
    });
    builder.addCase(
      getCryptoAum.fulfilled,
      (state, action: PayloadAction<ICryptoAum>) => {
        state.crypto_aum_loading = false;
        state.crypto_aum = action.payload;
      }
    );
    builder.addCase(
      getCryptoAum.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.crypto_aum_loading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );
    builder.addCase(getFiatAum.pending, (state) => {
      state.fiat_aum_loading = true;
    });
    builder.addCase(
      getFiatAum.fulfilled,
      (state, action: PayloadAction<Array<IFiatAum>>) => {
        state.fiat_aum_loading = false;
        state.fiat_aum = action.payload;
      }
    );
    builder.addCase(
      getFiatAum.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.fiat_aum_loading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );
     builder.addCase(getCryptoLogs.pending, (state) => {
       state.crypto_logs_loading = true;
     });
     builder.addCase(
       getCryptoLogs.fulfilled,
       (state, action: PayloadAction<Response>) => {
         state.crypto_logs_loading = false;
         state.crypto_logs = action.payload.data;
         state.crypto_current_page = action.payload.current_page;
         state.crypto_next_page_url = action.payload.next_page_url;
         state.crypto_prev_page_url = action.payload.prev_page_url;
         state.crypto_per_page = action.payload.per_page;
         state.crypto_last_page = action.payload.last_page;
       }
     );
     builder.addCase(
       getCryptoLogs.rejected,
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
    builder.addCase(getFiatLogs.pending, (state) => {
      state.fiat_logs_loading = true;
    });
    builder.addCase(
      getFiatLogs.fulfilled,
      (state, action: PayloadAction<Response2>) => {
        state.fiat_logs_loading = false;
        state.fiat_logs = action.payload.data;
        state.fiat_current_page = action.payload.current_page;
        state.fiat_next_page_url = action.payload.next_page_url;
        state.fiat_prev_page_url = action.payload.prev_page_url;
        state.fiat_per_page = action.payload.per_page;
        state.fiat_last_page = action.payload.last_page;
      }
    );
    builder.addCase(
      getFiatLogs.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.fiat_logs_loading = false;
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
export default AuthSlice.reducer;
