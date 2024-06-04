import { IsNull, MoreThan, Repository } from "typeorm";
import { Artist } from "../database/entities/artists";

export class ArtistRepository {
  repository: Repository<Artist>;

  constructor(repository: Repository<Artist>) {
    this.repository = repository;
  }

  async create(artist: Artist) {
    const artistExists = await this.findById(artist.id);

    if (artistExists) return artistExists;

    const create = this.repository.create(artist);
    return this.repository.save(create);
  }

  async findByName(name: string) {
    return this.repository.findOne({ where: { name } });
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async getArtistsByDegree(degree: number, limit: number | undefined = undefined) {
    const where = {
      degree: degree,
      mined_at: IsNull(),
      followers: MoreThan(1000),
      popularity: MoreThan(30)
    };

    return this.repository.find({ where, take: limit, order: { followers: "DESC" }});
  }

  async setArtistMinedAt(id: string) {
    return this.repository.update(id, { mined_at: new Date() });
  }

  async getTargetArtist() {
    return this.repository.findOne({ where: { degree: 0 } });
  }
}
