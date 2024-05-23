import { Role } from "../../src/enums/role.enum";
import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeRoleToInt1715708678952 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn('user', 'role', new TableColumn({
            name: 'role',
            type: 'enum',
            enum: [Role.ASSOCIATE, Role.ADMIN],
            default: `'${Role.ASSOCIATE}'`,
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
          await queryRunner.changeColumn('user', 'role', new TableColumn({
            name: 'role',
            type: 'int',
            default: 1,
        }));
    }

}
