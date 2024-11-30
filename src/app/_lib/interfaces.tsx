import { StdioNull } from "child_process";

export interface BaseEntry {
  type: string;
  [key: string]: any;
}

export interface IProfile {
  user: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  interests: string[];
  [key: string]: any;
}

export interface IUser {
  email: string;
  role: string;
  profile: IProfile | null;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginInitiate {
  email: string;
  [key: string]: any;
}
export interface IVerifyLogin {
  email: string;
  process: "login";
  otp: string;
}

export interface ProfileExtras {
  countries: string[];
  cities: string[];
  genders: string[];
  interests: string[];
}
export type loginStep =
  | "logininitiate"
  | "verify"
  | "initialProfile"
  | "resendOtp";

export interface IChangePasswordProps {
  token: string;
}

export interface IRegisterUser {
  fullName: string;
  email: string;
  password: string;
  role: "guest" | "owner" | "customer";
}

export interface IPlaceType {
  _id: string;
  name: string;
  icon: StdioNull;
}

export interface LocationDetails {
  countryCode?: string;
  country?: string;
  city?: string;
  postalCode?: string;
  address?: string;
}

