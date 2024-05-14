import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { AssociateEntity } from '../../associate/entity/associate.entity';

@Entity()
export class AdressEntity {
  @OneToMany(() => AssociateEntity, (associate) => associate.address)
  associates: AssociateEntity[];

  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  adressId: number;

  @Column({
    length: 40,
  })
  city: string;

  @Column({
    length: 30,
  })
  state: string;

  @Column({
    length: 40,
  })
  neighborhood: string;

  @Column({
    length: 5,
  })
  number: string;

  @Column({
    length: 8,
  })
  zipCode: string;

  @Column({
    length: 100,
  })
  street: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
