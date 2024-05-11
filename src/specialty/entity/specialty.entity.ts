import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class specialtyEntity{
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    idSpecialty: number;

    @Column({
        length: 255
    })
    name: string;

    @CreateDateColumn()
    createdAt: string;
  
    @UpdateDateColumn()
    updatedAt: string;
}