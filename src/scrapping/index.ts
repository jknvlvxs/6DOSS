import dotenv from "dotenv";
import { AppDataSource } from "./database/database";
import { Artist } from "./database/entities/artists";
import { Track } from "./database/entities/tracks";
import logger from "./logs/logger";
import { ArtistRepository } from "./repositories/artists.repository";
import { TrackRepository } from "./repositories/track.repository";
import {
	getAccessToken,
	getArtistByName,
	getArtistTopTracks,
	getSeveralArtists,
	getSeveralArtistsSplit
} from "./spotify.api";

dotenv.config();

const main = async () => {
	const dataSource = await AppDataSource.initialize();
	const token = await getAccessToken();

	try {
		await dataSource.transaction(async (transactionEntityManager) => {
			const artistRepository = new ArtistRepository(transactionEntityManager.getRepository(Artist));
			const trackRepository = new TrackRepository(transactionEntityManager.getRepository(Track));

			const hasTargetArtist = await artistRepository.getTargetArtist();

			if (!hasTargetArtist || !hasTargetArtist.mined_at) {
				// Step 1: Get the Target Artist
				const targetArtist = await getArtistByName(process.env.KEY_ARTIST!, token);

				if (!targetArtist) return console.error("Artist not found");

				const artist = (await artistRepository.create({ ...targetArtist, degree: 0 }));

				// Step 2: Get the Top Tracks of the Target Artist
				const trackWithFeats = await getArtistTopTracks(artist!.id, token);

				// Step 3: Get the Features Artists
				const features = trackWithFeats.map((track: Track) => track.artists.filter((a) => a.id !== artist!.id).map((a) => a.id));
				const listFeatures = features.reduce((acc, curr) => acc.concat(curr), []);
				const uniqueFeatures = [...new Set(listFeatures)];

				const artists = await getSeveralArtists(uniqueFeatures, token);
				await Promise.all(artists.map(async (a) => artistRepository.create({ ...a, degree: 1 })));

				// Step 4: Set tracks from target artist
				await Promise.all(trackWithFeats.map(async (track: Track) => trackRepository.create(track)));
				await artistRepository.setArtistMinedAt(artist!.id);
			} else {
				console.log("Target Artist already mined, skipping...")
			}

			// Step 5: Set Loop to get the features of the features
			const degree = parseInt(process.env.DEGREE!) || 1;
			const limit = parseInt(process.env.LIMIT!) || 100;

			const newFeatures = await artistRepository.getArtistsByDegree(degree, limit);

			const nextDegrees = await Promise.all(newFeatures.map(async (artist) => {
				const tracks = await getArtistTopTracks(artist.id, token);

				const features = tracks.map((track: Track) => track.artists.filter((a) => a.id !== artist.id).map((a) => a.id));
				const listFeatures = features.reduce((acc, curr) => acc.concat(curr), []);
				const uniqueFeatures = [...new Set(listFeatures)];

				if (uniqueFeatures.length === 0) {
					await artistRepository.setArtistMinedAt(artist.id);
					return { artists: [], tracks: [] };
				}

				const artists = await getSeveralArtistsSplit(uniqueFeatures, token);

				await artistRepository.setArtistMinedAt(artist.id);

				return { artists, tracks };
			}));

			const artists = nextDegrees.map((a) => a.artists).reduce((acc, curr) => acc.concat(curr), [])
				.filter((a, index, self) => self.findIndex((t) => t.id === a.id) === index);

			const tracks = nextDegrees.map((a) => a.tracks).reduce((acc, curr) => acc.concat(curr), [])
				.filter((a, index, self) => self.findIndex((t) => t.id === a.id) === index);

			await Promise.all(artists.map(async (a) => artistRepository.create({ ...a, degree: degree + 1 })));
			await Promise.all(tracks.map(async (track: Track) => trackRepository.create(track)));

			console.log(`Finishing run with ${artists.length} artists with degree = ${degree + 1} mined`);

			const hasMoreArtists = await artistRepository.getArtistsByDegree(degree);

			if (hasMoreArtists.length > 0) {
				console.log(`Still have ${hasMoreArtists.length} artists to mine... Run "npm run dev" again!`);
			} else {
				console.log("No more artists to mine... Increase the degree on .env for the next run!");
			}
		});
	} catch (error) {
		console.error("An error occurred. Please check the log file for more details!");
		logger.error(error);
	}
};

main();
