import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1710269289908 implements MigrationInterface {
    name = ' $npmConfigName1710269289908'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "User" ("userId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "roleId" integer, CONSTRAINT "PK_45f0625bd8172eb9c821c948a0f" PRIMARY KEY ("userId"))`);
        await queryRunner.query(`CREATE TABLE "Role" ("id" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "roleName" character varying(16) NOT NULL, CONSTRAINT "PK_9309532197a7397548e341e5536" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Product" ("productId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "price" integer NOT NULL, "stockQuantity" integer NOT NULL, CONSTRAINT "PK_997722a72629b31636aadbdd789" PRIMARY KEY ("productId"))`);
        await queryRunner.query(`CREATE TABLE "Discount" ("discountId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "discountPercentage" integer NOT NULL, CONSTRAINT "PK_f964915ecf742be7f1106510979" PRIMARY KEY ("discountId"))`);
        await queryRunner.query(`CREATE TABLE "OrderItem" ("orderItemId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "quantity" integer NOT NULL, "unitPrice" integer NOT NULL, "TotalPrice" integer NOT NULL, "discount" integer NOT NULL, "orderOrderId" integer, CONSTRAINT "PK_86caad87998e302333f01b8e618" PRIMARY KEY ("orderItemId"))`);
        await queryRunner.query(`CREATE TABLE "Order" ("orderId" integer GENERATED ALWAYS AS IDENTITY NOT NULL, "TotalPrice" TIMESTAMP NOT NULL, "discount" integer NOT NULL, CONSTRAINT "PK_79772f727dd72ada229f6f8f286" PRIMARY KEY ("orderId"))`);
        await queryRunner.query(`ALTER TABLE "User" ADD CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "OrderItem" ADD CONSTRAINT "FK_37602152b9a31f552021d158de3" FOREIGN KEY ("orderOrderId") REFERENCES "Order"("orderId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "OrderItem" DROP CONSTRAINT "FK_37602152b9a31f552021d158de3"`);
        await queryRunner.query(`ALTER TABLE "User" DROP CONSTRAINT "FK_0b8c60cc29663fa5b9fb108edd7"`);
        await queryRunner.query(`DROP TABLE "Order"`);
        await queryRunner.query(`DROP TABLE "OrderItem"`);
        await queryRunner.query(`DROP TABLE "Discount"`);
        await queryRunner.query(`DROP TABLE "Product"`);
        await queryRunner.query(`DROP TABLE "Role"`);
        await queryRunner.query(`DROP TABLE "User"`);
    }

}
