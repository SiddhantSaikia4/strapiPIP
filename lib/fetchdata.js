import { fetcher } from "../lib/api";

export const fetchAppointmentData = async (id) => {
  const response = await fetcher(`${process.env.NEXT_PUBLIC_STRAPI_URL}/contacts/${id}`);
  return response.data;
};
