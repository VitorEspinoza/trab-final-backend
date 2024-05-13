import { DoctorEntity } from 'src/doctor/entity/doctor.entity';
import { specialtyEntity } from 'src/specialty/entity/specialty.entity';
import { unitEntity } from 'src/unit/entity/unit.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class doctorHasSpecialtyEntity {
  @Column({})
  principalSpecialty: Boolean;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => unitEntity, (unit) => unit.doctors)
  unit: unitEntity;

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.idDoctor)
  @JoinTable()
  doctorsById: DoctorEntity[];

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.unit)
  @JoinTable()
  doctorsByUnit: DoctorEntity[];

  @ManyToMany(() => specialtyEntity, (specialty) => specialty.idSpecialty)
  @JoinTable()
  specialtyById: specialtyEntity[];
}
