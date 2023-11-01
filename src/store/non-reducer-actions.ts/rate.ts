import axios from "axios";
import { toast } from "react-hot-toast";
import { ICryptoRate } from "../../utils";
import { baseUrl } from "../../constants";

export const setCryptoRate = async (values: ICryptoRate) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/rate/crypto`, body, config);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
    if (axios.isAxiosError(err) && err.response?.data?.message) {
      toast.error(err.response.data.message);
      err.response.data.message.map((err: string) => toast.error(err));
    }
  }
};
