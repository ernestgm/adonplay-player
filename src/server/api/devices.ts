import {apiDelete, apiGet, apiPost, apiPut} from "@/server/api/apiClient";

export const getDevice = async (deviceId) => {
  try {
    return await apiGet(`${process.env.NEXT_PUBLIC_API_URL}/show_by_device_id/${deviceId}`);
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      data: error.response?.data || "Failed to get Device",
    };
  }
};
export const fetchDevices = async () => {
  try {
    return await apiGet(`${process.env.NEXT_PUBLIC_API_URL}/devices`);
  } catch (error) {
    throw {
      status: error.response?.status || 500,
      data: error.response?.data || "Failed to sign out.",
    };
  }
};
