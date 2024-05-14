import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { AdressEntity } from '../../adress/entity/adress.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
export class AssociateEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  idAssociate: number;

  @Column({
    length: 11,
  })
  phone: string;

  @Column({})
  birthAt: Date;

  @Column({
    length: 127,
    unique: true,
  })
  password: string;

  @Column({
    length: 11,
    unique: true,
  })
  document: string;

  @Column({
    length: 20,
    unique: true,
  })
  healthInsuranceIdentifier: string;

  @ManyToOne(() => AdressEntity)
  @JoinColumn()
  address: AdressEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user_idUser: UserEntity;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
