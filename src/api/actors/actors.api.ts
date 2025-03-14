import { instance } from "@/services/axiosInstance";
import type { Actor, ActorDetails, ActorCreditMovie, ActorCreditTVShow } from "@/interfaces/actors";
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

const fetchActors = async (
  pageNumber: number = 1
): Promise<FetchActorsResponse> => {
  try {
    const response = await instance.get<ActorApiResponse>(
      `/person/popular?language=en-US&page=${pageNumber}`
    );
    return { data: response.data };
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err)
        ? err.message
        : "Error in fetching actors list",
    };
  }
};

interface FetchActorDetailsResponse {
  data?: ActorDetails;
  error?: boolean;
  message?: string;
}

const fetchActorDetails = async (
  actorId: string = "976"
): Promise<FetchActorDetailsResponse> => {
  try {
    const response = await instance.get<ActorDetails>(
      `/person/${actorId}?language=en-US`
    );
    return { data: response.data };
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err)
        ? err.message
        : "Error in fetching actor details",
    };
  }
};

interface ActorCreditMoviesApiResponse {
  cast: ActorCreditMovie[]; // The API returns a results array
  page: number;
  total_pages: number;
  total_results: number;
}

interface FetchActorCreditMoviesResponse {
  data?: ActorCreditMoviesApiResponse;
  error?: boolean;
  message?: string;
}

const fetchActorCreditMovies = async (
  actorId: string = "978"
): Promise<FetchActorCreditMoviesResponse> => {
  try {
    const response = await instance.get<ActorCreditMoviesApiResponse>(
      `person/${actorId}/movie_credits?language=en-US`
    );
    return { data: response.data };
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err)
        ? err.message
        : "Error in fetching actor credit movies",
    };
  }
};

interface ActorCreditTVShowsApiResponse {
  cast: ActorCreditTVShow[]; // The API returns a results array
  page: number;
  total_pages: number;
  total_results: number;
}

interface FetchActorCreditTVShowsResponse {
  data?: ActorCreditTVShowsApiResponse;
  error?: boolean;
  message?: string;
}

const fetchActorCreditTVShows = async (
  actorId: string = "978"
): Promise<FetchActorCreditTVShowsResponse> => {
  try {
    const response = await instance.get<ActorCreditTVShowsApiResponse>(
      `person/${actorId}/tv_credits?language=en-US`
    );
    return { data: response.data };
  } catch (err) {
    return {
      error: true,
      message: axios.isAxiosError(err)
        ? err.message
        : "Error in fetching actor credit tv shows",
    };
  }
};

export { fetchActors, fetchActorDetails, fetchActorCreditMovies, fetchActorCreditTVShows };
