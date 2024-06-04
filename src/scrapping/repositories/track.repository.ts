import { Repository } from "typeorm";
import { Track } from "../database/entities/tracks";

export class TrackRepository {
  repository: Repository<Track>;

  constructor(repository: Repository<Track>) {
    this.repository = repository;
  }

  async create(track: Track) {
    const trackExists = await this.findById(track.id);
    if (trackExists) return trackExists;

    const create = this.repository.create(track);
    return this.repository.save(create);
  }

  async findByName(name: string) {
    return this.repository.findOne({ where: { name } });
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }
}
