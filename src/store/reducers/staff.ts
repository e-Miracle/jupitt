import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { IStaff } from "../../utils";
import { baseUrl } from "../../constants";
import axios from "axios";
import { toast } from "react-hot-toast";

type InitialState = {
  error: string[];
  staff: null | Array<IStaff>;
  staff_loading: boolean;
  staff_current_page: null | number;
  staff_next_page_url: null | string;
  staff_per_page: number;
  staff_prev_page_url: null | string;
  staff_last_page: number;
  single_staff: null | IStaff;
  staff_staff_loading: boolean;
};

type Response = {
  data: Array<IStaff>;
  current_page: null | number;
  next_page_url: null | string;
  per_page: number;
  prev_page_url: null | string;
  last_page: number;
};

const initialState: InitialState = {
  error: [],
  staff: null,
  staff_loading: false,
  staff_current_page: null,
  staff_next_page_url: null,
  staff_per_page: 0,
  staff_prev_page_url: null,
  staff_last_page: 0,
  single_staff: null,
  staff_staff_loading: false
};

export const getStaffs = createAsyncThunk("staff/getStaffs", async () => {
  try {
    const res = await axios.get(`${baseUrl}/get-all-staff`);
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

export const getSingleStaff = createAsyncThunk(
  "staff/getSingleStaff",
  async (id: string) => {
    try {
      const res = await axios.get(`${baseUrl}/get-all-staff?identifier=${id}`);
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
  name: "staff",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getStaffs.pending, (state) => {
      state.staff_loading = true;
    });
    builder.addCase(
      getStaffs.fulfilled,
      (state, action: PayloadAction<Response>) => {
        state.staff_loading = false;
        state.staff = action.payload.data;
        state.staff_current_page = action.payload.current_page;
        state.staff_next_page_url = action.payload.next_page_url;
        state.staff_prev_page_url = action.payload.prev_page_url;
        state.staff_per_page = action.payload.per_page;
        state.staff_last_page = action.payload.last_page;
      }
    );
    builder.addCase(
      getStaffs.rejected,
      (state, action: PayloadAction<unknown>) => {
        state.staff_loading = false;
        if (action?.payload) {
          const error = action.payload as { message?: string[] | undefined };
          state.error = error.message || ["Something went wrong"];
        } else {
          state.error = ["Something went wrong"];
        }
      }
      );
       builder.addCase(getSingleStaff.pending, (state) => {
         state.staff_staff_loading = true;
       });
       builder.addCase(
         getSingleStaff.fulfilled,
         (state, action: PayloadAction<IStaff>) => {
           state.staff_staff_loading = false;
           state.single_staff = action.payload;
         }
       );
       builder.addCase(
         getSingleStaff.rejected,
         (state, action: PayloadAction<unknown>) => {
           state.staff_staff_loading = false;
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
