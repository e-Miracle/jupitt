import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
export interface Link {
  path: string;
  title: string;
  icon: IconDefinition;
  subLinks?: Link[];
}

export type Res = {
  path: string;
  title: string;
  icon: IconDefinition;
};

export type changeHandler = React.ChangeEventHandler<HTMLInputElement>;
export type TableData = {
  id: number;
  [key: string]: string | number;
};

export type TableHeaders = {
  key: string;
  label: string;
};

export interface MyError {
  message: string;
}

export interface User {
  id: number;
  identifier: string;
  designation: null | string;
  country_id: number;
  reports_to: null | string;
  department_id: null | number;
  gender: string;
  name: string;
  email: string;
  email_verified_at: null | Date;
  phone: string;
  phone_verified_at: null | Date;
  status: number;
  twofa_enabled: number;
  google2fa_secret: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null | string;
}

type Admin = {
  admin: User;
};
export interface Token {
  token: string;
}

export type LoginResponse = Token & Admin;

export interface ISignUp {
  identifier: string;
  password: string;
  password_confirmation: string;
}

export interface ILogin {
  identifier: string;
  password: string;
  _2fa: string;
  password_confirmation: string;
}

export interface I2FA {
  identifier: string;
  secret: string;
}

export interface IForgotPassword {
  identifier: string;
}

export interface IResetPassword {
  password: string;
  identifier: string;
  _2fa: string;
  token: string;
}

export interface ISuccess {
  title: string;
  description: string;
  name: string;
  route: string;
}

export interface IRegisterUser {
  name: string;
  email: string;
  phone: string;
  role: string;
  gender: string;
  reports_to: string;
  department: string;
  permissions: string[];
}

export interface IGet {
  page?: string;
  per_page?: string;
  search_str?: string;
  from_date?: string;
  to_date?: string;
}

export interface IKyc {
  id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  level_one: {
    id: number;
    kyc_id: number;
    country_id: number;
    document_type: string;
    status: string;
    created_at: string;
    updated_at: string;
    full_name: null;
    id_number: null;
    response_data: null;
  };
  level_two: null | string;
  level_three: null | string;
}

export interface ICountry {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  created_at: string;
  updated_at: string;
  flag_url: string;
}

export interface NormalUser {
  identifier: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  country_id: number;
  email_verified_at: null | string;
  phone_verified_at: null | string;
  suspension_count: string;
  is_suspended: boolean;
  is_blacklisted: boolean;
  must_reset_password: boolean;
  deleted_at: null | string;
  remember_token: null | string;
  created_at: string;
  updated_at: Date;
  twofa_enabled: number;
  purple_pay_card_status: number;
  purple_pay_card_colour: null | string;
  phone_number: string;
  full_name: string;
  has_set_pass_code: boolean;
  has_set_transaction_pin: boolean;
  kyc_level: number;
  kyc_level_one_status: boolean;
  kyc_level_two_status: null | string;
  kyc_level_three_status: null | string;
  has_virtual_card: boolean;
  total_referred: number;
  total_qualified_referred: number;
  country: ICountry;
  kyc: IKyc;
}

export interface Icrypto {
  amount: string;
  asset: string;
  identifier: string;
}

export interface IFiat {
  amount: string;
  country_id: number;
  identifier: string;
}

export interface INormalUserTransactions {
  id: string;
  reference: string;
  user_id: string;
  asset: string;
  date: string;
  activity: string;
  from: null | string;
  to: null | string;
  amount: string;
  market_price: string;
  usd_value: string;
  rate: string;
  fiat_value: string;
  fiat_currency: string;
  status: number;
  transaction_type: string;
  bank: string;
  account_name: string;
  account_number: string;
}

export interface RefferalLog {
  id: number;
  referrer: number;
  referred: number;
  claimed: number;
  status: number;
  created_at: null | string;
  updated_at: null | string;
  referred_user: NormalUser;
  user: NormalUser;
}

export interface RefferalCount {
  referrer: number;
  count: number;
  user: NormalUser;
}

export interface IReferralSettings {
  type: string;
  amount: number;
  bonus_asset: string;
  min_transaction_limit: number;
}

export interface IReferralSettingMain {
  type: string;
  amount: number;
  bonus_asset: string;
  min_transaction_limit: number;
}

export type ICountries = {
  country: string;
};

// export type INewCountries = {
//   country: string;
//   id: number;
// };

export type INewCountries = {
  country: string;
  id: number;
};

export type IFormLayout = {
  country: string;
  coinName: string;
};

export type INewFormLayout = {
  coinName: string;
  id: number;
};

export type IForm = {
  type: "buy" | "sell";
  country: string;
  coinName: string;
  className?: string;
};

export type INewForm = {
  type: "buy" | "sell";
  coinName: string;
  className?: string;
  id: number;
};

export type ICryptoAum = {
  ETH: number;
  BTC: number;
  USDT: number;
};

export type IFiatAum = {
  id: number;
  currency_name: string;
  balance: string;
};

export type IAML = {
  withdrawal_limit: number;
  country_id: number;
  level: number;
};

export type IVCAML = {
  withdrawal_limit: number;
  country_id: number;
  level: number;
  deposit_limit: number;
};

type IAuthorizer = {
  id: number;
  identifier: string;
  designation: null | string;
  country_id: number;
  reports_to: null | string;
  department_id: null | string;
  gender: string;
  name: string;
  email: string;
  email_verified_at: null | string;
  phone: string;
  phone_verified_at: null | string;
  status: number;
  twofa_enabled: boolean;
  google2fa_secret: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
};

export type ICryptoRateLog = {
  id: number;
  activity: string;
  asset: string;
  fiat_currency: string;
  rate: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  authorizer: IAuthorizer;
};

export type ISwapRateLog = {
  id: number;
  activity: string;
  rate: string;
  rate_currency: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  authorizer: IAuthorizer;
};

export type IPmRateLog = {
  id: number;
  activity: string;
  rate: string;
  rate_currency: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  authorizer: IAuthorizer;
};

export type IVCRateLog = {
  id: number;
  activity: string;
  rate: string;
  rate_currency: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  authorizer: IAuthorizer;
};

export type ISwapRate = {
  country_id: number;
  rate: number;
};


export type IAllCountry = {
  id: number;
  name: string;
  iso3: string;
  iso2: string;
  numeric_code: string;
  phone_code: string;
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  tld: string;
  native: string;
  region: string;
  subregion: string;
  created_at: string;
  updated_at: string;
  flag_url: null | string;
};

export type ICryptoRate = {
  country_id: number;
  asset: string;
  buy?: number;
  sell?: number;
};

export type IPmRate = {
  country_id: number;
  buy?: number;
  sell?: number;
};

export type IVcRate = {
  country_id: number;
  fund?: number;
  withdraw?: number;
  spend?: number;
};
