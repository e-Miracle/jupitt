import axios from "axios";
import { toast } from "react-hot-toast";
import { ISignUp, I2FA, IForgotPassword, IResetPassword } from "../../utils";
import { baseUrl } from "../../constants";
export const signup = async (values: ISignUp) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/register-continue`, body, config);
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
};

export const confirmAuth = async (values: I2FA) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/confirm-2fa`, body, config);
    toast.success(res.data.message);
    return true;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
    }
  }
};

export const forgetPassword = async (values: IForgotPassword) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/forgot-password`, body, config);
    toast.success(res.data.message);
    return true;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
    }
  }
};

export const resetPassword = async (values: IResetPassword) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/reset-password`, body, config);
    toast.success(res.data.message);
    return true;
  } catch (err) {
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
    }
  }
};
