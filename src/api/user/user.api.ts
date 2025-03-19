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

interface addToFavoritesProps {
  media_type?: string;
  media_id: number;
  favorite?: boolean;
}

async function addToFavorites({
  media_id,
  media_type = "movie",
  favorite = true,
}: addToFavoritesProps) {
  try {
    const body = {
      media_type: media_type,
      media_id: media_id,
      favorite: favorite,
    };
    const response = await instance.post("/account/21865023/favorite", body);
    return { data: response.data };
  } catch (error) {
    return {
      error: true,
      message: axios.isAxiosError(error)
        ? error.message
        : "Error in adding media to favorites",
    };
  }
}

async function getFavoriteMovies() {
  try {
    const response = await instance.get(
      "/account/21865023/favorite/movies?language=en-US&page=1&sort_by=created_at.asc"
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: true,
      message: axios.isAxiosError(error)
        ? error.message
        : "Error in getting favorite movies.",
    };
  }
}

async function getFavoriteTVShows() {
  try {
    const response = await instance.get(
      "/account/21865023/favorite/tv?language=en-US&page=1&sort_by=created_at.asc"
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: true,
      message: axios.isAxiosError(error)
        ? error.message
        : "Error in getting favorite TV Shows.",
    };
  }
}

interface addToWatchlistProps {
  media_type?: string;
  media_id: number;
  watchlist?: boolean;
}

async function addToWatchlist({
  media_id,
  media_type = "movie",
  watchlist = true,
}: addToWatchlistProps) {
  try {
    const body = {
      media_type: media_type,
      media_id: media_id,
      watchlist: watchlist,
    };
    const response = await instance.post("/account/21865023/watchlist", body);
    return { data: response.data };
  } catch (error) {
    return {
      error: true,
      message: axios.isAxiosError(error)
        ? error.message
        : "Error in adding media to watchlist",
    };
  }
}

async function getWatchlistMovies() {
  try {
    const response = await instance.get(
      "/account/21865023/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc"
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: true,
      message: axios.isAxiosError(error)
        ? error.message
        : "Error in getting watchlist movies.",
    };
  }
}

async function getWatchlistTVShows() {
  try {
    const response = await instance.get(
      "/account/21865023/watchlist/tv?language=en-US&page=1&sort_by=created_at.asc"
    );
    return { data: response.data };
  } catch (error) {
    return {
      error: true,
      message: axios.isAxiosError(error)
        ? error.message
        : "Error in getting watchlist TV Shows.",
    };
  }
}



export {
  getUserDetails,
  addToFavorites,
  getFavoriteMovies,
  getFavoriteTVShows,
  addToWatchlist,
  getWatchlistMovies,
  getWatchlistTVShows,
};
