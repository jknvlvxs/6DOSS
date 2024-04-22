import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("tracks")
export class Track {
  @PrimaryGeneratedColumn()
  id: number;

  // name: string;
  @Column({ type: "text" })
  name: string;

  // album: Album;
  // artists: Artist[];
  // disc_number: number;
  // duration_ms: number;
  // explicit: boolean;
  // external_ids: ExternalIds;
  // external_urls: ExternalUrls;
  // href: string;
  // id: string;
  // is_local: boolean;
  // is_playable: boolean;
  // popularity: number;
  // preview_url: string;
  // track_number: number;
  // type: string;
  // uri: string;
}
