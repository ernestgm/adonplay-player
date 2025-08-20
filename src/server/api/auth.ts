import Cookies from "js-cookie";
import {apiPost} from "@/server/api/apiClient";

export const getLoginCode = async (deviceId: string | undefined | null, code: string | undefined) => {
    try {
        const getAuthHeaders = () => {
            const token = Cookies.get("device_token");
            return token ? { Authorization: `Bearer ${token}` } : {};
        };

        return await apiPost(
            `${process.env.NEXT_PUBLIC_API_URL}/create_login_code`,
            {'device_id': deviceId, 'code': code},
            getAuthHeaders(),
            true
        );

    } catch (error: any) {
        throw {
            status: error.response?.status || 500,
            data: error.response?.data || "Failed to sign in.",
        };
    }
}
export const signIn = async (code: string, device_id: string, user_id: string) => {
    try {
        return await apiPost(
            `${process.env.NEXT_PUBLIC_API_URL}/login_device`,
            {code: code, device_id: device_id, user_id: user_id },
            {},
            true
        );
    } catch (error: any) {
        throw {
            status: error.response?.status || 500,
            data: error.response?.data || "Failed to sign in.",
        };
    }
};

export const setUserCookies = (token: string, userData: string) => {
    Cookies.set("auth_token", token, { path: "/" });
    Cookies.set("user", userData, { path: "/" });
}
export const signOut = () => {
    Cookies.remove("auth_token");
    Cookies.remove("user");
};

export const getDataUserAuth = () => {
    const userAuth = typeof window !== "undefined" ? Cookies.get("user") : null;
    return userAuth ? JSON.parse(userAuth) : null;
};

export const getDeviceID = (): string | undefined | null => {
    return typeof window !== "undefined" ? Cookies.get("device_id") : null;
};
