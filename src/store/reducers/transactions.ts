import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITransactions, IGet, ICountCrypto, ICountFiat, ICountPm } from "../../utils";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type InitialState = {
  transactions: null | Array<ITransactions>;
  countCrypto: null | Array<ICountCrypto>;
  countCryptoLoading: boolean;
  countFiat: null | Array<ICountFiat>;
  countFiatLoading: boolean;
  countPm: null | Array<ICountPm>;
  countPmLoading: boolean;
  loading: boolean;
  error: string[];
};

const initialState: InitialState = {
  transactions: null,
  loading: false,
  countCrypto: null,
  countCryptoLoading: false,
  countFiat: null,
  countFiatLoading:false,
  countPm: null,
  countPmLoading: false,
  error: [],
};

export const getTransactions = createAsyncThunk(
  "transactions/getAll",
  async (values: IGet) => {
    const filter: { [key: string]: string } = {
      ...values,
      sort_order:"desc"
    };
    const queryString = new URLSearchParams(filter).toString();
    try {
      const res = await axios.get(`${baseUrl}/transactions/all?${queryString}`);
      toast.success(res.data.message);
      return res.data.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
        err.response.data.message.map((err: string) => toast.error(err));
      }
    }
  }
);

export const getCountCrypto = createAsyncThunk(
  "transactions/getCountCrypto",
  async () => {
    try {
      const res = await axios.get(`${baseUrl}/transactions/count-crypto`);
      toast.success(res.data.message);
      return res.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
        err.response.data.message.map((err: string) => toast.error(err));
      }
    }
  }
);

export const getCountFiat = createAsyncThunk("transactions/getCountFiat", async () => {
  try {
    const res = await axios.get(`${baseUrl}/transactions/count-fiat`);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      toast.error(err.response.data.message);
      err.response.data.message.map((err: string) => toast.error(err));
    }
  }
});

export const getCountPm = createAsyncThunk(
  "transactions/getCountPm",
  async () => {
    try {
      const res = await axios.get(`${baseUrl}/transactions/count-pm`);
      toast.success(res.data.message);
      return res.data.data.data;
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.log(err.message);
      }
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        toast.error(err.response.data.message);
        err.response.data.message.map((err: string) => toast.error(err));
      }
    }
  }
);

const Slice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTransactions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getTransactions.fulfilled,
      (state, action: PayloadAction<Array<ITransactions>>) => {
        state.loading = false;
        state.transactions = action.payload;
      }
    );
    builder.addCase(
      getTransactions.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );
     builder.addCase(getCountCrypto.pending, (state) => {
       state.countCryptoLoading = true;
     });
     builder.addCase(
       getCountCrypto.fulfilled,
       (state, action: PayloadAction<Array<ICountCrypto>>) => {
         state.countCryptoLoading = false;
         state.countCrypto = action.payload;
       }
     );
     builder.addCase(
       getCountCrypto.rejected,
       (state, action: PayloadAction<unknown>) => {
         state.countCryptoLoading = false;
         if (action?.payload) {
           const error = action.payload as { message?: string[] | undefined };
           state.error = error.message || ["Something went wrong"];
         } else {
           state.error = ["Something went wrong"];
         }
       }
    );
     builder.addCase(getCountFiat.pending, (state) => {
       state.countFiatLoading = true;
     });
     builder.addCase(
       getCountFiat.fulfilled,
       (state, action: PayloadAction<Array<ICountFiat>>) => {
         state.countFiatLoading = false;
         state.countFiat= action.payload;
       }
     );
     builder.addCase(
       getCountFiat.rejected,
       (state, action: PayloadAction<unknown>) => {
         state.countFiatLoading = false;
         if (action?.payload) {
           const error = action.payload as { message?: string[] | undefined };
           state.error = error.message || ["Something went wrong"];
         } else {
           state.error = ["Something went wrong"];
         }
       }
    );
    // builder.addCase(getCountPm.pending, (state) => {
    //   state.countPmLoading = true;
    // });
    // builder.addCase(
    //   getCountPm.fulfilled,
    //   (state, action: PayloadAction<Array<ICountPm>>) => {
    //     state.countPmLoading = false;
    //     state.countPm = action.payload;
    //   }
    // );
    // builder.addCase(
    //   getCountPm.rejected,
    //   (state, action: PayloadAction<unknown>) => {
    //     state.countPmLoading = false;
    //     if (action?.payload) {
    //       const error = action.payload as { message?: string[] | undefined };
    //       state.error = error.message || ["Something went wrong"];
    //     } else {
    //       state.error = ["Something went wrong"];
    //     }
    //   }
    // );
  },
});
export default Slice.reducer;
