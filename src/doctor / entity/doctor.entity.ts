import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

 import { unitEntity} from './unit.entity.ts';
 import { adressEntity} from './adress.entity.ts';
 
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

   @ManyToOne(() => unitEntity, (idUnit) => idUnit.Doctor)
  @JoinColumn({ name: 'Unit_idUnit_FK' })
   idUnit: unitEntity;

   @ManyToOne(() => adressEntity, (idAdress) => idAdress.Doctor))
   @JoinColumn({ name: 'Unit_idAdress_FK' })
   idAdress: adressEntity;
}