import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Adress } from './Adress';

@Entity()
export class unitEntity{
    @PrimaryGeneratedColumn({
        unsigned: true
    })
    idUnit: number;

    @Column({
        length: 255
    })
    name: string;

    @ManyToOne(() => Adress, adress => adress.units)
  adress: Adress;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}