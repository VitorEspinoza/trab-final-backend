import { doctorHasSpecialtyEntity } from 'src/doctorHasSpecialty/entity/doctorHasSpecialy.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class specialtyEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idSpecialty: number;

  @Column({
    length: 255,
  })
  name: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToMany(() => doctorHasSpecialtyEntity)
  doctorsHasSpecialty: doctorHasSpecialtyEntity[];
}
