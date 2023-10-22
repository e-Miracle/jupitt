import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";
import { genders } from "../../constants";

type InitialState = {
  genders: null | string[];
  loading: boolean;
  error: string[];
};

const initialState: InitialState = {
  loading: true,
  genders: null,
  error: [],
};

export const get = createAsyncThunk("gender/get", async () => {
  try {
    const res = await axios.get(`${baseUrl}/all-genders`);
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

const slice = createSlice({
  name: "gender",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      get.fulfilled,
      (state, action: PayloadAction<Array<string>>) => {
        state.loading = false;
        state.genders = action.payload ? action.payload : genders;
      }
    );
    builder.addCase(get.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default slice.reducer;
