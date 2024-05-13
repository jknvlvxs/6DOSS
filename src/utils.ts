import { Artist } from "./database/entities/artists";
import { Track } from "./database/entities/tracks";

export const printTrack = (track: Track) => {
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