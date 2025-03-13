import { instance } from "@/services/axiosInstance";
import type { Movie, MovieDetails, MovieCredit } from "@/interfaces/movies";
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

const fetchMovies = async (movieListType: string = 'upcoming', pageNumber:number=1): Promise<FetchMoviesResponse> => {
  try {
    const response = await instance.get<MovieApiResponse>(
      `/movie/${movieListType}?language=en-US&page=${pageNumber}`
    );
    return { data: response.data }; // Ensure it matches the `FetchMoviesResponse` structure
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err) ? err.message : "Something went wrong",
    };
  }
};

interface FetchMovieDetailsResponse {
  data?: MovieDetails;
  error?: boolean;
  message?: string;
}

const fetchMovieDetails = async (
  movieId: string = '278',
): Promise<FetchMovieDetailsResponse> => {
  try {
    const response = await instance.get<MovieDetails>(
      `/movie/${movieId}?language=en-US`
    );
    return { data: response.data }; 
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err) ? err.message : "Error in fetching movie details",
    };
  }
};

interface MovieCreditsApiResponse {
  results: MovieCredit[]; // The API returns a results array
  page: number;
  total_pages: number;
  total_results: number;
}

interface FetchMovieCreditsResponse {
  data?: MovieCreditsApiResponse;
  error?: boolean;
  message?: string;
}

const fetchMovieCredits = async (
  movieId: string = "278"
): Promise<FetchMovieCreditsResponse> => {
  try {
    const response = await instance.get<MovieCreditsApiResponse>(
      `movie/${movieId}/credits?language=en-US`
    );
    return { data: response.data };
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err) ? err.message : "Error in fetching movie credits",
    };
  }
};

export { fetchMovies, fetchMovieDetails, fetchMovieCredits };
