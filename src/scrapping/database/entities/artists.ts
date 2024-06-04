import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";
import { Track } from "./tracks";

@Entity("artists")
export class Artist {
  // id: string;
  @PrimaryColumn({ type: "text", unique: true })
  id: string;

  // name: string;
  @Column({ type: "text" })
  name: string;

  // genres: string[];
  @Column("simple-array")
  genres: string[];

  // popularity: number;
  @Column({ type: "int" })
  popularity: number;

  // followers: { total: number };
  @Column({ type: "int" })
  followers: number;

  // degree: number;
  @Column({ type: "int" })
  degree: number;

  // tracks: Track[];
  @ManyToMany(() => Track, (track) => track.artists)
  @JoinTable()
  tracks: Track[];

  @Column({ type: "timestamp", nullable: true })
  mined_at: Date;
}
