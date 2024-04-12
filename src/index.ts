import axios from "axios";
import dotenv from "dotenv";
import { Track } from "./models/tracks";
import { Artist } from "./models/artists";
dotenv.config();

const getAccessToken = () => {
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

const getTargetArtistId = async (artistName: string, token: string) => {
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

const getArtistTopTracks = async (artistId: string, token: string) => {
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  return axios
    .get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=US`,
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

const printTrack = (track: Track) => {
  class PrintTrack {
    id: string;
    name: string;
    popularity: number;
    artists: string;

    constructor(
      id: string,
      name: string,
      popularity: number,
      artists: Artist[]
    ) {
      this.id = id;
      this.name = name;
      this.popularity = popularity;
      this.artists = artists.map((artist) => artist.name).join(", ");
    }
  }

  const trackObj = new PrintTrack(
    track.id,
    track.name,
    track.popularity,
    track.artists
  );

  return trackObj;
};

const main = async () => {
  const token = await getAccessToken();
  const artistId = await getTargetArtistId("kendrick lamar", token);

  if (!artistId) return console.error("Artist not found");

  const topTracks = await getArtistTopTracks(artistId, token);

  const trackWithFeats = topTracks.filter(
    (track: Track) => track.artists.length > 1
  );

  console.table(trackWithFeats.map(printTrack));
};

main();
