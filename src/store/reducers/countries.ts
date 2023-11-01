import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { IAllCountry } from "../../utils";
import { USER_TOKEN, baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type InitialState = {
  countries: null | Array<IAllCountry>;
  countries_loader: boolean;
  active_countries: null | Array<IAllCountry>;
  active_countries_loader: boolean;
  error: string[];
};

const initialState: InitialState = {
  countries_loader: false,
  countries: null,
  active_countries_loader: false,
  active_countries: null,
  error: [],
};

export const getCountries = createAsyncThunk(
  "countries/getCountries",
  async () => {
    try {
      const res = await axios.get(`${baseUrl}/countries`);
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

export const getActiveCountries = createAsyncThunk(
  "countries/getActiveCountries",
  async () => {
    try {
      const res = await axios.get(`${baseUrl}/active-countries`);
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
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCountries.pending, (state) => {
      state.countries_loader = true;
    });
    builder.addCase(
      getCountries.fulfilled,
      (state, action: PayloadAction<Array<IAllCountry>>) => {
        state.countries_loader = false;
        state.countries = action.payload;
      }
    );
    builder.addCase(
      getCountries.rejected,
      (state, action: PayloadAction<unknown>) => {
        Cookies.remove(USER_TOKEN);
        state.countries_loader = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
    );
    builder.addCase(getActiveCountries.pending, (state) => {
      state.active_countries_loader = true;
    });
    builder.addCase(
      getActiveCountries.fulfilled,
      (state, action: PayloadAction<Array<IAllCountry>>) => {
        state.active_countries_loader = false;
        state.active_countries = action.payload
      }
    );
    builder.addCase(
      getActiveCountries.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.active_countries_loader = false;
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
