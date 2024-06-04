import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1715570242865 implements MigrationInterface {
    name = 'Default1715570242865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artists" ADD "mined_at" TIMESTAMP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artists" DROP COLUMN "mined_at"`);
    }

}
