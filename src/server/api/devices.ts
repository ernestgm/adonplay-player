import {apiGet} from "@/server/api/apiClient";

export const getDevice = async (deviceId: any) => {
  try {
    return await apiGet(`${process.env.NEXT_PUBLIC_PLAYER_API_URL}/show_by_device_id/${deviceId}`);
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      data: error.response?.data || "Failed to get Device",
    };
  }
};
export const fetchDevices = async () => {
  try {
    return await apiGet(`${process.env.NEXT_PUBLIC_PLAYER_API_URL}/devices`);
  } catch (error: any) {
    throw {
      status: error.response?.status || 500,
      data: error.response?.data || "Failed to sign out.",
    };
  }
};
