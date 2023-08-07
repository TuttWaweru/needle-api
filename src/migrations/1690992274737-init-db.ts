import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDb1690992274737 implements MigrationInterface {
    name = 'InitDb1690992274737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`tbl_media\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`type\` varchar(255) NOT NULL, UNIQUE INDEX \`type-idx\` (\`type\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`product_name\` varchar(255) NOT NULL, \`price\` varchar(255) NOT NULL, \`description\` text NULL, \`details\` json NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`first_name\` varchar(255) NULL, \`middle_name\` varchar(255) NULL, \`last_name\` varchar(255) NULL, \`username\` varchar(255) NULL, \`email_address\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`password\` varchar(255) NOT NULL, \`active\` int NOT NULL DEFAULT 1, \`is_phone_verified\` tinyint NOT NULL DEFAULT 0, \`is_email_verified\` tinyint NOT NULL DEFAULT 0, \`credits\` varchar(255) NULL, \`city\` varchar(255) NULL, \`is_verified\` tinyint NOT NULL DEFAULT false, \`details\` json NULL, UNIQUE INDEX \`email-idx\` (\`email_address\`), UNIQUE INDEX \`phone-idx\` (\`phone_number\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_media_items\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`path\` varchar(255) NOT NULL, \`extension\` varchar(255) NOT NULL, \`encoding\` varchar(255) NOT NULL, \`size\` varchar(255) NOT NULL, \`media_id\` int NULL, \`user_id\` int NULL, \`product_id\` int NULL, UNIQUE INDEX \`mediaitem-idx\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_recommendations\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`user\` varchar(255) NOT NULL, \`title\` varchar(255) NOT NULL, \`recommendation\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tbl_rooms\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`users\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`messages\` text NOT NULL, UNIQUE INDEX \`IDX_2e633386282e88b83eeff39fa9\` (\`users\`), UNIQUE INDEX \`IDX_84a20a2c71d37418e2f962475b\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`tbl_products\` ADD CONSTRAINT \`FK_fccb15adbed2878e9642ba49e3d\` FOREIGN KEY (\`user_id\`) REFERENCES \`tbl_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_media_items\` ADD CONSTRAINT \`FK_577aa4fefd5cece99bd5eaa5039\` FOREIGN KEY (\`media_id\`) REFERENCES \`tbl_media\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_media_items\` ADD CONSTRAINT \`FK_8643863a8403af525099d3ac702\` FOREIGN KEY (\`user_id\`) REFERENCES \`tbl_users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`tbl_media_items\` ADD CONSTRAINT \`FK_618cff69ed37d3140de716c536b\` FOREIGN KEY (\`product_id\`) REFERENCES \`tbl_products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`tbl_media_items\` DROP FOREIGN KEY \`FK_618cff69ed37d3140de716c536b\``);
        await queryRunner.query(`ALTER TABLE \`tbl_media_items\` DROP FOREIGN KEY \`FK_8643863a8403af525099d3ac702\``);
        await queryRunner.query(`ALTER TABLE \`tbl_media_items\` DROP FOREIGN KEY \`FK_577aa4fefd5cece99bd5eaa5039\``);
        await queryRunner.query(`ALTER TABLE \`tbl_products\` DROP FOREIGN KEY \`FK_fccb15adbed2878e9642ba49e3d\``);
        await queryRunner.query(`DROP INDEX \`IDX_84a20a2c71d37418e2f962475b\` ON \`tbl_rooms\``);
        await queryRunner.query(`DROP INDEX \`IDX_2e633386282e88b83eeff39fa9\` ON \`tbl_rooms\``);
        await queryRunner.query(`DROP TABLE \`tbl_rooms\``);
        await queryRunner.query(`DROP TABLE \`tbl_recommendations\``);
        await queryRunner.query(`DROP INDEX \`mediaitem-idx\` ON \`tbl_media_items\``);
        await queryRunner.query(`DROP TABLE \`tbl_media_items\``);
        await queryRunner.query(`DROP INDEX \`phone-idx\` ON \`tbl_users\``);
        await queryRunner.query(`DROP INDEX \`email-idx\` ON \`tbl_users\``);
        await queryRunner.query(`DROP TABLE \`tbl_users\``);
        await queryRunner.query(`DROP TABLE \`tbl_products\``);
        await queryRunner.query(`DROP INDEX \`type-idx\` ON \`tbl_media\``);
        await queryRunner.query(`DROP TABLE \`tbl_media\``);
    }

}
