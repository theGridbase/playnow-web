"use server";

import { ILoginInitiate, IProfile, IVerifyLogin } from "@/app/_lib/interfaces";
import { PlayNowApi } from "@/utils/playnow/api";

type NewProfileBody = Omit<IProfile, "user">;

export const initiateLogin = async (body: ILoginInitiate) => {
  const api = new PlayNowApi();

  const response = await api.userLogin("logininitiate", body);
  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  return { status: 200, message: "success", data: response.data };
};

export const verifyLogin = async (body: IVerifyLogin) => {
  const api = new PlayNowApi();

  const response = await api.userLogin("verify", body);
  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  return { status: 200, message: "success", data: response.data };
};

export const resendOtp = async (body: any) => {
  const api = new PlayNowApi();

  const response = await api.userLogin("resendOtp", body);

  return { status: 200, message: "success", data: null };
};

export const createInitialProfile = async (body: any) => {
  const api = new PlayNowApi();
  const response = await api.userLogin("initialProfile", body);

  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  return { status: 200, message: "success", data: response.data };
};

export const getProfileExtras = async () => {
  const api = new PlayNowApi();
  const response = await api.getProfileExtras();
  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  const allCountries = Object.keys(response.data.countries);
  const allCities = allCountries.map((country: string) => {
    let cities = response.data.countries[country];
    return cities;
  });
  const allGenders = Object.values(response.data.genders);
  const allInterests = Object.values(response.data.interests);
  console.log({
    countries: allCountries,
    cities: allCities.flat(1),
    genders: allGenders,
    interests: allInterests,
  });

  return {
    status: 200,
    message: "success",
    data: {
      countries: allCountries as string[],
      cities: allCities.flat(1) as string[],
      genders: allGenders as string[],
      interests: allInterests as string[],
    },
  };
};
