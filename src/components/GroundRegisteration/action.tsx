"use server";
import { PlayNowApi } from "@/utils/playnow/api";

export const getAllPlacesTypes = async () => {
  const api = new PlayNowApi();
  const response = await api.getPlaceTypes();
  console.log(response);

  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  return { status: 200, message: "success", data: response.data };
};
export const getAllAmenities = async () => {
  const api = new PlayNowApi();
  const response = await api.getAmenities();
  console.log(response);

  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }

  const standOutAmenities = response.data.amenities.filter(
    (amenity: any) => amenity.standout
  );
  const userFavouritesAmenities = response.data.amenities.filter(
    (amenity: any) => amenity.favourite && !amenity.standout
  );

  return {
    status: 200,
    message: "success",
    data: { standOutAmenities, userFavouritesAmenities },
  };
};

export const createGround = async (body: any) => {
  
  const api = new PlayNowApi();
  const response = await api.createUserGround(body);
  console.log(response)
  if (response?.code && response?.code !== 200) {
    return { status: 400, message: response.message, data: null };
  }
  return { status: 201, message: "created", data: null };
};
