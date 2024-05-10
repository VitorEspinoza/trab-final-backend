import { adressEntity } from 'src/adress/entity/adress.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';


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

    @OneToOne(() => adressEntity)
    @JoinColumn()
    adress: adressEntity

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}