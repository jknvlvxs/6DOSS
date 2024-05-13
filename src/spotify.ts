import axios, { AxiosError } from "axios";
import { Artist } from "./database/entities/artists";
import { Track } from "./database/entities/tracks";

export const getAccessToken = () => {
  const data = new URLSearchParams();
  data.append("grant_type", "client_credentials");
  data.append("client_id", process.env.SPOTIFY_CLIENT_ID!);
  data.append("client_secret", process.env.SPOTIFY_CLIENT_SECRET!);

  const headers = { "Content-Type": "application/x-www-form-urlencoded" };

  return axios.post("https://accounts.spotify.com/api/token", data, { headers })
    .then((response) => response.data.access_token)
    .catch(error => { throw error as AxiosError });
};

export const getTargetArtistId = (artistName: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };

  return axios.get(`https://api.spotify.com/v1/search?q=${artistName}&type=artist&limit=1`, { headers })
    .then((response) => response.data.artists.items[0].id as string)
    .catch(error => { throw error as AxiosError });
};

export const getArtistTopTracks = async (artistId: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };

  return axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=BR`, { headers })
    .then((response) =>  response.data.tracks.filter((track: any) => track.artists.length > 1) as Track[])
    .catch(error => { throw error as AxiosError });
};

export const getArtist = async (artistId: string, token: string) => {
  const headers = { Authorization: `Bearer ${token}` };

  return axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {headers })
    .then((response) => ({ ...response.data, followers: response.data.followers.total }) as Artist)
    .catch(error => { throw error as AxiosError });
};

export const getArtistByName = async (artistName: string, token: string) => {
  const artistId = await getTargetArtistId(artistName, token);
  return await getArtist(artistId, token);
};

export const getSeveralArtists = async (artistIds: string[], token: string) => {
  const headers = { Authorization: `Bearer ${token}` };

  return axios.get(`https://api.spotify.com/v1/artists?ids=${artistIds.join(",")}`, { headers })
    .then((response) => response.data.artists.map((artist: any) => ({...artist, followers: artist.followers.total })) as Artist[])
    // .filter((artist: Artist) => artist.followers > 1000) as Artist[])
    .catch(error => { throw error as AxiosError });
}

export const getSeveralArtistsSplit = async (artistIds: string[], token: string): Promise<Artist[]> => {
  const splitArtists: Artist[] = [];
  const MAX_ARTISTS_PER_REQUEST = 10;

  for (let i = 0; i < artistIds.length; i += MAX_ARTISTS_PER_REQUEST) {
      const chunk = artistIds.slice(i, i + MAX_ARTISTS_PER_REQUEST);
      const artists = await getSeveralArtists(chunk, token);
      splitArtists.push(...artists);
  }

  return splitArtists;
}