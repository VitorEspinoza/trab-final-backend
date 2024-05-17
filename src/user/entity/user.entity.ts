import { Role } from 'src/enums/role.enum';

import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({
    unsigned: true,
  })
  userId: number;

  @Column({
    length: 255,
  })
  name: string;

  @Column({
    length: 127,
    unique: true,
  })
  email: string;

  @Column({
    length: 127,
  })
  password: string;

 @Column({
    type: 'enum',
    enum: [Role.ASSOCIATE, Role.ADMIN],
    default: Role.ASSOCIATE,
  })
  role: string;
  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
