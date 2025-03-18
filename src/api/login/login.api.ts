import { instance } from "@/services/axiosInstance";
import axios from "axios";

const getRequestToken = async () => {
  try {
    const response = await instance.get("/authentication/token/new");
    return { data: response.data };
  } catch (e) {
    return {
      error: true,
      message: axios.isAxiosError(e)
        ? e.message
        : "Error in generating request token",
    };
  }
};

const getSessionId = async (requestToken: string | null | undefined) => {
  try {
    const response = await instance.post("/authentication/session/new", {
      "request_token": requestToken,
    });
    return { data: response.data };
  } catch (e) {
    return {
      error: true,
      message: axios.isAxiosError(e)
        ? e.message
        : "Error in generating Session ID",
    };
  }
};

export { getRequestToken, getSessionId };
