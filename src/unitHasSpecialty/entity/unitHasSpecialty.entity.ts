import { UnitEntity } from 'src/unit/entity/unit.entity';
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
export class UnitHasSpecialtyEntity {
    @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idUnitHasSpecialty: number;

  @Column()
  principalSpecialty: boolean;

  @Column()
  unitId: number;

  @Column()
  specialtyId: number;

  @ManyToOne(() => UnitEntity, (unit) => unit.unitHasSpecialty)
  public unit: UnitEntity

  @ManyToOne(() => SpecialtyEntity, (specialty) => specialty.unitHasSpecialty)
  public specialty: SpecialtyEntity

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

}
