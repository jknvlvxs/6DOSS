import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1715569635351 implements MigrationInterface {
    name = 'Default1715569635351'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "artists" ("id" text NOT NULL, "name" text NOT NULL, "genres" text NOT NULL, "popularity" integer NOT NULL, "followers" integer NOT NULL, "degree" integer NOT NULL, CONSTRAINT "PK_09b823d4607d2675dc4ffa82261" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tracks" ("id" text NOT NULL, "name" text NOT NULL, "popularity" integer NOT NULL, "href" text NOT NULL, CONSTRAINT "PK_242a37ffc7870380f0e611986e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "albums" ("id" text NOT NULL, "name" text NOT NULL, "album_type" text NOT NULL, "href" text NOT NULL, "images" text NOT NULL, "release_date" text NOT NULL, "total_tracks" integer NOT NULL, "type" text NOT NULL, "uri" text NOT NULL, CONSTRAINT "PK_838ebae24d2e12082670ffc95d7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "artists_tracks_tracks" ("artistsId" text NOT NULL, "tracksId" text NOT NULL, CONSTRAINT "PK_2bdb9b61a9529320fe999d31b1d" PRIMARY KEY ("artistsId", "tracksId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7a0e7ab341335dcc9d8124c770" ON "artists_tracks_tracks" ("artistsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8a01ef5c76a92c82298f686725" ON "artists_tracks_tracks" ("tracksId") `);
        await queryRunner.query(`ALTER TABLE "artists_tracks_tracks" ADD CONSTRAINT "FK_7a0e7ab341335dcc9d8124c770c" FOREIGN KEY ("artistsId") REFERENCES "artists"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "artists_tracks_tracks" ADD CONSTRAINT "FK_8a01ef5c76a92c82298f686725f" FOREIGN KEY ("tracksId") REFERENCES "tracks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artists_tracks_tracks" DROP CONSTRAINT "FK_8a01ef5c76a92c82298f686725f"`);
        await queryRunner.query(`ALTER TABLE "artists_tracks_tracks" DROP CONSTRAINT "FK_7a0e7ab341335dcc9d8124c770c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8a01ef5c76a92c82298f686725"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7a0e7ab341335dcc9d8124c770"`);
        await queryRunner.query(`DROP TABLE "artists_tracks_tracks"`);
        await queryRunner.query(`DROP TABLE "albums"`);
        await queryRunner.query(`DROP TABLE "tracks"`);
        await queryRunner.query(`DROP TABLE "artists"`);
    }

}
