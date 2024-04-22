import dotenv from "dotenv";
import { Track } from "./models/tracks";
import {
  getAccessToken,
  getArtist,
  getArtistTopTracks,
  getTargetArtistId,
} from "./spotify";
import { printTrack } from "./utils";
import { Database } from "./database/database";
dotenv.config();

const main = async () => {
  const token = await getAccessToken();
  const artistId = await getTargetArtistId("kendrick lamar", token);

  if (!artistId) return console.error("Artist not found");

  const artist = await getArtist(artistId, token);
  console.log({
    id: artist!.id,
    name: artist!.name,
    genres: artist!.genres,
    followers: artist!.followers.total,
    popularity: artist!.popularity,
    degree: 3,
  });

  const topTracks = await getArtistTopTracks(artistId, token);

  const trackWithFeats = topTracks.filter(
    (track: Track) => track.artists.length > 1
  );

  console.table(trackWithFeats.map(printTrack));

  const database = new Database();
  await database.connect();
  const client = await database.getClient();

  const kendrickData = {
    id: "2YZyLoL8N0Wb9xBt1NhZWg",
    name: "Kendrick Lamar",
    genres: ["conscious hip hop", "hip hop", "rap", "west coast rap"],
    followers: 27483444,
    popularity: 90,
    degree: 3,
  };

  // SQL query to insert Kendrick Lamar into the Artist table
  const query = `
    INSERT INTO Artist (id, name, genres, followers, popularity, degree)
    VALUES ($1, $2, $3, $4, $5, $6);
`;

  // Execute the query
  const result = await client.query(query, [kendrickData]);
  console.log("Kendrick Lamar inserted successfully!");
};

main();
