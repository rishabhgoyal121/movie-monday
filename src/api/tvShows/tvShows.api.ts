import { instance } from "@/services/axiosInstance";
import type { TVShow } from "@/interfaces/tvShows";
import axios from "axios";

interface TVShowApiResponse {
  results: TVShow[]; // The API returns a results array
  page: number;
  total_pages: number;
  total_results: number;
}

interface FetchTVShowsResponse {
  data?: TVShowApiResponse;
  error?: boolean;
  message?: string;
}

const fetchTVShows = async (tvShowListType: string = 'upcoming', pageNumber:number=1): Promise<FetchTVShowsResponse> => {
  try {
    const response = await instance.get<TVShowApiResponse>(
      `/tv/${tvShowListType}?language=en-US&page=${pageNumber}`
    );
    return { data: response.data }; // Ensure it matches the `FetchTVShowsResponse` structure
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err) ? err.message : "Error in fetching TV Shows",
    };
  }
};

export { fetchTVShows };
