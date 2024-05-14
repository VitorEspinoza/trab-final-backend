import { DoctorEntity } from 'src/doctor/entity/doctor.entity';
import { SpecialtyEntity } from 'src/specialty/entity/specialty.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class DoctorHasSpecialtyEntity {
    @PrimaryGeneratedColumn({
    unsigned: true,
  })
  doctorHasSpecialtyId: number;

  @Column()
  principalSpecialty: boolean;

  @Column()
  doctorId: number;

  @Column()
  specialtyId: number;


  @ManyToOne(() => DoctorEntity, (doctor) => doctor.doctorHasSpecialty)
  public doctor: DoctorEntity

  @ManyToOne(() => SpecialtyEntity, (specialty) => specialty.doctorHasSpecialty)
  public specialty: SpecialtyEntity

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}
