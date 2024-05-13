import { Column, Entity, ManyToMany, PrimaryColumn } from "typeorm";
import { Artist } from "./artists";

@Entity("tracks")
export class Track {
  // id: string;
  @PrimaryColumn({ type: "text", unique: true })
  id: string;

  // name: string;
  @Column({ type: "text" })
  name: string;

  // artists: Artist[];
  @ManyToMany(() => Artist, (artist) => artist.tracks)
  artists: Artist[];

  // popularity: number;
  @Column({ type: "int" })
  popularity: number;

  // href: string;
  @Column({ type: "text" })
  href: string;
}
