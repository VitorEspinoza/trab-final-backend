import { DoctorHasSpecialtyEntity } from 'src/doctorHasSpecialty/entity/doctorHasSpecialty.entity';
import { UnitHasSpecialtyEntity } from 'src/unitHasSpecialty/entity/unitHasSpecialty.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  
} from 'typeorm';

@Entity()
export class SpecialtyEntity {
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

  @CreateDateColumn()
  updatedAt: string;

  @OneToMany(() => DoctorHasSpecialtyEntity, doctorHasSpecialty => doctorHasSpecialty.doctor)
  public doctorHasSpecialty: DoctorHasSpecialtyEntity[];

  @OneToMany(() => UnitHasSpecialtyEntity, unitHasSpecialty => unitHasSpecialty.unit)
  public unitHasSpecialty: UnitHasSpecialtyEntity[];
}
