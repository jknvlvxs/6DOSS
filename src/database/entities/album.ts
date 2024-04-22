import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("albums")
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  // name: string;
  @Column({ type: "text" })
  name: string;

  // album_type: string;
  // artists: Artist[];
  // external_urls: { [key: string]: string };
  // href: string;
  // id: string;
  // images: Image[];
  // is_playable: boolean;
  // release_date: string;
  // release_date_precision: string;
  // total_tracks: number;
  // type: string;
  // uri: string;
}
