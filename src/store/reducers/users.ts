import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axios from "axios";
import { baseUrl } from "../../constants";
import { IGet } from "../../utils";
import { NormalUser, INormalUserTransactions } from "../../utils";

type InitialState = {
  loading: boolean;
  users: NormalUser[] | null;
  user: NormalUser | null;
  error: string[];
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  current_page: null | number;
  to: number;
  total: number;
  this_week: number | null;
  totalUsers: number | null;
  last_week: number | null;
  transactionLoader: boolean;
  transactions: INormalUserTransactions[] | null;
};

type Count = {
  this_week: number | null;
  total: number | null;
  last_week: number | null;
};

type Response = {
  data: NormalUser[];
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  last_page: number;
};

const initialState: InitialState = {
  loading: false,
  users: null,
  user: null,
  next_page_url: null,
  per_page: 15,
  prev_page_url: null,
  to: 0,
  total: 0,
  current_page: null,
  this_week: null,
  totalUsers: null,
  last_week: null,
  transactionLoader: false,
   transactions: null,
  error: [],
};

export const get = createAsyncThunk("users/get", async (values: IGet) => {
  const filter: { [key: string]: string } = {
    ...values,
  };
  const queryString = new URLSearchParams(filter).toString();
  try {
    const res = await axios.get(`${baseUrl}/user/all?${queryString}`);
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

export const getCount = createAsyncThunk("users/getCount", async () => {
  try {
    const res = await axios.get(`${baseUrl}/user/count`);
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

export const getById = createAsyncThunk("users/getById", async (id: string) => {
  try {
    const res = await axios.get(`${baseUrl}/user/single/${id}`);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
      return err.response.data.message;
    }
  }
});

export const getUserTransactions = createAsyncThunk("users/getTransactions", async (id: string) => {
  try {
    const res = await axios.get(
      `${baseUrl}/transactions/user/all?identifier=${id}`
    );
    toast.success(res.data.message);
    return res.data.data.data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
      return err.response.data.message;
    }
  }
});

const Slice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(get.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(get.fulfilled, (state, action: PayloadAction<Response>) => {
      state.loading = false;
      state.users = action.payload.data;
      state.current_page = action.payload.current_page;
      state.next_page_url = action.payload.next_page_url;
      state.prev_page_url = action.payload.prev_page_url;
      state.per_page = action.payload.per_page;
      state.to = action.payload.to;
      state.total = action.payload.last_page;
    });
    builder.addCase(get.rejected, (state, action: PayloadAction<unknown>) => {
      state.loading = false;
      if (action?.payload) {
        const error = action.payload as { message?: string[] | undefined };
        state.error = error.message || ["Something went wrong"];
      } else {
        state.error = ["Something went wrong"];
      }
    });
    builder.addCase(
      getCount.fulfilled,
      (state, action: PayloadAction<Count>) => {
        state.this_week = action.payload.this_week;
        state.totalUsers = action.payload.total;
        state.last_week = action.payload.last_week;
      }
    );
    builder.addCase(
      getCount.rejected,
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
    builder.addCase(getById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getById.fulfilled,
      (state, action: PayloadAction<NormalUser>) => {
        state.loading = false;
        state.user = action.payload;
      }
    );
    builder.addCase(
      getById.rejected,
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
    builder.addCase(getUserTransactions.pending, (state) => {
      state.transactionLoader = true;
    });
    builder.addCase(
      getUserTransactions.fulfilled,
      (state, action: PayloadAction<INormalUserTransactions[]>) => {
        state.transactionLoader = false;
        state.transactions = action.payload;
      }
    );
    builder.addCase(
      getUserTransactions.rejected,
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
  },
});

export default Slice.reducer;
