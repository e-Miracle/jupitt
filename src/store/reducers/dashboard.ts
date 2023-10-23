import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type Count = {
  this_week: number | null;
  total: number | null;
  last_week: number | null;
};

type InitialState = {
  balance_loading: boolean;
  balance_this_week: number | null;
  balance_totalUsers: number | null;
  balance_last_week: number | null;
  users_loading: boolean;
  users_this_week: number | null;
  users_totalUsers: number | null;
  users_last_week: number | null;
  error: string[];
};

const initialState: InitialState = {
  balance_loading: false,
  balance_this_week: null,
  balance_totalUsers: null,
  balance_last_week: null,
  users_loading: false,
  users_this_week: null,
  users_totalUsers: null,
  users_last_week: null,
  error: [],
};

export const getBalance = createAsyncThunk("dashboard/getBalance", async () => {
  try {
    const res = await axios.get(`${baseUrl}/dashboard/estimated-balance`);
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

export const getUserCount = createAsyncThunk(
  "dashboard/getUserCount",
  async () => {
    try {
      const res = await axios.get(`${baseUrl}/dashboard/user-count`);
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
  }
);

const Slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBalance.pending, (state) => {
        state.balance_loading = true;
        
    });
    builder.addCase(
      getBalance.fulfilled,
        (state, action: PayloadAction<Count>) => {
          state.balance_loading = false;
        state.balance_this_week = action.payload.this_week;
        state.balance_totalUsers = action.payload.total;
        state.balance_last_week = action.payload.last_week;
      }
    );
    builder.addCase(
      getBalance.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.balance_loading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
      );
      builder.addCase(getUserCount.pending, (state) => {
        state.users_loading = true;
      });
      builder.addCase(
        getUserCount.fulfilled,
        (state, action: PayloadAction<Count>) => {
          state.users_loading = false;
          state.users_this_week = action.payload.this_week;
          state.users_totalUsers = action.payload.total;
          state.users_last_week = action.payload.last_week;
        }
      );
      builder.addCase(
        getUserCount.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.users_loading = false;
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
