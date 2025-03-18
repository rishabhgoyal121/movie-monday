import { instance } from "@/services/axiosInstance";
import axios from "axios";

async function getUserDetails() {
  try {
    const response = await instance.get("/account/21865023");
    return { data: response.data };
  } catch (error) {
    return {
      error: true,
      message: axios.isAxiosError(error)
        ? error.message
        : "Error in getting User details",
    };
  }
}

export { getUserDetails };
