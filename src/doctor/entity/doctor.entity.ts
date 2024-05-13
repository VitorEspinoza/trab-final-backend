import { adressEntity } from 'src/adress/entity/adress.entity';
import { doctorHasSpecialtyEntity } from 'src/doctorHasSpecialty/entity/doctorHasSpecialy.entity';
import { unitEntity } from 'src/unit/entity/unit.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DoctorEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idDoctor: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 255,
  })
  Document: string;

  @Column({
    length: 11,
  })
  MedicalRegistrationNumber: string;

  @Column({
    length: 20,
  })
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @ManyToOne(() => unitEntity, (unit) => unit.doctors)
  unit: unitEntity;

  @ManyToMany(() => doctorHasSpecialtyEntity)
  doctorsHasSpecialty: doctorHasSpecialtyEntity[];
}
