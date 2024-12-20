"use server";

import { IRegisterUser } from "@/app/_lib/interfaces";
import { PlayNowApi } from "@/utils/playnow/api";
import { cookies } from "next/headers";

export const registerUserRequest = async (body: IRegisterUser) => {
  const api = new PlayNowApi();
  const response = await api.registerUser(body);
  
  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  cookies().set({
    name: "VERIFY_ACCOUNT",
    value: response.data.email,
    path: "/",
    maxAge: 5 * 60,
    httpOnly: true,
  });
  return { status: 200, message: "success", data: response.data };
};
