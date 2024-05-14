import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class Migrate1715644542318 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: 
            [
            {
                name: 'userId',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                unsigned: true
            }, 
            {
                name: 'name',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'email',
                isUnique: true,
                type: 'varchar',
                length: '127',
            },
            {
                name: 'password',
                type: 'varchar',
                length: '127',
            }, 
            {
                name: 'role',
                type: 'int',
                default: '1'
            }, 
            {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }, 
            {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }]
        }))

        await queryRunner.createTable(new Table({
            name: 'adress',
            columns: 
            [
            {
                name: 'adressId',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                unsigned: true
            },   
            {
                name: 'city',
                type: 'varchar',
                length: '40',
            },
            {
                name: 'state',
                type: 'varchar',
                length: '30',
            },
            {
                name: 'neighboorhood',
                type: 'varchar',
                length: '40',
            },
             {
                name: 'number',
                type: 'varchar',
                length: '5',
            },
             {
                name: 'zipcode',
                type: 'varchar',
                length: '8',
            },
             {
                name: 'street',
                type: 'varchar',
                length: '100',
            },
            {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }, 
            {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }
        ]
        }))

        await queryRunner.createTable(new Table({
            name: 'associate',
            columns: 
            [
            {
                name: 'associateId',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                unsigned: true
            },   
            {
                name: 'phone',
                type: 'varchar',
                length: '11',
            },
            {
                name: 'birthAt',
                type: 'date',
            },
            {
                name: 'document',
                type: 'varchar',
                length: '11',
            },
            {
                name: 'healthInsuranceIdentifier',
                type: 'varchar',
                length: '20',
            },
            {
                name: 'userId',
                type: 'int',
                unsigned: true,
            },   
            {
                name: 'adressId',
                type: 'int',
                unsigned: true,
            },   
            {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }, 
            {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }
        ]
        }))

        await queryRunner.createForeignKey(
            "associate",
            new TableForeignKey({
                columnNames: ["userId"],
                referencedColumnNames: ["userId"],
                referencedTableName: "user",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createForeignKey(
            "associate",
            new TableForeignKey({
                columnNames: ["adressId"],
                referencedColumnNames: ["adressId"],
                referencedTableName: "adress",
                onDelete: "CASCADE",
            }),
        )


         await queryRunner.createTable(new Table({
            name: 'specialty',
            columns: 
            [
            {
                name: 'specialtyId',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                unsigned: true
            },   
            {
                name: 'name',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }, 
            {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }
        ]
        }))

        await queryRunner.createTable(new Table({
            name: 'unit',
            columns: 
            [
            {
                name: 'unitId',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                unsigned: true
            },   
            {
                name: 'name',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'adressId',
                type: 'int',
                unsigned: true,
            },   
            {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }, 
            {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }
        ]
        }))

        await queryRunner.createForeignKey(
            "unit",
            new TableForeignKey({
                columnNames: ["adressId"],
                referencedColumnNames: ["adressId"],
                referencedTableName: "adress",
                onDelete: "CASCADE",
            }),
        )

        await queryRunner.createTable(new Table({
            name: 'doctor',
            columns: 
            [
            {
                name: 'doctorId',
                type: 'int',
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
                unsigned: true
            },   
            {
                name: 'name',
                type: 'varchar',
                length: '255',
            },
            {
                name: 'document',
                type: 'varchar',
                length: '11',
            },
            {
                name: 'medicalRegistrationNumber',
                type: 'varchar',
                length: '20',
            },
            {
                name: 'unitId',
                type: 'int',
                unsigned: true,
            },   
            {
                name: 'createdAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }, 
            {
                name: 'updatedAt',
                type: 'timestamp',
                default: 'CURRENT_TIMESTAMP()'
            }
        ]
        }))

        await queryRunner.createForeignKey(
        "doctor",
        new TableForeignKey({
            columnNames: ["unitId"],
            referencedColumnNames: ["unitId"],
            referencedTableName: "unit",
            onDelete: "CASCADE",
        }),
        )
        
        await queryRunner.createTable(new Table({
        name: 'doctor_has_specialty',
        columns: 
        [
        {
            name: 'doctor_has_specialtyId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true
        },   
        {
            name: 'principalSpecialty',
            type: 'bit',
            default: 0,
        },
        {
            name: 'doctorId',
            type: 'int',
            unsigned: true,
        },   
        {
            name: 'specialtyId',
            type: 'int',
            unsigned: true,
        },   
        {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()'
        }, 
        {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()'
        }
        ]
        }))

        await queryRunner.createForeignKey(
        "doctor_has_specialty",
        new TableForeignKey({
            columnNames: ["doctorId"],
            referencedColumnNames: ["doctorId"],
            referencedTableName: "doctor",
            onDelete: "CASCADE",
        }),
        )
        
        await queryRunner.createForeignKey(
        "doctor_has_specialty",
        new TableForeignKey({
            columnNames: ["specialtyId"],
            referencedColumnNames: ["specialtyId"],
            referencedTableName: "specialty",
            onDelete: "CASCADE",
        }),
        )

        
        await queryRunner.createTable(new Table({
        name: 'unit_has_specialty',
        columns: 
        [
        {
            name: 'unitHasSpecialtyId',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
            unsigned: true
        },   
        {
            name: 'principalSpecialty',
            type: 'bit',
            default: 0,
        },
        {
            name: 'unitId',
            type: 'int',
            unsigned: true,
        },   
        {
            name: 'specialtyId',
            type: 'int',
            unsigned: true,
        },   
        {
            name: 'createdAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()'
        }, 
        {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()'
        }
        ]
        }))

        await queryRunner.createForeignKey(
        "unit_has_specialty",
        new TableForeignKey({
            columnNames: ["unitId"],
            referencedColumnNames: ["unitId"],
            referencedTableName: "unit",
            onDelete: "CASCADE",
        }),
        )
        
        await queryRunner.createForeignKey(
        "unit_has_specialty",
        new TableForeignKey({
            columnNames: ["specialtyId"],
            referencedColumnNames: ["specialtyId"],
            referencedTableName: "specialty",
            onDelete: "CASCADE",
        }),
        )
        
        
    }

    public async down(): Promise<void> {
    }

}
