import { AdressEntity } from 'src/adress/entity/adress.entity';
import { DoctorEntity } from 'src/doctor/entity/doctor.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

@Entity()
export class UnitEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idUnit: number;

  @Column({
    length: 255,
  })
  name: string;

  @OneToOne(() => AdressEntity)
  @JoinColumn()
  adress: AdressEntity;

  @OneToMany(() => DoctorEntity, (doctors) => doctors.unit)
  doctors: DoctorEntity[];

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
