/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any */
import axios from "axios";
import { toast } from "react-hot-toast";
import { IRegisterUser } from "../../utils";
import { baseUrl } from "../../constants";
export const createUser = async (values: any) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const formData = new FormData();
  for (const key in values)
    if (Array.isArray(values[key as keyof IRegisterUser])) {
      values[key as keyof IRegisterUser].map((item: string, index: number) =>
        formData.append(`${key}[${index as number}]`, item)
      );
    } else {
      formData.append(key, values[key as keyof IRegisterUser]);
    }
  try {
    const res = await axios.post(`${baseUrl}/register`, formData, config);
    toast.success(res.data.message);
    console.log(res.data.data);
    return res.data.data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
    }
  }
};
