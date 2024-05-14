import { DoctorHasSpecialtyEntity } from "src/doctorHasSpecialty/entity/doctorHasSpecialty.entity";
import { UnitEntity } from "src/unit/entity/unit.entity";
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";

@Entity()
export class DoctorEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  doctorId: number;

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

  @ManyToOne(() => UnitEntity, (unit) => unit.doctors)
  unit: UnitEntity;

  @OneToMany(() => DoctorHasSpecialtyEntity, doctorHasSpecialty => doctorHasSpecialty.specialty)
  public doctorHasSpecialty: DoctorHasSpecialtyEntity[];
}
