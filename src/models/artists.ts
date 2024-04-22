export interface Artist {
  name: string;
  id: string;
  genres: string[];
  popularity: number;
  followers: { total: number };
  // Define properties of Artist here
}
