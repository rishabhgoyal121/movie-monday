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



export {
  getUserDetails,
  addToFavorites,
  getFavoriteMovies,
  getFavoriteTVShows,
};
