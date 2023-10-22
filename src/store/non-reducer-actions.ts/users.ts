import axios from "axios";
import toast from "react-hot-toast";
import { Icrypto, IFiat } from "../../utils";
import { baseUrl } from "../../constants";

export const creditCrypto = async (values: Icrypto) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/user/credit-crypto`, body, config);
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

export const debitCrypto = async (values: Icrypto) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/user/debit-crypto`, body, config);
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

export const creditFiat = async (values: IFiat) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/user/credit-fiat`, body, config);
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

export const debitFiat = async (values: IFiat) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify(values);
  try {
    const res = await axios.post(`${baseUrl}/user/debit-fiat`, body, config);
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

export const disable2Fa = async (identifier: string, cb: () => void) => {
  const config = {
    headers: { "Content-Type": "application/json" },
  };
  const body = JSON.stringify({ identifier });
  try {
    const res = await axios.post(
      `${baseUrl}/user/diable-user-2fa`,
      body,
      config
    );
    toast.success(res.data.message);
    cb();
    return res.data.data;
  } catch (err) {
    cb();
    if (err instanceof Error) {
      toast.error(err.message);
    } else if (axios.isAxiosError(err) && err.response?.data?.message) {
      err.response.data.message.map((err: string) => toast.error(err));
    }
  }
};
