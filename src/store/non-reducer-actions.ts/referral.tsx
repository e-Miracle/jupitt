import axios from "axios";
import toast from "react-hot-toast";
import { IReferralSettings } from "../../utils";
import { baseUrl } from "../../constants";

export const saveSetting = async (values: IReferralSettings) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/referral/setting`, body, config);
    toast.success(res.data.message);
    return res.data.data;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
    }
  }
};
