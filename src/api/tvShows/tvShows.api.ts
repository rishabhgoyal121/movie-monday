import { instance } from "@/services/axiosInstance";
import type { TVShow, TVShowDetails, TVShowCredit } from "@/interfaces/tvShows";
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

interface FetchTVShowDetailsResponse {
  data?: TVShowDetails;
  error?: boolean;
  message?: string;
}

const fetchTVShowDetails = async (
  tvShowId: string = "1396"
): Promise<FetchTVShowDetailsResponse> => {
  try {
    const response = await instance.get<TVShowDetails>(
      `/tv/${tvShowId}?language=en-US`
    );
    return { data: response.data };
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err)
        ? err.message
        : "Error in fetching TV Show details",
    };
  }
};

interface TVShowCreditsApiResponse {
  cast: TVShowCredit[]; // The API returns a results array
  page: number;
  total_pages: number;
  total_results: number;
}

interface FetchTVShowCreditsResponse {
  data?: TVShowCreditsApiResponse;
  error?: boolean;
  message?: string;
}

const fetchTVShowCredits = async (
  tvShowId: string = "278"
): Promise<FetchTVShowCreditsResponse> => {
  try {
    const response = await instance.get<TVShowCreditsApiResponse>(
      `tv/${tvShowId}/credits?language=en-US`
    );
    return { data: response.data };
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err)
        ? err.message
        : "Error in fetching TV Show credits",
    };
  }
};

export { fetchTVShows, fetchTVShowDetails, fetchTVShowCredits };
