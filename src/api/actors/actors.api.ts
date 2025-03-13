import { instance } from "@/services/axiosInstance";
import type { Actor } from "@/interfaces/actors";
import axios from "axios";

interface ActorApiResponse {
  results: Actor[];
  page: number;
  total_pages: number;
  total_results: number;
}

interface FetchActorsResponse {
  data?: ActorApiResponse;
  error?: boolean;
  message?: string;
}

const fetchActors = async (pageNumber:number=1): Promise<FetchActorsResponse> => {
  try {
    const response = await instance.get<ActorApiResponse>(
      `/person/popular?language=en-US&page=${pageNumber}`
    );
    return { data: response.data };
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err) ? err.message : "Error in fetching actors list",
    };
  }
};

export { fetchActors };
