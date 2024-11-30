"use server";

import { PlayNowApi } from "@/utils/playnow/api";

export const changePasswordRequest = async (
  token: string,
  password: string
) => {
  const api = new PlayNowApi();

  const response = await api.resetPassword(token, password);

  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  return { status: 200, message: "success", data: response.data };
};
