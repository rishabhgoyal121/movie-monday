import { instance } from "@/services/axiosInstance";
import type { Movie } from "@/interfaces/movies";
import axios from "axios";

interface MovieApiResponse {
  results: Movie[]; // The API returns a results array
  page: number;
  total_pages: number;
  total_results: number;
}

interface FetchMoviesResponse {
  data?: MovieApiResponse;
  error?: boolean;
  message?: string;
}

const fetchMovies = async (): Promise<FetchMoviesResponse> => {
  try {
    const response = await instance.get<MovieApiResponse>(
      "/movie/upcoming?language=en-US&page=1"
    );
    return { data: response.data }; // Ensure it matches the `FetchMoviesResponse` structure
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err) ? err.message : "Something went wrong",
    };
  }
};

export { fetchMovies };
