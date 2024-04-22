import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("artists")
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  // name: string;
  @Column({ type: "text" })
  name: string;

  // id: string;
  // genres: string[];
  // popularity: number;
  // followers: { total: number };
}
