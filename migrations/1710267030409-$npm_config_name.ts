import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1710267030409 implements MigrationInterface {
    name = ' $npmConfigName1710267030409'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Role" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "roleName" character varying(16) NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Role"`);
    }

}
