import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1587337202617 implements MigrationInterface {
    name = 'initialMigration1587337202617'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" BIGSERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d90243459a697eadb8ad56e909" ON "tags" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "products" ("id" BIGSERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "name" character varying NOT NULL, "description" text, "price" numeric NOT NULL DEFAULT 0, "image_url" character varying, "categoryId" bigint, "tag_id" bigint, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_4c9fb58de893725258746385e1" ON "products" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "categories" ("id" BIGSERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "name" character varying NOT NULL, "description" text, "image_name" character varying, CONSTRAINT "UQ_8b0be371d28245da6e4f4b61878" UNIQUE ("name"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_8b0be371d28245da6e4f4b6187" ON "categories" ("name") `, undefined);
        await queryRunner.query(`CREATE TABLE "encrypted_code" ("id" BIGSERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "code" character varying DEFAULT null, "purpose" integer DEFAULT null, "expiry" character varying NOT NULL, "is_used" boolean NOT NULL DEFAULT false, "user_id" bigint, CONSTRAINT "REL_8f716cd2f3abe7daf468ddbfa4" UNIQUE ("user_id"), CONSTRAINT "PK_8783cf14c3e045c27f75007a1f5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT false, "phone_number" character varying NOT NULL, "is_email_confirmed" boolean NOT NULL DEFAULT false, "is_phone_number_confirmed" boolean NOT NULL DEFAULT false, "user_type" integer NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "customer" ("id" BIGSERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "firstname" character varying NOT NULL, "lastname" character varying NOT NULL, "user_id" bigint, CONSTRAINT "REL_5d1f609371a285123294fddcf3" UNIQUE ("user_id"), CONSTRAINT "PK_a7a13f4cacb744524e44dfdad32" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "inventory_history" ("id" BIGSERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "initial_quantity" integer NOT NULL, "initial_price" numeric NOT NULL DEFAULT 0, "current_quantity" integer NOT NULL, "current_price" numeric NOT NULL DEFAULT 0, "product_id" bigint, CONSTRAINT "REL_c50f0addadd8efd1e5f9536c94" UNIQUE ("product_id"), CONSTRAINT "PK_1024f12ca5be1b97424c1c4b48f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "inventory" ("id" BIGSERIAL NOT NULL, "date_created" TIMESTAMP NOT NULL DEFAULT now(), "date_updated" TIMESTAMP NOT NULL DEFAULT now(), "row_version" integer NOT NULL, "initial_quantity" integer NOT NULL, "initial_price" numeric NOT NULL DEFAULT 0, "current_quantity" integer NOT NULL, "current_price" numeric NOT NULL DEFAULT 0, "product_id" bigint, CONSTRAINT "REL_732fdb1f76432d65d2c136340d" UNIQUE ("product_id"), CONSTRAINT "PK_82aa5da437c5bbfb80703b08309" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_69a5bf1bf1a8530a65c99c926ac" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "encrypted_code" ADD CONSTRAINT "FK_8f716cd2f3abe7daf468ddbfa42" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" ADD CONSTRAINT "FK_5d1f609371a285123294fddcf3a" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "inventory_history" ADD CONSTRAINT "FK_c50f0addadd8efd1e5f9536c941" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "inventory" ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "inventory" DROP CONSTRAINT "FK_732fdb1f76432d65d2c136340dc"`, undefined);
        await queryRunner.query(`ALTER TABLE "inventory_history" DROP CONSTRAINT "FK_c50f0addadd8efd1e5f9536c941"`, undefined);
        await queryRunner.query(`ALTER TABLE "customer" DROP CONSTRAINT "FK_5d1f609371a285123294fddcf3a"`, undefined);
        await queryRunner.query(`ALTER TABLE "encrypted_code" DROP CONSTRAINT "FK_8f716cd2f3abe7daf468ddbfa42"`, undefined);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_69a5bf1bf1a8530a65c99c926ac"`, undefined);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`, undefined);
        await queryRunner.query(`DROP TABLE "inventory"`, undefined);
        await queryRunner.query(`DROP TABLE "inventory_history"`, undefined);
        await queryRunner.query(`DROP TABLE "customer"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "encrypted_code"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_8b0be371d28245da6e4f4b6187"`, undefined);
        await queryRunner.query(`DROP TABLE "categories"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_4c9fb58de893725258746385e1"`, undefined);
        await queryRunner.query(`DROP TABLE "products"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d90243459a697eadb8ad56e909"`, undefined);
        await queryRunner.query(`DROP TABLE "tags"`, undefined);
    }

}
