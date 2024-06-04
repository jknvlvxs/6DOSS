import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1715570284061 implements MigrationInterface {
    name = 'Default1715570284061'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artists" ALTER COLUMN "mined_at" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "artists" ALTER COLUMN "mined_at" SET NOT NULL`);
    }

}
