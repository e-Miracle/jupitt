import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICryptoRateLog, IGet } from "../../utils";
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

const initialState: InitialState = {
  crypto_current_page: null,
  crypto_next_page_url: null,
  crypto_per_page: 15,
  crypto_prev_page_url: null,
  crypto_total: 0,
  crypto_logs_loading: false,
  crypto_last_page: 0,
  crypto_logs: null,
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
  },
});
export default Slice.reducer;
