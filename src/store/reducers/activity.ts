import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IActivity, IGet } from "../../utils";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type InitialState = {
  activities: null | Array<IActivity>;
  single_activity: null | IActivity;
  loading: boolean;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  total: number;
  last_page: number;
  error: string[];
};

type Response = {
  data: Array<IActivity>;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  to: number;
  last_page: number;
};

const initialState: InitialState = {
  current_page: null,
  next_page_url: null,
  per_page: 15,
  prev_page_url: null,
  total: 0,
  loading: false,
  last_page: 0,
    activities: null,
  single_activity: null,
  error: [],
};

export const getAll = createAsyncThunk(
  "activities/getAll",
  async (values: IGet) => {
    const filter: { [key: string]: string } = {
      ...values,
    };
    const queryString = new URLSearchParams(filter).toString();
    try {
      const res = await axios.get(`${baseUrl}/activity/log?${queryString}`);
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

export const getOne = createAsyncThunk(
  "activities/getOne",
  async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/activity/show/${id}`);
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
    builder.addCase(getAll.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getAll.fulfilled,
      (state, action: PayloadAction<Response>) => {
        state.loading = false;
        state.activities = action.payload.data;
        state.current_page = action.payload.current_page;
        state.next_page_url = action.payload.next_page_url;
        state.prev_page_url = action.payload.prev_page_url;
        state.per_page = action.payload.per_page;
        state.total = action.payload.last_page;
      }
    );
    builder.addCase(
      getAll.rejected,
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
      builder.addCase(getOne.pending, (state) => {
        state.loading = true;
      });
      builder.addCase(
        getOne.fulfilled,
        (state, action: PayloadAction<IActivity>) => {
            state.loading = false;
            state.single_activity = action.payload;
        }
      );
      builder.addCase(
        getOne.rejected,
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