import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ITransactions, IGet } from "../../utils";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type InitialState = {
  transactions: null | Array<ITransactions>;
  loading: boolean;
  error: string[];
};

const initialState: InitialState = {
  transactions: null,
  loading: false,
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
  },
});
export default Slice.reducer;
