import axios from "axios";
import { Artist } from "./models/artists";
import { Track } from "./models/tracks";

export const getAccessToken = () => {
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", process.env.SPOTIFY_CLIENT_ID!);
  data.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET!);

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return axios
    .post("https://accounts.spotify.com/api/token", data, { headers })
    .then((response) => response.data.access_token)
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getTargetArtistId = async (artistName: string, token: string) => {
  const query = artistName;
  const type = "artist";
  const limit = 1;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios
    .get(
      `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}`,
      { headers }
    )
    .then((response) => response.data.artists.items[0].id as string)
    .catch((error) => {
      console.error("Error:", error);
    });
};

export const getArtistTopTracks = async (artistId: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios
    .get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=BR`,
      {
        headers,
      }
    )
    .then((response) => response.data.tracks as Track[])
    .catch((error) => {
      console.error("Error:", error);
      return [];
    });
};

export const getArtist = async (artistId: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios
    .get(`https://api.spotify.com/v1/artists/${artistId}`, {
      headers,
    })
    .then((response) => response.data as Artist)
    .catch((error) => {
      console.error("Error:", error);
      return null;
    });
};
