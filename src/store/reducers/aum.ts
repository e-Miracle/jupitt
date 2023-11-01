import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICryptoAum, IFiatAum } from "../../utils";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type InitialState = {
  fiat_aum_loading: boolean;
  fiat_aum: null | Array<IFiatAum>;
  crypto_aum: null | ICryptoAum;
  crypto_aum_loading: boolean;
  error: string[];
};

const initialState: InitialState = {
  fiat_aum: null,
  fiat_aum_loading: false,
  crypto_aum_loading: false,
  crypto_aum: null,
  error: [],
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
  },
});
export default AuthSlice.reducer;
