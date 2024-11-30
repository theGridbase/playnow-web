"use server";

import { PlayNowApi } from "@/utils/playnow/api";

export const forgetPasswordRequest = async (email: string) => {
  const api = new PlayNowApi();

  const response = await api.forgetPassword(email);
  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  return { status: 200, message: "success", data: null };
};
