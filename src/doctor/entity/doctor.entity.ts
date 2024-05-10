import { adressEntity } from 'src/adress/entity/adress.entity';
import { unitEntity } from 'src/unit/entity/unit.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
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

  // @ManyToOne(() => unitEntity, (idUnit) => idUnit.DoctorEntity)
  // @JoinColumn({ name: 'Unit_idUnit_FK' })
  // idUnit: unitEntity;

  // @ManyToOne(() => adressEntity, (idAdress) => idAdress.Doctor)
  @JoinColumn({ name: 'Unit_idAdress_FK' })
  idAdress: adressEntity;
}
